"use client";

import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export default function PromoBar() {
  const [promo, setPromo] = useState<any>(null);

  useEffect(() => {
    fetch("/api/promo")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.isActive) {
          setPromo(data);
        }
      })
      .catch((err) => console.error("Failed to fetch promo bar", err));
  }, []);

  if (!promo) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes subtle-flame {
          0%, 100% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
          50% { transform: scale(1.1) rotate(2deg); opacity: 1; filter: drop-shadow(0 0 6px rgba(255, 90, 0, 0.5)); }
        }
        .animate-flame {
          animation: subtle-flame 2.5s ease-in-out infinite;
        }
      `}</style>
      <div className="w-full bg-blue-50/70 dark:bg-[#060913]/70 backdrop-blur-xl border-b border-blue-200/50 dark:border-[rgba(255,255,255,0.04)] shadow-[0_4px_24px_-8px_rgba(0,102,255,0.08)] dark:shadow-[0_4px_24px_-8px_rgba(0,102,255,0.15)] print:hidden relative">
      
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 dark:via-blue-500/20 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 w-full min-h-[48px]">
          
          <div className="flex items-center justify-center gap-2.5 text-center">
            <Flame className="w-4 h-4 text-[#FF5A00] animate-flame flex-shrink-0" fill="#FF5A00" />
            <span className="text-[13px] sm:text-[14px] font-semibold text-slate-900 dark:text-slate-100 tracking-wide leading-tight">
              {promo.text}
            </span>
          </div>

          <a 
            href={promo.btnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center justify-center px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold text-white bg-[#0066FF] hover:bg-[#3385FF] transition-all hover:scale-105 active:scale-95 shadow-[0_4px_14px_0_rgba(0,102,255,0.25)] sm:absolute sm:right-4 md:right-6 lg:right-8"
          >
            {promo.btnText}
          </a>
          
        </div>
      </div>
    </>
  );
}
