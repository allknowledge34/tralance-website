import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { prisma } from "@/lib/db/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/features',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
    '/blog',
    '/resources/cgpa-planner',
    '/resources/freelancer-rate-calculator',
  ].map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const articles = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  });

  const blogRoutes = articles.map((article) => ({
    url: `${SITE_CONFIG.url}/blog/${article.slug}`,
    lastModified: article.updatedAt.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
