import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  coverImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type BlogInput = z.infer<typeof blogSchema>;

export const updateBlogSchema = blogSchema.extend({
  id: z.string().cuid("Invalid Blog ID"),
});

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
