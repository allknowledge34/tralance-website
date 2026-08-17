import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { prisma } from "@/lib/db/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/features',
    '/tools',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
    '/blog',
    '/tools/freelancer-rate-calculator',
    '/tools/project-profit-calculator',
    '/tools/freelancer-invoice-generator',
    '/tools/freelance-contract-generator',
    '/tools/project-brief-builder',
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
