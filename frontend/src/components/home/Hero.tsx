"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { IntelligenceWheel } from "./hero-wheel/intelligence-wheel";

export default function Hero() {
  return (
    <section className="relative pt-8 md:pt-14 pb-8 md:pb-12 overflow-hidden bg-white dark:bg-[#0B1020] min-h-[60vh] flex flex-col justify-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">

        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[55%] z-10 flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0"
        >

          <div className="mb-6 w-full">
            <h1 className="text-[2.25rem] min-[400px]:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-black tracking-tight text-slate-900 dark:text-white leading-[0.95] whitespace-nowrap">
              Freelance work.
            </h1>
            <h2 className="text-[2.25rem] min-[400px]:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-black tracking-tight text-[#0066FF] leading-[0.95] mt-1 sm:mt-2 whitespace-nowrap">
              More under control.
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-500 dark:text-[#AEB7C6] mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 transition-colors duration-300">
            Practical tools for freelancers to manage projects, money, clients, and the work behind them - with privacy at the core.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 w-full lg:w-auto">
            <Link
              href="/tools"
              className="w-full sm:w-[210px] h-[64px] flex items-center justify-center gap-3 bg-[#0A1128] dark:bg-white hover:bg-black dark:hover:bg-slate-200 text-white dark:text-[#0A1128] rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] text-[17px]"
            >
              Explore Tools
            </Link>

            <Link
              href="/features"
              className="w-full sm:w-[210px] h-[64px] flex items-center justify-center gap-3 bg-white dark:bg-[#0B1020] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-900 dark:text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-sm text-[17px] border border-slate-200 dark:border-white/20"
            >
              Explore Tralance
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://x.com/tralanceapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tralance on X"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-[#AEB7C6] hover:text-[#0066FF] hover:border-[#0066FF]/40 transition-colors duration-200"
            >
              <Twitter className="w-[15px] h-[15px]" strokeWidth={2} />
            </a>

            <a href="https://www.instagram.com/dmilx.tech/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tralance on Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-[#AEB7C6] hover:text-[#0066FF] hover:border-[#0066FF]/40 transition-colors duration-200"
            >
              <Instagram className="w-[15px] h-[15px]" strokeWidth={2} />
            </a>
            <a
              href="https://www.youtube.com/@AiCodingHub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tralance on YouTube"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-[#AEB7C6] hover:text-[#0066FF] hover:border-[#0066FF]/40 transition-colors duration-200"
            >
              <Youtube className="w-[15px] h-[15px]" strokeWidth={2} />
            </a>
          </div>

        </motion.div>

        {/* Right Column: Intelligence Wheel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-[45%] flex justify-center lg:justify-end relative z-0 mt-4 lg:mt-0 -mb-12 lg:mb-0"
        >
          {/* We use a negative margin on large screens if needed to pull the wheel slightly left, 
              or just let it sit naturally. For a premium SaaS look, the wheel slightly bleeding off or sitting perfectly in the grid is ideal. */}
          <div className="relative">
            <IntelligenceWheel />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
