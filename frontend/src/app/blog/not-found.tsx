import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-slate-200 dark:text-slate-800 mb-8">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Article not found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The article you&apos;re looking for doesn&apos;t exist, has been unpublished, or was moved to another URL.
        </p>
        <Link 
          href="/blog"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
