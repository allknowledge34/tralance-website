"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative group p-3">
        <div className="relative z-10 text-subtle w-5 h-5" />
      </div>
    );
  }

  const toggleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-3 outline-none"
      title={`Current theme: ${theme}`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 text-subtle group-hover:text-foreground transition-colors"
      >
        <AnimatePresence mode="wait">
          {theme === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Laptop className="w-5 h-5 stroke-[1.5]" />
            </motion.div>
          )}
          {theme === 'light' && (
            <motion.div
              key="light"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 stroke-[1.5]" />
            </motion.div>
          )}
          {theme === 'dark' && (
            <motion.div
              key="dark"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 stroke-[1.5]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
