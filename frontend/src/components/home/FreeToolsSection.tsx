import React from "react";
import Link from "next/link";
import { GraduationCap, Calculator } from "lucide-react";

export default function FreeToolsSection() {
  return (
    <section className="bg-[#F8FAFC] dark:bg-[#030303] border-t border-[#EEF2F7] dark:border-[rgba(255,255,255,0.05)] py-24 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#1E293B] dark:text-white">
            Free Productivity Tools
          </h2>
          <p className="text-[15px] md:text-base text-[#64748B] dark:text-slate-400 font-medium">
            Everything you need to calculate rates, estimate CGPA, and plan your academic<br className="hidden sm:block" /> and professional goals without creating an account.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Card 1: CGPA Planner */}
          <Link href="/resources/cgpa-planner" className="block">
            <div className="h-full bg-white dark:bg-[#0B1020] rounded-[20px] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-transparent dark:border-[rgba(255,255,255,0.05)]">
              
              <div className="w-14 h-14 rounded-2xl bg-[#0EA5E9] text-white flex items-center justify-center mb-6 shadow-sm">
                <GraduationCap className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-3">
                CGPA Planner
              </h3>
              
              <p className="text-[15px] text-[#64748B] dark:text-slate-400 font-medium leading-relaxed">
                Track semester-wise SGPA, calculate CGPA, analyze backlogs, and estimate your graduation score easily.
              </p>
              
            </div>
          </Link>

          {/* Card 2: Freelancer Rate Calculator */}
          <Link href="/resources/freelancer-rate-calculator" className="block">
            <div className="h-full bg-white dark:bg-[#0B1020] rounded-[20px] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-transparent dark:border-[rgba(255,255,255,0.05)]">
              
              <div className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center mb-6 shadow-sm">
                <Calculator className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-3">
                Freelancer Rate Calculator
              </h3>
              
              <p className="text-[15px] text-[#64748B] dark:text-slate-400 font-medium leading-relaxed">
                Calculate your ideal hourly freelance rate based on expenses, savings goals, taxes and working schedule.
              </p>
              
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
