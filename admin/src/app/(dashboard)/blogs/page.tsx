import Link from "next/link";
import {
  Plus,
  Trash2,
  Globe,
  FileEdit,
  EyeOff,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import {
  deleteBlog,
  publishBlog,
  unpublishBlog,
  getBlogsByStatus,
} from "@/lib/actions/blog";
import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;

  const [draftsRes, publishedRes] = await Promise.all([
    getBlogsByStatus("DRAFT", q),
    getBlogsByStatus("PUBLISHED", q),
  ]);

  const drafts = draftsRes.success && draftsRes.data ? draftsRes.data : [];
  const published = publishedRes.success && publishedRes.data ? publishedRes.data : [];
  const allArticles = [...published, ...drafts];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  // Form actions
  const onPublish = async (id: string) => {
    "use server";
    await publishBlog(id);
  };

  const onUnpublish = async (id: string) => {
    "use server";
    await unpublishBlog(id);
  };

  const onDelete = async (id: string) => {
    "use server";
    await deleteBlog(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Articles & Blog Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            Create, edit, and publish editorial articles for the public Tralance knowledgebase.
          </p>
        </div>

        <Link href="/blogs/create">
          <Button size="sm" className="gap-2 shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Article</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-[#161618]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Articles
          </span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {allArticles.length}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-[#161618]">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Published Live
          </span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {published.length}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-[#161618]">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            Drafts in Progress
          </span>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
            {drafts.length}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full sm:w-80">
        <SearchInput placeholder="Search articles by title or slug..." />
      </div>

      {/* Main Articles Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">All Articles ({allArticles.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {allArticles.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-neutral-700" />
              {q ? `No articles matched "${q}".` : "No articles found in database."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article Title & Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cover Image</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allArticles.map((post) => {
                  const isPublished = post.status === "PUBLISHED";
                  return (
                    <TableRow key={post.id}>
                      {/* Title & Slug */}
                      <TableCell>
                        <div className="max-w-xs sm:max-w-md truncate">
                          <Link
                            href={`/blogs/${post.id}/edit`}
                            className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
                          >
                            {post.title || "Untitled Article"}
                          </Link>
                          <span className="text-[11px] font-mono text-slate-400 block truncate mt-0.5">
                            /{post.slug}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell>
                        {isPublished ? (
                          <Badge variant="success">PUBLISHED</Badge>
                        ) : (
                          <Badge variant="default">DRAFT</Badge>
                        )}
                      </TableCell>

                      {/* Cover Image */}
                      <TableCell>
                        {post.coverImage ? (
                          <div className="w-12 h-8 rounded-md overflow-hidden bg-slate-100 border border-slate-200/60 shrink-0">
                            <img
                              src={post.coverImage}
                              alt="Cover"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">None</span>
                        )}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(post.updatedAt)}
                      </TableCell>

                      {/* Row Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isPublished && (
                            <a
                              href={`https://www.tralance.pro/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-neutral-200 rounded-lg transition-colors"
                              title="View Live on tralance.pro"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}

                          <Link
                            href={`/blogs/${post.id}/edit`}
                            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-neutral-200 rounded-lg transition-colors"
                            title="Edit Article"
                          >
                            <FileEdit className="w-4 h-4" />
                          </Link>

                          {isPublished ? (
                            <form action={onUnpublish.bind(null, post.id)}>
                              <button
                                type="submit"
                                className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg transition-colors cursor-pointer"
                                title="Unpublish to Draft"
                              >
                                <EyeOff className="w-4 h-4" />
                              </button>
                            </form>
                          ) : (
                            <form action={onPublish.bind(null, post.id)}>
                              <button
                                type="submit"
                                className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors cursor-pointer"
                                title="Publish Live"
                              >
                                <Globe className="w-4 h-4" />
                              </button>
                            </form>
                          )}

                          <form action={onDelete.bind(null, post.id)}>
                            <button
                              type="submit"
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                              title="Delete Article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
