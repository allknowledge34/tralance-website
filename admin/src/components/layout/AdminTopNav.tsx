"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ExternalLink,
  Bell,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Menu,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSidebar } from "./SidebarContext";

const pathMap: Record<string, { section: string; title: string }> = {
  "/": { section: "Overview", title: "Dashboard" },
  "/users": { section: "Audience", title: "User Management" },
  "/notifications": { section: "Audience", title: "Notifications Center" },
  "/broadcasts": { section: "Audience", title: "Email Broadcasts" },
  "/blogs": { section: "Content", title: "Blog / Articles" },
  "/blogs/create": { section: "Content", title: "New Article" },
  "/promo": { section: "Content", title: "Promo Bar Settings" },
  "/seo": { section: "Content", title: "Pages & SEO" },
  "/tool-usage": { section: "Business", title: "Tool Usage Analytics" },
  "/payments": { section: "Business", title: "Payments & Subscriptions" },
  "/analytics": { section: "Business", title: "Business Analytics" },
  "/activity-logs": { section: "System", title: "Audit Activity Logs" },
  "/settings": { section: "System", title: "System Settings" },
};

interface AdminTopNavProps {
  onOpenSearch?: () => void;
  adminEmail?: string;
}

export function AdminTopNav({ onOpenSearch }: AdminTopNavProps) {
  const pathname = usePathname();
  const { setMobileOpen } = useSidebar();
  const [showNotifMenu, setShowNotifMenu] = React.useState(false);

  // Dynamic breadcrumb
  const currentRoute = pathMap[pathname] || {
    section: "Admin",
    title:
      pathname
        .split("/")
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" / ") || "Console",
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/90 dark:border-neutral-800 bg-white/80 dark:bg-[#121214]/80 px-4 md:px-8 backdrop-blur-md">
      {/* Left: Mobile Menu Toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 dark:text-neutral-500 uppercase tracking-wider hidden sm:inline">
            {currentRoute.section}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-neutral-600 hidden sm:inline" />
          <h1 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {currentRoute.title}
          </h1>
        </div>
      </div>

      {/* Right: Quick Search, Live Site, Alerts & Theme */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-500 dark:text-neutral-400 text-xs hover:border-slate-300 dark:hover:border-neutral-700 transition-all cursor-pointer shadow-xs"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search console...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-md text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* View Live Product Website */}
        <a
          href="https://www.tralance.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-neutral-700"
          title="Open live Tralance website"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="View system notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-[#121214]" />
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-[#18181b] p-4 shadow-xl border border-slate-200 dark:border-neutral-800 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Admin Alerts
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                  System Healthy
                </span>
              </div>
              <div className="py-3 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Neon DB Connected
                    </p>
                    <p className="text-slate-400 dark:text-neutral-500 text-[11px]">
                      Live sync with production users & orders
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Cashfree Production Gateway
                    </p>
                    <p className="text-slate-400 dark:text-neutral-500 text-[11px]">
                      API 2025-01-01 active
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-neutral-800">
                <Link
                  href="/activity-logs"
                  onClick={() => setShowNotifMenu(false)}
                  className="block text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View full activity log
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-slate-200 dark:border-neutral-800" />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
