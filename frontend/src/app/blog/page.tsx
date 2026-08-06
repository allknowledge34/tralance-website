import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tralance Blog – Freelance Finance Tips & Tools",
  description: "Read the Tralance blog for tips on freelance budgeting, expense tracking, and financial privacy. Learn how to manage your money offline with expert advice.",
  alternates: {
    canonical: "/blog",
  },
};

function getReadingTime(html: string): string {
  const text = html.replace(/<[^>]*>?/gm, "");
  const wordCount = text.trim().split(/\s+/).length;
  const time = Math.ceil(wordCount / 200);
  return `${time} min read`;
}

export default async function BlogPage() {
  const articles = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      content: true,
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tralance.pro/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://tralance.pro/blog"
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="py-20 md:py-28 flex flex-col items-center justify-center text-center">
        <div className="max-w-[700px]">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white leading-none">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-[1.7]">
            Practical articles, product updates, and productivity tips for freelancers who value privacy and offline-first tools.
          </p>
        </div>
      </header>
      
      <div className="flex justify-center mb-16 md:mb-20">
        <hr className="w-full max-w-[700px] border-t border-slate-200 dark:border-slate-800" />
      </div>

      {articles.length === 0 ? (
        <div className="text-slate-500 dark:text-slate-400 text-lg">
          No articles published yet. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex flex-col"
            >
              <figure className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden mb-6 rounded-xl">
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 font-medium">
                    {article.title.charAt(0)}
                  </div>
                )}
              </figure>
              <div className="flex flex-col flex-grow">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3 space-x-3">
                  <time dateTime={article.publishedAt?.toISOString()}>
                    {article.publishedAt?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{getReadingTime(article.content)}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 leading-snug text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base line-clamp-3 leading-relaxed mb-4 flex-grow">
                  {article.excerpt || article.content.replace(/<[^>]*>?/gm, "").substring(0, 150) + "..."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}