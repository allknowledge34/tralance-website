export default function BlogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto animate-pulse" />
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col bg-slate-50 dark:bg-[#111A33] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden"
          >
            <div className="aspect-video bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="p-6 flex flex-col flex-grow space-y-4">
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                <div className="h-6 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
              </div>
              <div className="space-y-2 mt-4">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
