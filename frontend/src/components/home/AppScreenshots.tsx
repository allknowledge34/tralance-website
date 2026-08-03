"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, TrendingUp, CalendarDays, PieChart, Settings, Search } from "lucide-react";
import Image from "next/image";

const SCREENS = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Activity,
    color: "bg-blue-500",
    image: "/screenshots/dashboard.jpg"
  },
  {
    id: "income",
    title: "Income Tracking",
    icon: TrendingUp,
    color: "bg-emerald-500",
    image: "/screenshots/savings.jpg"
  },
  {
    id: "expense",
    title: "Search Vault",
    icon: Search, 
    color: "bg-rose-500",
    image: "/screenshots/expenses.jpg"
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: PieChart,
    color: "bg-purple-500",
    image: "/screenshots/analytics.jpg"
  },
  {
    id: "savings",
    title: "Daily Summary",
    icon: CalendarDays, 
    color: "bg-amber-500",
    image: "/screenshots/income.jpg"
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    color: "bg-slate-800",
    image: "/screenshots/settings.jpg"
  }
];

export default function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SCREENS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#111827] border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)] overflow-hidden relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 transition-colors duration-300">
            See Tralance <span className="text-[#0066FF] dark:text-[#3B82F6]">In Action</span>.
          </h2>
          <p className="text-slate-500 dark:text-[#AEB7C6] font-medium text-lg leading-relaxed transition-colors duration-300">
            A beautifully crafted native experience. Powerful enough to handle complex freelance workflows, simple enough to use every day.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          
          <div className="relative w-[300px] h-[600px] sm:w-[330px] sm:h-[680px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex-shrink-0 border-4 border-slate-800 dark:border-slate-800/80 transition-shadow duration-300">
            <div className="w-full h-full bg-slate-100 rounded-[2.5rem] overflow-hidden relative shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={SCREENS[currentIndex].image}
                    alt={`${SCREENS[currentIndex].title} screenshot`}
                    fill
                    sizes="(max-width: 640px) 300px, 320px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full max-w-md flex flex-col gap-4">
            {SCREENS.map((screen, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div 
                  key={screen.id} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-white dark:bg-[#1A2238] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] translate-x-1' : 'hover:bg-slate-100 dark:hover:bg-[#1A2238]/50 border border-transparent dark:border-transparent'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? screen.color + ' text-white shadow-md scale-110' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-[#AEB7C6]'}`}>
                    <screen.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold transition-colors duration-300 ${isActive ? 'text-slate-900 dark:text-white text-lg' : 'text-slate-500 dark:text-[#AEB7C6]'}`}>
                      {screen.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
