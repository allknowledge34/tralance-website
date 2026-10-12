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
        onClose();
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
        className="fixed inset-0 bg-[#171717]/60 dark:bg-black/80 transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-lg bg-[#FFFDF5] dark:bg-[#18181B] p-4 shadow-[8px_8px_0px_0px_#171717] dark:shadow-[8px_8px_0px_0px_#000000] border-2 border-[#171717] dark:border-[#383838] z-10 animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 px-3 pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
          <Search className="w-5 h-5 text-[#171717] dark:text-[#E5E5E5] stroke-[2.5]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            autoFocus
            className="w-full bg-transparent text-sm font-bold text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md border border-[#171717] bg-[#FFE52E] text-[#171717] shadow-[1px_1px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="mt-3 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <p className="p-6 text-center text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
              No results found for &quot;{query}&quot;.
            </p>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md border-2 border-transparent hover:border-[#171717] dark:hover:border-[#383838] hover:bg-[#FFE52E]/30 dark:hover:bg-[#28282E] hover:shadow-[2px_2px_0px_0px_#171717] text-left text-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFF9D2] dark:bg-[#26262B] text-[#171717] dark:text-white flex items-center justify-center group-hover:bg-[#FFE52E] group-hover:text-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717] transition-all">
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#171717] dark:text-neutral-200 text-sm">
                        {item.title}
                      </p>
                      <p className="text-[11px] font-semibold text-[#525252] dark:text-[#A3A3A3]">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#171717] opacity-0 group-hover:opacity-100 dark:group-hover:text-white transition-all -translate-x-1 group-hover:translate-x-0 stroke-[2.5]" />
                </button>
              );
            })
          )}
        </div>

        <div className="mt-3 pt-3 border-t-2 border-[#171717] dark:border-[#383838] flex items-center justify-between text-[11px] font-bold text-[#525252] dark:text-[#A3A3A3] px-2">
          <span>Navigation & Quick Actions</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
