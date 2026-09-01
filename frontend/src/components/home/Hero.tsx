import React from "react";
import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import HeroWheelLoader from "./hero-wheel/HeroWheelLoader";

export default function Hero() {
  return (
    <section className="relative pt-8 md:pt-14 pb-8 md:pb-12 overflow-hidden bg-white dark:bg-[#0B1020] lg:min-h-[60vh] flex flex-col justify-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">

      
        <div className="w-full lg:w-[55%] z-10 flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0">

          <div className="mb-6 w-full">
            <h1 className="text-[2.25rem] min-[400px]:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-black tracking-tight text-slate-900 dark:text-white leading-[0.95] whitespace-nowrap">
              Freelance work.
            </h1>
            <h2 className="text-[2.25rem] min-[400px]:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-black tracking-tight text-[#0066FF] leading-[0.95] mt-1 sm:mt-2 whitespace-nowrap">
              More under control.
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-slate-500 dark:text-[#AEB7C6] mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 transition-colors duration-300">
            Practical tools for freelancers to manage projects, money, clients, and the work behind them - with privacy at the core.
          </p>

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

          <div className="flex items-center gap-2.5">
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

        </div>

        <div className="hidden lg:flex w-full lg:w-[45%] justify-center lg:justify-end relative z-0">
          <div className="relative">
            <HeroWheelLoader />
          </div>
        </div>

      </div>
    </section>
  );
}
