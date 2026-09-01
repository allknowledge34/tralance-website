"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, BookOpen, Layers, Mail } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home",     href: "/",         icon: Home },
  { name: "Tools",    href: "/tools",    icon: Wrench },
  { name: "Blog",     href: "/blog",     icon: BookOpen },
  { name: "Features", href: "/features", icon: Layers },
  { name: "Contact",  href: "/contact",  icon: Mail },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* subtle top border + shadow to lift bar off content */}
      <div className="bg-white/90 dark:bg-[#0B1020]/95 backdrop-blur-md border-t border-slate-200/60 dark:border-white/[0.08]">
        <div className="flex items-stretch justify-around">
          {NAV_ITEMS.map(({ name, href, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={name}
                href={href}
                aria-label={name}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 py-2.5 transition-colors duration-150 ${
                  isActive
                    ? "text-[#0066FF] dark:text-[#3B82F6]"
                    : "text-slate-500 dark:text-[#AEB7C6] active:text-[#0066FF] dark:active:text-[#3B82F6]"
                }`}
              >
                <Icon
                  className="w-[22px] h-[22px] flex-shrink-0"
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span
                  className={`text-[10px] leading-tight font-semibold tracking-tight truncate ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
