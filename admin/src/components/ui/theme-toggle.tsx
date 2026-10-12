"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="p-2 rounded-md border-2 border-transparent w-9 h-9" />
    );
  }

  const toggleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFE52E] dark:bg-[#1C1C20] text-[#171717] dark:text-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer transition-all shrink-0"
      title={`Current theme: ${theme}`}
      aria-label="Toggle theme"
    >
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {theme === "system" && (
            <motion.div
              key="system"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <Laptop className="w-4 h-4 stroke-[2.5]" />
            </motion.div>
          )}
          {theme === "light" && (
            <motion.div
              key="light"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <Sun className="w-4 h-4 stroke-[2.5]" />
            </motion.div>
          )}
          {theme === "dark" && (
            <motion.div
              key="dark"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <Moon className="w-4 h-4 stroke-[2.5]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
