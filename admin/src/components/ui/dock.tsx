"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenSquare, Library, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { logout } from "@/app/actions/auth";

export function Dock() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", icon: PenSquare, label: "Workspace" },
    { href: "/blogs", icon: Library, label: "Articles" },
  ];

  return (
    <motion.nav 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 material-layer-elevated px-2 py-2 flex items-center gap-1"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
        const Icon = item.icon;
        
        return (
          <Link key={item.href} href={item.href} className="relative group p-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative z-10 transition-colors ${isActive ? "text-foreground" : "text-subtle group-hover:text-foreground"}`}
            >
              <Icon className="w-5 h-5 stroke-[1.5]" />
            </motion.div>
            {isActive && (
              <motion.div 
                layoutId="dock-indicator"
                className="absolute inset-0 bg-foreground/10 rounded-xl"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
      
      <div className="w-px h-6 bg-[var(--border-strong)] mx-2" />
      
      <ThemeToggle />
      
      <button onClick={() => logout()} className="relative group p-3 focus:outline-none">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 text-subtle hover:text-foreground transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5 stroke-[1.5]" />
        </motion.div>
      </button>
    </motion.nav>
  );
}
