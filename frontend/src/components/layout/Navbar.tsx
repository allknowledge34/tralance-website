"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const pathname = usePathname();

  type NavItem = {
    name: string;
    href: string;
    dropdown?: { name: string; href: string; description?: string }[];
  };

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Blog", href: "/blog" },
    { name: "Features", href: "/features" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/40 dark:bg-[#0B1020]/80 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
                <Image src="/app-icon.png" alt="Tralance Logo" fill sizes="40px" className="object-cover" />
              </div>
              <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-[#AEB7C6] bg-clip-text text-transparent">
                Tralance
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.dropdown && item.dropdown.some(d => pathname === d.href));
              
              if (item.dropdown) {
                return (
                  <div 
                    key={item.name} 
                    className="relative py-2"
                    onMouseEnter={() => setHoveredNav(item.name)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <button
                      className={`text-sm font-semibold transition-colors flex items-center cursor-default ${
                        isActive || hoveredNav === item.name
                          ? "text-primary dark:text-white" 
                          : "text-slate-600 dark:text-[#AEB7C6] hover:text-primary dark:hover:text-white"
                      }`}
                    >
                      {item.name}
                    </button>
                    <AnimatePresence>
                      {hoveredNav === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 z-50"
                        >
                          <div className="bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-[rgba(255,255,255,0.1)] shadow-xl rounded-2xl p-2">
                            {item.dropdown.map((drop) => {
                              const isDropActive = pathname === drop.href;
                              return (
                                <Link 
                                  key={drop.name} 
                                  href={drop.href}
                                  className={`block p-3.5 mb-1 last:mb-0 rounded-xl transition-all duration-200 relative overflow-hidden group ${
                                    isDropActive 
                                      ? "bg-blue-50/80 dark:bg-blue-900/20" 
                                      : "hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm dark:hover:bg-white/5"
                                  }`}
                                >
                                  {isDropActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl" />
                                  )}
                                  <div className={`text-sm font-bold mb-1 transition-colors ${
                                    isDropActive 
                                      ? "text-primary dark:text-blue-400" 
                                      : "text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400"
                                  }`}>
                                    {drop.name}
                                  </div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {drop.description}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors py-2 ${
                    isActive 
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
            <Link
              href="/tools"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white dark:text-[#0A1128] bg-[#0A1128] dark:bg-white hover:bg-black dark:hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)]"
            >
              Explore Tools
            </Link>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.08)] text-slate-600 dark:text-[#AEB7C6] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.08)] text-slate-600 dark:text-[#AEB7C6] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200/50 dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#0B1020] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.name} className="py-2">
                      <div className="px-3 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                        {item.name}
                      </div>
                      <div className="pl-3 border-l-2 border-slate-100 dark:border-white/10 ml-4 space-y-2">
                        {item.dropdown.map((drop) => (
                          <Link
                            key={drop.name}
                            href={drop.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                              pathname === drop.href
                                ? "text-primary dark:text-white"
                                : "text-slate-600 hover:text-primary dark:text-[#AEB7C6] dark:hover:text-white"
                            }`}
                          >
                            {drop.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-semibold ${
                      pathname === item.href
                        ? "bg-slate-50 text-primary dark:bg-[#1A2238] dark:text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-primary dark:text-[#AEB7C6] dark:hover:bg-[#1A2238] dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-2 px-3">
                <Link
                  href="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-base font-bold text-white dark:text-[#0A1128] bg-[#0A1128] dark:bg-white hover:bg-black dark:hover:bg-slate-200 transition-all active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)]"
                >
                  Explore Tools
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
