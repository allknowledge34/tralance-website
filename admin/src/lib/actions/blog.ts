"use server";

import { prisma } from "@/lib/db/prisma";
import { blogSchema, updateBlogSchema, BlogInput, UpdateBlogInput } from "@/lib/validations/blog";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { revalidatePath } from "next/cache";

export type ActionResponse<T = undefined> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function createBlog(input: BlogInput): Promise<ActionResponse<any>> {
  try {
    const validated = blogSchema.parse(input);
    const slug = validated.slug || await generateUniqueSlug(validated.title);

    let finalExcerpt = validated.excerpt;
    if (!finalExcerpt || finalExcerpt.trim() === "") {
      finalExcerpt = validated.content.replace(/<[^>]*>?/gm, "").substring(0, 160);
    }

    const blog = await prisma.blog.create({
      data: {
        title: validated.title,
        slug,
        content: validated.content,
        excerpt: finalExcerpt,
        coverImage: validated.coverImage || null,
        status: "DRAFT",
      }
    });

    revalidatePath("/blogs");
    return { success: true, data: blog };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create blog" };
  }
}

export async function updateBlog(input: UpdateBlogInput): Promise<ActionResponse<any>> {
  try {
    const validated = updateBlogSchema.parse(input);
    const slug = validated.slug || await generateUniqueSlug(validated.title, validated.id);

    // Auto-generate excerpt if empty during update
    let finalExcerpt = validated.excerpt;
    if (!finalExcerpt || finalExcerpt.trim() === "") {
      finalExcerpt = validated.content.replace(/<[^>]*>?/gm, "").substring(0, 160);
    }

    const blog = await prisma.blog.update({
      where: { id: validated.id },
      data: {
        title: validated.title,
        slug,
        content: validated.content,
        excerpt: finalExcerpt,
        coverImage: validated.coverImage || null,
      }
    });

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${validated.id}/edit`);
    return { success: true, data: blog };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update blog" };
  }
}

export async function saveDraft(input: UpdateBlogInput): Promise<ActionResponse<any>> {
  try {
    const validated = updateBlogSchema.parse(input);
    
    // Explicitly prevent saveDraft from modifying published articles and implicitly changing their status
    const existing = await prisma.blog.findUnique({ where: { id: validated.id } });
    if (existing?.status === "PUBLISHED") {
      throw new Error("Cannot use saveDraft on a published article. Use updateBlog to preserve published status.");
    }

    const slug = validated.slug || await generateUniqueSlug(validated.title, validated.id);

    // Auto-generate excerpt if empty during draft save
    let finalExcerpt = validated.excerpt;
    if (!finalExcerpt || finalExcerpt.trim() === "") {
      finalExcerpt = validated.content.replace(/<[^>]*>?/gm, "").substring(0, 160);
    }

    const blog = await prisma.blog.update({
      where: { id: validated.id },
      data: {
        title: validated.title,
        slug,
        content: validated.content,
        excerpt: finalExcerpt,
        coverImage: validated.coverImage || null,
        status: "DRAFT",
        publishedAt: null,
      }
    });

    revalidatePath("/blogs");
    return { success: true, data: blog };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to save draft" };
  }
}

export async function publishBlog(id: string): Promise<ActionResponse<any>> {
  try {
    if (!id) throw new Error("ID is required");

    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) throw new Error("Blog not found");

    let finalExcerpt = existing.excerpt;
    if (!finalExcerpt || finalExcerpt.trim() === "") {
      finalExcerpt = existing.content.replace(/<[^>]*>?/gm, "").substring(0, 160);
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
        excerpt: finalExcerpt,
      }
    });

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}/edit`);
    return { success: true, data: blog };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to publish blog" };
  }
}

export async function unpublishBlog(id: string): Promise<ActionResponse<any>> {
  try {
    if (!id) throw new Error("ID is required");

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        status: "DRAFT",
        publishedAt: null,
      }
    });

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}/edit`);
    return { success: true, data: blog };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to unpublish blog" };
  }
}

export async function deleteBlog(id: string): Promise<ActionResponse<any>> {
  try {
    if (!id) throw new Error("ID is required");

    const blog = await prisma.blog.delete({
      where: { id }
    });

    revalidatePath("/blogs");
    return { success: true, data: blog };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete blog" };
  }
}

export async function getBlogById(id: string): Promise<ActionResponse<any>> {
  try {
    if (!id) throw new Error("ID is required");

    const blog = await prisma.blog.findUnique({
      where: { id }
    });

    if (!blog) throw new Error("Blog not found");

    return { success: true, data: blog };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to get blog" };
  }
}

export async function getBlogBySlug(slug: string): Promise<ActionResponse<any>> {
  try {
    if (!slug) throw new Error("Slug is required");

    const blog = await prisma.blog.findUnique({
      where: { slug }
    });

    if (!blog) throw new Error("Blog not found");

    return { success: true, data: blog };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to get blog" };
  }
}

export async function getBlogsByStatus(status: "DRAFT" | "PUBLISHED", query?: string, limit?: number) {
  try {
    const whereClause: any = { status };
    
    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { slug: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ];
    }

    const orderBy = status === "DRAFT" 
      ? { updatedAt: 'desc' as const } 
      : { publishedAt: 'desc' as const };

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      orderBy,
      ...(limit ? { take: limit } : {}),
    });
    
    return { success: true, data: blogs };
  } catch (error: any) {
    return { success: false, error: error.message || `Failed to get ${status.toLowerCase()} blogs` };
  }
}
