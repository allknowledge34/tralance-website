"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  type NavItem = {
    name: string;
    href: string;
  };

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Blog", href: "/blog" },
    { name: "Features", href: "/features" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/40 dark:bg-[#0B1020]/80 dark:border-[rgba(255,255,255,0.08)] print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary/20 group-hover:scale-102 transition-transform duration-200">
                <Image src="/app-icon.png" alt="Tralance Logo" fill sizes="40px" className="object-cover" />
              </div>
              <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-[#AEB7C6] bg-clip-text text-transparent">
                Tralance
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors py-2 ${isActive
                      ? "text-primary dark:text-white"
                      : "text-slate-600 dark:text-[#AEB7C6] hover:text-primary dark:hover:text-white"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.08)] hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-[#AEB7C6] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="https://www.buymeacoffee.com/sachinkumau"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#F54D00] border border-[#C93E00] shadow-sm hover:bg-[#E54800] hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              ☕ Support Tralance
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.08)] hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-[#AEB7C6] dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center w-[42px] h-[42px]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="https://www.buymeacoffee.com/sachinkumau"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.08)] cursor-pointer flex items-center justify-center text-[18px] leading-none w-[42px] h-[42px] pb-[1px]"
              aria-label="Support Tralance"
            >
              ☕
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
