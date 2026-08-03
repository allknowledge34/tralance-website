import { prisma } from "@/lib/db/prisma";

export async function generateUniqueSlug(title: string, currentId?: string): Promise<string> {
  let baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  if (!baseSlug) {
    baseSlug = "untitled";
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.blog.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!existing || existing.id === currentId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}
