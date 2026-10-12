"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Bell,
  Mail,
  FileText,
  Megaphone,
  Search,
  Wrench,
  CreditCard,
  BarChart3,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSidebar } from "./SidebarContext";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    title: "Audience",
    items: [
      { name: "Users", href: "/users", icon: Users },
      { name: "Notifications", href: "/notifications", icon: Bell },
      { name: "Email Broadcasts", href: "/broadcasts", icon: Mail },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Blog / Articles", href: "/blogs", icon: FileText },
      { name: "Promo Bar", href: "/promo", icon: Megaphone },
      { name: "Pages & SEO", href: "/seo", icon: Search },
    ],
  },
  {
    title: "Business",
    items: [
      { name: "Tool Usage", href: "/tool-usage", icon: Wrench },
      { name: "Payments", href: "/payments", icon: CreditCard },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Activity Logs", href: "/activity-logs", icon: History },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  adminEmail?: string;
}

export function AdminSidebar({ adminEmail = "admin@tralance.pro" }: AdminSidebarProps) {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  const renderNavLinks = (isDrawer = false) => {
    const isCompact = collapsed && !isDrawer;

    return (
      <div className="overflow-y-auto px-3 py-3 space-y-5 max-h-[calc(100vh-140px)] scrollbar-none">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCompact ? (
              <p className="px-3 text-[11px] font-black tracking-widest text-[#171717] dark:text-[#E5E5E5] uppercase mb-1.5">
                {section.title}
              </p>
            ) : (
              <div className="h-2" />
            )}

            {section.items.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md text-sm font-bold tracking-tight transition-all relative",
                      isCompact
                        ? "w-11 h-11 mx-auto justify-center"
                        : "gap-3 px-3 py-2 w-full",
                      isActive
                        ? "bg-[#FFE52E] text-[#171717] border-2 border-[#171717] dark:border-[#383838] shadow-[2.5px_2.5px_0px_0px_#171717] dark:shadow-[2.5px_2.5px_0px_0px_#000000]"
                        : "text-[#525252] dark:text-[#D4D4D8] hover:text-[#171717] dark:hover:text-white hover:bg-[#FFE52E]/30 dark:hover:bg-[#28282E] border-2 border-transparent hover:border-[#171717] dark:hover:border-[#383838]"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    {!isCompact && <span className="truncate">{item.name}</span>}
                  </Link>

                  {isCompact && (
                    <div className="fixed left-20 ml-2 hidden group-hover:flex items-center z-50 pointer-events-none">
                      <div className="px-2.5 py-1 bg-[#171717] text-[#FFE52E] border-2 border-[#FFE52E] dark:bg-[#18181B] text-xs font-black rounded-md shadow-[3px_3px_0px_0px_#000000] whitespace-nowrap animate-in fade-in zoom-in-95 duration-100">
                        {item.name}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const sidebarContent = (isDrawer = false) => {
    const isCompact = collapsed && !isDrawer;

    return (
      <div className="flex h-full flex-col justify-between bg-[#FFFDF5] dark:bg-[#121214] border-r-2 border-[#171717] dark:border-[#383838] text-[#171717] dark:text-[#E5E5E5] select-none">
        <div>
          <div
            className={cn(
              "flex h-16 items-center border-b-2 border-[#171717] dark:border-[#383838] transition-all",
              isCompact ? "justify-center px-2" : "justify-between px-4"
            )}
          >
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2.5 overflow-hidden",
                isCompact ? "justify-center" : ""
              )}
            >
              <div className="w-10 h-10 rounded-md bg-[#FFE52E] p-1 flex items-center justify-center shrink-0 border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]">
                <Image
                  src="/app-icon.png"
                  alt="Tralance App Icon"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  priority
                  unoptimized
                />
              </div>

              {!isCompact && (
                <div className="flex flex-col">
                  <span className="font-black text-lg tracking-tight text-[#171717] dark:text-white leading-tight">
                    Tralance
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-[#525252] dark:text-[#A3A3A3] uppercase">
                    Admin Console
                  </span>
                </div>
              )}
            </Link>

            {!isDrawer && !isCompact && (
              <button
                onClick={toggleCollapsed}
                className="hidden md:flex p-1.5 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] text-[#171717] dark:text-[#F5F5F5] hover:bg-[#FFE52E] dark:hover:bg-[#28282E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}

            {isDrawer && (
              <button
                onClick={() => setMobileOpen(false)}
                className="md:hidden p-1.5 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFE52E] text-[#171717] shadow-[2px_2px_0px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
          </div>

          {isCompact && (
            <div className="flex justify-center pt-2">
              <button
                onClick={toggleCollapsed}
                className="p-1 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] text-[#171717] dark:text-[#F5F5F5] hover:bg-[#FFE52E] dark:hover:bg-[#28282E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          )}

          {renderNavLinks(isDrawer)}
        </div>

        <div className="p-3 border-t-2 border-[#171717] dark:border-[#383838] bg-[#FFF9D2]/40 dark:bg-[#18181B]">
          {!isCompact ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#35B9F5] text-[#171717] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center font-black text-xs shrink-0">
                  {adminEmail.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#171717] dark:text-white truncate">
                    Administrator
                  </span>
                  <span
                    className="text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3] truncate"
                    title={adminEmail}
                  >
                    {adminEmail}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <ThemeToggle />
                <button
                  onClick={() => logout()}
                  className="p-2 border-2 border-[#171717] dark:border-[#383838] rounded-md bg-[#FF6B6B] text-[#171717] hover:bg-[#FF5252] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#35B9F5] text-[#171717] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center font-black text-xs cursor-pointer"
                title={`Signed in as ${adminEmail}`}
              >
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => logout()}
                className="p-2 border-2 border-[#171717] dark:border-[#383838] rounded-md bg-[#FF6B6B] text-[#171717] hover:bg-[#FF5252] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#171717]/60 dark:bg-black/80 transition-opacity animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out shadow-[8px_0px_0px_0px_#171717]",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent(true)}
      </div>

      <aside
        className={cn(
          "hidden md:block shrink-0 transition-all duration-300 ease-in-out sticky top-0 h-screen",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent(false)}
      </aside>
    </>
  );
}
