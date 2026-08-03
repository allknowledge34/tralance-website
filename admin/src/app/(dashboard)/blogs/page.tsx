import Link from "next/link";
import { Plus, ArrowRight, Trash2, Globe, FileEdit, EyeOff, LayoutGrid } from "lucide-react";
import { deleteBlog, publishBlog, unpublishBlog, getBlogsByStatus } from "@/lib/actions/blog";
import { SearchInput } from "@/components/ui/search-input";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : undefined;
  
  // Fetch from Neon DB, optimized by indexes, using reusable function
  const draftsRes = await getBlogsByStatus("DRAFT", q);
  const publishedRes = await getBlogsByStatus("PUBLISHED", q);
  
  const drafts = (draftsRes.success && draftsRes.data) ? draftsRes.data : [];
  const published = (publishedRes.success && publishedRes.data) ? publishedRes.data : [];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    }).format(date);
  };

  // Form action wrappers to satisfy Promise<void> type requirement
  const onPublish = async (id: string, formData: FormData) => {
    "use server";
    await publishBlog(id);
  };
  
  const onUnpublish = async (id: string, formData: FormData) => {
    "use server";
    await unpublishBlog(id);
  };
  
  const onDelete = async (id: string, formData: FormData) => {
    "use server";
    await deleteBlog(id);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <h1 className="editorial-title text-4xl text-foreground">Articles</h1>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Instant Client Search */}
          <div className="w-full sm:w-64">
            <SearchInput placeholder="Search articles..." />
          </div>

          <Link href="/blogs/create" className="shrink-0">
            <button className="material-layer-elevated shadow-lg px-5 py-2.5 flex items-center gap-2 hover:opacity-90 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 transition-colors rounded-full">
              <Plus className="w-4 h-4 stroke-[2]" />
              <span className="text-sm font-medium">New</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="space-y-12">
        
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm tracking-widest uppercase font-medium text-subtle">Drafts</h2>
            <span className="text-xs text-subtle bg-[var(--layer-1)] px-2 py-1 rounded-full">{drafts.length}</span>
          </div>
          
          {drafts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 material-layer rounded-3xl border border-[var(--border-subtle)] border-dashed">
              <LayoutGrid className="w-12 h-12 text-subtle mb-4 stroke-[1]" />
              <h3 className="text-lg font-medium text-foreground mb-2">No drafts found</h3>
              <p className="text-sm text-subtle text-center max-w-sm mb-6">
                {q ? `No drafts matched your search for "${q}".` : "You don't have any drafts yet. Start writing your next masterpiece."}
              </p>
              {!q && (
                <Link href="/blogs/create">
                  <button className="px-6 py-2.5 bg-[var(--layer-2)] hover:bg-[var(--layer-3)] text-foreground transition-colors rounded-full font-medium text-sm">
                    Create Draft
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {drafts.map(draft => (
                <article key={draft.id} className="p-4 -mx-4 rounded-2xl transition-all hover:bg-[var(--layer-1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/blogs/${draft.id}/edit`}>
                        <h3 className="text-xl font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer">{draft.title || "Untitled Draft"}</h3>
                      </Link>
                      <ArrowRight className="w-4 h-4 text-subtle opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none hidden sm:block" />
                    </div>
                    <p className="text-sm text-subtle">Last updated {formatDate(draft.updatedAt)}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/blogs/${draft.id}/edit`}>
                      <button className="p-2 text-subtle hover:text-foreground hover:bg-[var(--layer-2)] rounded-full transition-colors" title="Edit">
                        <FileEdit className="w-4 h-4" />
                      </button>
                    </Link>
                    <form action={onPublish.bind(null, draft.id)}>
                      <button type="submit" className="p-2 text-subtle hover:text-green-500 hover:bg-green-500/10 rounded-full transition-colors" title="Publish">
                        <Globe className="w-4 h-4" />
                      </button>
                    </form>
                    <form action={onDelete.bind(null, draft.id)}>
                      <button type="submit" className="p-2 text-subtle hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm tracking-widest uppercase font-medium text-subtle">Published</h2>
            <span className="text-xs text-subtle bg-[var(--layer-1)] px-2 py-1 rounded-full">{published.length}</span>
          </div>
          
          {published.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 material-layer rounded-3xl border border-[var(--border-subtle)] border-dashed">
              <Globe className="w-12 h-12 text-subtle mb-4 stroke-[1]" />
              <h3 className="text-lg font-medium text-foreground mb-2">No published articles</h3>
              <p className="text-sm text-subtle text-center max-w-sm mb-6">
                {q ? `No published articles matched your search for "${q}".` : "Publish a draft to see it appear here and on your live site."}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {published.map(post => (
                <article key={post.id} className="p-4 -mx-4 rounded-2xl transition-all hover:bg-[var(--layer-1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/blogs/${post.id}/edit`}>
                        <h3 className="text-xl font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer">{post.title || "Untitled Post"}</h3>
                      </Link>
                      <ArrowRight className="w-4 h-4 text-subtle opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none hidden sm:block" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-subtle">
                      <span>Published {post.publishedAt ? formatDate(post.publishedAt) : "Unknown"}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/blogs/${post.id}/edit`}>
                      <button className="p-2 text-subtle hover:text-foreground hover:bg-[var(--layer-2)] rounded-full transition-colors" title="Edit">
                        <FileEdit className="w-4 h-4" />
                      </button>
                    </Link>
                    <form action={onUnpublish.bind(null, post.id)}>
                      <button type="submit" className="p-2 text-subtle hover:text-amber-500 hover:bg-amber-500/10 rounded-full transition-colors" title="Unpublish to Drafts">
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </form>
                    <form action={onDelete.bind(null, post.id)}>
                      <button type="submit" className="p-2 text-subtle hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
