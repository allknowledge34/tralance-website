"use client";

import React from "react";
import { motion } from "framer-motion";
import { Youtube, Mail, Terminal } from "lucide-react";
import { ABOUT_SKILLS } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";

export default function FounderProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-sm rounded-[32px] glass p-8 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden"
    >
      <div 
        className="absolute -top-12 -left-12 w-48 h-48 rounded-full -z-10" 
        style={{
          background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, rgba(0,102,255,0) 70%)'
        }}
      />

      <div className="flex flex-col items-center text-center">
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-primary via-accent-purple to-accent-cyan p-1 shadow-xl shadow-primary/10 mb-6">
          <div className="w-full h-full rounded-full bg-slate-900 dark:bg-rich-black flex items-center justify-center border border-white/10 overflow-hidden text-2xl font-black text-white">
            DMILX
          </div>
          <div className="absolute bottom-1 right-1 p-2 rounded-xl bg-slate-800 border border-white/10 text-primary shadow-md">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
        </div>

        <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white">
          Dmilx
        </h3>
        <p className="text-xs font-semibold text-primary dark:text-blue-400 mt-1 uppercase tracking-wider">
          Building Privacy-First Apps
        </p>

        <p className="text-slate-500 dark:text-slate-400 text-xs italic mt-4 max-w-xs leading-relaxed">
          {"\"Great software respects its users' sovereignty over their data.\""}
        </p>

        <div className="flex flex-wrap gap-1.5 justify-center mt-6">
          {ABOUT_SKILLS.map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-xs font-semibold bg-slate-100 dark:bg-white/5 text-slate-650 dark:text-slate-350 px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
            title="Email Support"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://www.youtube.com/@AICodingHub"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
