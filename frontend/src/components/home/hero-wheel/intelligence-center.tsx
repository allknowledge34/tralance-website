"use client";

import React from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export function IntelligenceCenter() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center bg-white dark:bg-[#1A2238] rounded-full w-48 h-48 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(37,99,235,0.15)] border border-slate-100 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-[#3B82F6]/10 text-[#0066FF] dark:text-[#3B82F6] mb-2 transition-colors duration-300">
        <Shield className="w-5 h-5" />
      </div>
      <div className="text-center px-4">
        <span className="block text-sm font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-300">Tralance</span>
        <span className="block text-[10px] font-bold text-slate-500 dark:text-[#AEB7C6] tracking-wide uppercase mt-1 mb-1 leading-tight transition-colors duration-300">Financial Intelligence</span>
        <span className="block text-[10px] font-bold text-[#0066FF] dark:text-[#3B82F6] tracking-wide bg-blue-50 dark:bg-[#3B82F6]/10 px-2 py-0.5 rounded-full inline-block mt-1 transition-colors duration-300">100% Offline</span>
      </div>
    </motion.div>
  );
}
