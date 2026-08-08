import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { SITE_CONFIG } from "@/lib/constants";
import ReadingProgress from "@/components/blog/ReadingProgress";

type Props = {
  params: Promise<{ slug: string }>;
};

function getReadingTime(html: string): string {
  const text = html.replace(/<[^>]*>?/gm, "");
  const wordCount = text.trim().split(/\s+/).length;
  const time = Math.ceil(wordCount / 200);
  return `${time} min read`;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!article || article.status !== "PUBLISHED") {
    return {
      title: "Not Found",
    };
  }

  const excerpt = article.excerpt || article.content.replace(/<[^>]*>?/gm, "").substring(0, 160);

  return {
    title: article.title,
    description: excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: excerpt,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      url: `${SITE_CONFIG.url}/blog/${article.slug}`,
      images: article.coverImage ? [article.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  
  const article = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!article || article.status !== "PUBLISHED") {
    notFound();
  }

  const recentArticles = await prisma.blog.findMany({
    where: { 
      status: "PUBLISHED",
      id: { not: article.id }
    },
    orderBy: { publishedAt: "desc" },
    take: 2,
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      publishedAt: true,
      content: true
    }
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt || article.content.replace(/<[^>]*>?/gm, "").substring(0, 160),
    "image": article.coverImage ? [article.coverImage] : [],
    "datePublished": article.publishedAt?.toISOString(),
    "author": {
      "@type": "Person",
      "name": "Sachin Kumar",
      "url": "https://tralance.pro/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DmilX",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tralance.pro/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      
      <div className="bg-white dark:bg-[#030303] min-h-screen">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 lg:grid lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8 xl:col-span-9 max-w-[800px]">
            
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight text-slate-900 dark:text-white">
                {article.title}
              </h1>

              <div className="flex flex-col space-y-2">
                <Link href="/about" className="text-base font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">
                  By Sachin Kumar
                </Link>
                <div className="flex flex-wrap items-center gap-3 text-base text-slate-500 dark:text-slate-400">
                  <time dateTime={article.publishedAt?.toISOString()}>
                    {article.publishedAt?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span>{getReadingTime(article.content)}</span>
                </div>
              </div>
            </header>

            {article.coverImage && (
              <figure className="mb-16">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              </figure>
            )}

            <div 
              className="editorial-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 border-b border-slate-100 dark:border-slate-800/50 pb-4">
                Previous Articles
              </h3>
              
              <div className="flex flex-col space-y-8">
                {recentArticles.map((recent) => (
                  <Link 
                    key={recent.id} 
                    href={`/blog/${recent.slug}`}
                    className="group block"
                  >
                    <figure className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 mb-4">
                      {recent.coverImage ? (
                        <Image
                          src={recent.coverImage}
                          alt={recent.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 300px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 font-medium">
                          {recent.title.charAt(0)}
                        </div>
                      )}
                    </figure>
                    
                    <h4 className="text-lg font-bold leading-snug text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-3">
                      {recent.title}
                    </h4>
                    
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-2">
                      <time dateTime={recent.publishedAt?.toISOString()}>
                        {recent.publishedAt?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span>•</span>
                      <span>{getReadingTime(recent.content)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}
