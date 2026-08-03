"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, Instagram, Youtube } from "lucide-react";
import { IntelligenceWheel } from "./hero-wheel/intelligence-wheel";

export default function Hero() {
  return (
    <section className="relative pt-8 md:pt-14 pb-8 md:pb-12 overflow-hidden bg-white dark:bg-[#0B1020] min-h-[60vh] flex flex-col justify-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[55%] z-10 flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0"
        >

          {/* Headline */}
          <div className="mb-6 max-w-[750px] w-full">
            <h1 className="text-[3.25rem] sm:text-6xl lg:text-[64px] xl:text-[72px] font-black tracking-tight text-slate-900 dark:text-white leading-[0.95] transition-colors duration-300">
              Freelance Finance.
            </h1>
            <h2 className="text-[3.25rem] sm:text-6xl lg:text-[64px] xl:text-[72px] font-black tracking-tight text-[#0066FF] leading-[0.95] transition-colors duration-300 mt-1 sm:mt-2">
              100% Private.
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-500 dark:text-[#AEB7C6] mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 transition-colors duration-300">
            Tralance helps freelancers manage income, expenses, projects, and savings completely offline on their device.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 w-full lg:w-auto">
            {/* Google Play Button */}
            <a aria-label="Download Tralance offline expense tracker on Google Play" href="https://play.google.com/store/apps/details?id=com.sachin.tralance" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[210px] h-[64px] flex items-center justify-center gap-3 bg-[#0A1128] dark:bg-white hover:bg-black dark:hover:bg-slate-200 text-white dark:text-[#0A1128] rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)]">
              {/* SVG for Google Play Icon */}
              <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 2.5C3.1 2.8 2.8 3.4 2.8 4.2V19.8C2.8 20.6 3.1 21.2 3.5 21.5L3.6 21.6L14.4 10.8V10.6L3.6 2.4L3.5 2.5Z" fill="#2196F3"/>
                <path d="M18.2 14.6L14.4 10.8V10.6L18.2 6.8L18.3 6.9L22.8 9.5C24.1 10.2 24.1 11.4 22.8 12.1L18.3 14.5L18.2 14.6Z" fill="#FFC107"/>
                <path d="M18.3 14.5L14.4 10.7L3.5 21.6C4 22 4.8 22.1 5.6 21.6L18.3 14.5Z" fill="#F44336"/>
                <path d="M18.3 6.9L5.6 2C4.8 1.5 4 1.6 3.5 2.1L14.4 10.7L18.3 6.9Z" fill="#4CAF50"/>
              </svg>
              <div className="flex flex-col items-start text-left">
                <span className="text-[10px] leading-tight text-white/70 dark:text-black/60">GET IT ON</span>
                <span className="text-base leading-tight font-bold">Google Play</span>
              </div>
            </a>

            {/* Microsoft Store Button */}
            <a aria-label="Download Tralance on Microsoft Store" href="https://apps.microsoft.com/detail/xpddtkcglcbwj0?cid=PCCongratsBnr&hl=en-US&gl=IN" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[210px] h-[64px] flex items-center justify-center gap-3 bg-[#0A1128] dark:bg-white hover:bg-black dark:hover:bg-slate-200 text-white dark:text-[#0A1128] rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)]">
              {/* Colored Microsoft Logo */}
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
              </svg>
              <div className="flex flex-col items-start text-left">
                <span className="text-[10px] leading-tight text-white/70 dark:text-black/60">GET IT FROM</span>
                <span className="text-base leading-tight font-bold">Microsoft</span>
              </div>
            </a>
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
            
            <a  href="https://www.instagram.com/dmilx.tech/"
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
          className="w-full lg:w-[45%] flex justify-center lg:justify-end relative z-0 mt-12 lg:mt-0"
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
