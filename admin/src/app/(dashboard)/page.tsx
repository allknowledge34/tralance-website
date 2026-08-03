import Link from "next/link";
import { PenSquare, ArrowRight, Clock, LayoutGrid, Globe } from "lucide-react";
import { getBlogsByStatus } from "@/lib/actions/blog";
import { SearchInput } from "@/components/ui/search-input";

export default async function WorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : undefined;

  // Fetch from Neon DB, optimized by indexes, using reusable function with limits
  const draftsRes = await getBlogsByStatus("DRAFT", q, 5);
  const publishedRes = await getBlogsByStatus("PUBLISHED", q, 5);
  
  const drafts = (draftsRes.success && draftsRes.data) ? draftsRes.data : [];
  const published = (publishedRes.success && publishedRes.data) ? publishedRes.data : [];

  const currentDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  }).format(new Date());

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    }).format(date);
  };

  const getWordCount = (content: string | null) => {
    if (!content) return 0;
    // Basic approximation of word count
    return content.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Header & Inspiration */}
      <header className="space-y-6">
        <p className="text-subtle text-sm tracking-widest uppercase font-medium">{currentDate}</p>
        <div className="space-y-4">
          <p className="editorial-quote text-2xl text-foreground/80 leading-relaxed max-w-2xl">
            "We are all apprentices in a craft where no one ever becomes a master."
          </p>
          <p className="text-subtle text-sm">— Ernest Hemingway</p>
        </div>
      </header>

      {/* Primary Action & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link href="/blogs/create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto group relative material-layer-elevated px-6 py-4 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.8)] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-[23px]">
            <PenSquare className="w-5 h-5 stroke-[1.5]" />
            <span className="font-medium text-lg">Start Writing</span>
          </button>
        </Link>
        <div className="w-full">
          <SearchInput placeholder="Quick search articles..." />
        </div>
      </div>

      {/* Content Lists */}
      <div className="space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="editorial-title text-xl text-foreground">Continue Drafts</h2>
            <Link href="/blogs" className="text-sm text-subtle hover:text-foreground transition-colors">View all</Link>
          </div>
          
          {drafts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 material-layer rounded-3xl border border-[var(--border-subtle)] border-dashed">
              <LayoutGrid className="w-10 h-10 text-subtle mb-3 stroke-[1]" />
              <h3 className="text-base font-medium text-foreground mb-1">No drafts found</h3>
              <p className="text-sm text-subtle text-center">
                {q ? `No drafts matched your search for "${q}".` : "You don't have any drafts yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {drafts.map(draft => (
                <Link key={draft.id} href={`/blogs/${draft.id}/edit`} className="group block">
                  <article className="p-4 -mx-4 rounded-2xl transition-all hover:bg-[var(--layer-1)]">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-medium text-foreground/90 group-hover:text-foreground transition-colors">{draft.title || "Untitled Draft"}</h3>
                      <ArrowRight className="w-4 h-4 text-subtle opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <div className="flex items-center gap-3 text-sm text-subtle">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 stroke-[1.5]" /> {formatDate(draft.updatedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
                      <span>{getWordCount(draft.content)} words</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="editorial-title text-xl text-foreground">Recently Published</h2>
            <Link href="/blogs" className="text-sm text-subtle hover:text-foreground transition-colors">View all</Link>
          </div>
          
          {published.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 material-layer rounded-3xl border border-[var(--border-subtle)] border-dashed">
              <Globe className="w-10 h-10 text-subtle mb-3 stroke-[1]" />
              <h3 className="text-base font-medium text-foreground mb-1">No published articles</h3>
              <p className="text-sm text-subtle text-center">
                {q ? `No published articles matched your search for "${q}".` : "Your live portfolio is currently empty."}
              </p>
            </div>
          ) : (
            <div className="space-y-3 border-t border-[var(--border-subtle)] pt-4">
              {published.map(post => (
                <div key={post.id} className="flex justify-between items-baseline p-2 -mx-2 group">
                  <Link href={`/blogs/${post.id}/edit`} className="text-foreground/80 hover:text-foreground font-medium transition-colors line-clamp-1 flex-1 pr-4">
                    {post.title || "Untitled Post"}
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-subtle whitespace-nowrap">
                    <span className="w-20 text-right">{post.publishedAt ? formatDate(post.publishedAt) : "Unknown"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      
    </div>
  );
}
