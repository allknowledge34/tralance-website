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
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717] dark:text-white">
            Articles & Blog Management
          </h1>
          <p className="text-sm font-medium text-[#525252] dark:text-[#A3A3A3] mt-1">
            Create, edit, and publish editorial articles for the public Tralance knowledgebase.
          </p>
        </div>

        <Link href="/blogs/create">
          <Button size="sm" className="gap-2">
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Article</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
            Total Articles
          </span>
          <p className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-white mt-1">
            {allArticles.length}
          </p>
        </div>
        <div className="p-4 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#6EE7B7] text-[#171717] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
            Published Live
          </span>
          <p className="text-2xl sm:text-3xl font-black text-[#171717] mt-1">
            {published.length}
          </p>
        </div>
        <div className="p-4 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFE52E] text-[#171717] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
            Drafts in Progress
          </span>
          <p className="text-2xl sm:text-3xl font-black text-[#171717] mt-1">
            {drafts.length}
          </p>
        </div>
      </div>

      <div className="w-full sm:w-80">
        <SearchInput placeholder="Search articles by title or slug..." />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">All Articles ({allArticles.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {allArticles.length === 0 ? (
            <div className="py-16 text-center text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-[#525252] dark:text-[#A3A3A3]" />
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
                      <TableCell>
                        <div className="max-w-xs sm:max-w-md truncate">
                          <Link
                            href={`/blogs/${post.id}/edit`}
                            className="font-bold text-[#171717] dark:text-white hover:text-[#35B9F5] transition-colors block truncate"
                          >
                            {post.title || "Untitled Article"}
                          </Link>
                          <span className="text-[11px] font-mono font-semibold text-[#525252] dark:text-[#A3A3A3] block truncate mt-0.5">
                            /{post.slug}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {isPublished ? (
                          <Badge variant="success">PUBLISHED</Badge>
                        ) : (
                          <Badge variant="default">DRAFT</Badge>
                        )}
                      </TableCell>

                      <TableCell>
                        {post.coverImage ? (
                          <div className="w-12 h-8 rounded border-2 border-[#171717] overflow-hidden bg-[#E5E7EB] shrink-0 shadow-[1px_1px_0px_0px_#171717]">
                            <img
                              src={post.coverImage}
                              alt="Cover"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <span className="text-xs text-[#525252] dark:text-[#A3A3A3] italic">None</span>
                        )}
                      </TableCell>

                      <TableCell className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] whitespace-nowrap">
                        {formatDate(post.updatedAt)}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isPublished && (
                            <a
                              href={`https://www.tralance.pro/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
                              title="View Live on tralance.pro"
                            >
                              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                            </a>
                          )}

                          <Link
                            href={`/blogs/${post.id}/edit`}
                            className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all"
                            title="Edit Article"
                          >
                            <FileEdit className="w-4 h-4 stroke-[2.5]" />
                          </Link>

                          {isPublished ? (
                            <form action={onUnpublish.bind(null, post.id)}>
                              <button
                                type="submit"
                                className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] hover:text-[#171717] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
                                title="Unpublish to Draft"
                              >
                                <EyeOff className="w-4 h-4 stroke-[2.5]" />
                              </button>
                            </form>
                          ) : (
                            <form action={onPublish.bind(null, post.id)}>
                              <button
                                type="submit"
                                className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#6EE7B7] hover:text-[#171717] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
                                title="Publish Live"
                              >
                                <Globe className="w-4 h-4 stroke-[2.5]" />
                              </button>
                            </form>
                          )}

                          <form action={onDelete.bind(null, post.id)}>
                            <button
                              type="submit"
                              className="p-1.5 text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FF6B6B] hover:text-[#171717] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
                              title="Delete Article"
                            >
                              <Trash2 className="w-4 h-4 stroke-[2.5]" />
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
