import { LayoutGrid, Globe } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      
      {/* Header Skeleton */}
      <header className="space-y-6">
        <div className="h-4 w-32 bg-[var(--layer-2)] rounded-full animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 max-w-2xl bg-[var(--layer-2)] rounded-xl animate-pulse" />
          <div className="h-4 w-48 bg-[var(--layer-2)] rounded-full animate-pulse" />
        </div>
      </header>

      {/* Primary Action & Search Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:w-40 h-[60px] bg-[var(--layer-2)] rounded-[23px] animate-pulse" />
        <div className="w-full h-[60px] bg-[var(--layer-2)] rounded-2xl animate-pulse" />
      </div>

      {/* Content Lists Skeleton */}
      <div className="space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-40 bg-[var(--layer-2)] rounded-full animate-pulse" />
            <div className="h-4 w-16 bg-[var(--layer-2)] rounded-full animate-pulse" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 -mx-4 rounded-2xl border border-[var(--border-subtle)]/50">
                <div className="h-5 w-3/4 bg-[var(--layer-2)] rounded-full mb-3 animate-pulse" />
                <div className="flex items-center gap-3">
                  <div className="h-3 w-24 bg-[var(--layer-2)] rounded-full animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
                  <div className="h-3 w-20 bg-[var(--layer-2)] rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-48 bg-[var(--layer-2)] rounded-full animate-pulse" />
            <div className="h-4 w-16 bg-[var(--layer-2)] rounded-full animate-pulse" />
          </div>
          <div className="space-y-3 border-t border-[var(--border-subtle)] pt-4">
            {[1, 2].map(i => (
              <div key={i} className="flex justify-between items-baseline p-2 -mx-2">
                <div className="h-5 w-1/2 bg-[var(--layer-2)] rounded-full animate-pulse" />
                <div className="h-4 w-20 bg-[var(--layer-2)] rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </div>
      
    </div>
  );
}
