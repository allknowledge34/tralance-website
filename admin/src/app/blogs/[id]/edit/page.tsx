import { ImmersiveEditor } from "@/components/editor/ImmersiveEditor";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { id }
  });

  if (!blog) {
    notFound();
  }

  return (
    <ImmersiveEditor 
      initialId={blog.id}
      initialTitle={blog.title}
      initialContent={blog.content}
      initialSlug={blog.slug}
      initialStatus={blog.status}
      initialCoverImage={blog.coverImage || ""}
      initialExcerpt={blog.excerpt || ""}
    />
  );
}
