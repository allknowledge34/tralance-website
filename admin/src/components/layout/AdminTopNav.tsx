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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#121214] px-4 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFE52E] text-[#171717] shadow-[2px_2px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wider hidden sm:inline">
            {currentRoute.section}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#171717] dark:text-[#F5F5F5] stroke-[2.5] hidden sm:inline" />
          <h1 className="text-sm font-extrabold text-[#171717] dark:text-white truncate">
            {currentRoute.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] text-[#171717] dark:text-[#E5E5E5] text-xs font-bold hover:bg-[#FFE52E] dark:hover:bg-[#28282E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">Search console...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-black bg-[#FFE52E] dark:bg-[#27272A] border border-[#171717] dark:border-[#383838] rounded text-[#171717] dark:text-[#FFE52E]">
            ⌘K
          </kbd>
        </button>

        <a
          href="https://www.tralance.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] text-xs font-bold text-[#171717] dark:text-[#E5E5E5] hover:bg-[#35B9F5] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          title="Open live Tralance website"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 stroke-[2.5]" />
        </a>

        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            aria-label="View system notifications"
          >
            <Bell className="w-4 h-4 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF6B6B] border-2 border-[#171717]" />
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg bg-[#FFFDF5] dark:bg-[#18181B] p-4 shadow-[6px_6px_0px_0px_#171717] dark:shadow-[6px_6px_0px_0px_#000000] border-2 border-[#171717] dark:border-[#383838] z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
                <span className="text-xs font-black text-[#171717] dark:text-white uppercase tracking-wider">
                  Admin Alerts
                </span>
                <span className="text-[10px] font-black text-[#171717] bg-[#6EE7B7] border border-[#171717] px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#171717]">
                  System Healthy
                </span>
              </div>
              <div className="py-3 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#35B9F5] text-[#171717] border border-[#171717] flex items-center justify-center shrink-0 mt-0.5 shadow-[1.5px_1.5px_0px_0px_#171717]">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#171717] dark:text-slate-200">
                      Neon DB Connected
                    </p>
                    <p className="text-[#525252] dark:text-[#A3A3A3] text-[11px] font-medium">
                      Live sync with production users & orders
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#FFE52E] text-[#171717] border border-[#171717] flex items-center justify-center shrink-0 mt-0.5 shadow-[1.5px_1.5px_0px_0px_#171717]">
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#171717] dark:text-slate-200">
                      Cashfree Production Gateway
                    </p>
                    <p className="text-[#525252] dark:text-[#A3A3A3] text-[11px] font-medium">
                      API 2025-01-01 active
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t-2 border-[#171717] dark:border-[#383838]">
                <Link
                  href="/activity-logs"
                  onClick={() => setShowNotifMenu(false)}
                  className="block text-center text-xs font-black text-[#171717] dark:text-[#35B9F5] hover:underline"
                >
                  View full activity log
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-0.5 bg-[#171717] dark:bg-[#383838]" />

        <ThemeToggle />
      </div>
    </header>
  );
}
