"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Users,
  Bell,
  Mail,
  FileText,
  Megaphone,
  Wrench,
  CreditCard,
  BarChart3,
  History,
  Settings,
  X,
  ArrowRight,
} from "lucide-react";

interface AdminCommandDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchItems = [
  { title: "Dashboard Overview", category: "Navigation", href: "/", icon: LayoutDashboard },
  { title: "User Management", category: "Audience", href: "/users", icon: Users },
  { title: "Notifications Center", category: "Audience", href: "/notifications", icon: Bell },
  { title: "Email Broadcasts", category: "Audience", href: "/broadcasts", icon: Mail },
  { title: "Blog / Articles List", category: "Content", href: "/blogs", icon: FileText },
  { title: "Create New Article", category: "Actions", href: "/blogs/create", icon: FileText },
  { title: "Promo Bar Settings", category: "Content", href: "/promo", icon: Megaphone },
  { title: "Pages & SEO", category: "Content", href: "/seo", icon: Search },
  { title: "Tool Usage Analytics", category: "Business", href: "/tool-usage", icon: Wrench },
  { title: "Payments & Subscriptions", category: "Business", href: "/payments", icon: CreditCard },
  { title: "Business Analytics", category: "Business", href: "/analytics", icon: BarChart3 },
  { title: "Activity Audit Logs", category: "System", href: "/activity-logs", icon: History },
  { title: "System Settings", category: "System", href: "/settings", icon: Settings },
];

export function AdminCommandDialog({ isOpen, onClose }: AdminCommandDialogProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(); // toggle or open handled by parent
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 animate-in fade-in duration-150">
      <div
        className="fixed inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#18181b] p-4 shadow-2xl border border-slate-200 dark:border-neutral-800 z-10 animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 px-3 pb-3 border-b border-slate-100 dark:border-neutral-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-neutral-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <p className="p-6 text-center text-xs text-slate-400">
              No results found for &quot;{query}&quot;.
            </p>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm hover:bg-slate-100 dark:hover:bg-neutral-800/80 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-neutral-200 text-sm">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-slate-600 dark:group-hover:text-white transition-all -translate-x-1 group-hover:translate-x-0" />
                </button>
              );
            })
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-slate-400 px-2">
          <span>Navigation & Quick Actions</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
