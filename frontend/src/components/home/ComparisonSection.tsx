"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const COMPARISONS = [
  {
    feature: "Built Specifically for Freelancers",
    tralance: "Yes",
    traditional: "No",
    saas: "Sometimes",
  },
  {
    feature: "Freelance Business Tools in One Place",
    tralance: "Yes",
    traditional: "No",
    saas: "Sometimes",
  },
  {
    feature: "Invoice & Payment Tools",
    tralance: "Yes",
    traditional: "Manual / Separate",
    saas: "Yes",
  },
  {
    feature: "Project Profit & Rate Planning",
    tralance: "Yes",
    traditional: "Manual",
    saas: "Sometimes",
  },
  {
    feature: "Project Briefs & Contracts",
    tralance: "Yes",
    traditional: "Separate tools",
    saas: "Sometimes",
  },
  {
    feature: "Offline-First",
    tralance: "Yes",
    traditional: "Limited / Depends",
    saas: "Usually No",
  },
  {
    feature: "Privacy-First Approach",
    tralance: "Yes",
    traditional: "Depends",
    saas: "Depends",
  },
  {
    feature: "No Account Required for Website Tools",
    tralance: "Yes",
    traditional: "Usually Yes",
    saas: "Often No",
  },
  {
    feature: "Mobile + Desktop + Web",
    tralance: "Yes",
    traditional: "Separate experiences",
    saas: "Depends",
  },
  {
    feature: "Multiple Freelance Workflows",
    tralance: "Yes",
    traditional: "Manual",
    saas: "Depends",
  },
];

export default function ComparisonSection() {
  const renderCell = (value: string, isTralance = false) => {
    if (value === "Yes") {
      return (
        <div className={`flex flex-col sm:flex-row items-center gap-1.5 ${isTralance ? 'text-[#0066FF] dark:text-[#3B82F6]' : 'text-slate-500 dark:text-slate-400'}`}>
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm font-semibold">{value}</span>
        </div>
      );
    }
    if (value === "No") {
      return (
        <div className="flex flex-col sm:flex-row items-center gap-1.5 text-slate-400 dark:text-slate-500">
          <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm font-medium">{value}</span>
        </div>
      );
    }
    return (
      <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-[#AEB7C6] text-center leading-tight">
        {value}
      </span>
    );
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0B1020] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Why Freelancers Choose Tralance
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-[#AEB7C6] transition-colors duration-300 max-w-3xl mx-auto">
            One private workspace for the tools, money, projects, and everyday work behind your freelance business.
          </p>
        </div>

        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px] bg-slate-50 dark:bg-[#1A2238] rounded-3xl border border-slate-200 dark:border-[rgba(255,255,255,0.08)] shadow-sm transition-colors duration-300 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">
              <div className="p-4 sm:p-6 flex items-center font-bold text-slate-900 dark:text-white transition-colors duration-300">Features</div>
              <div className="p-4 sm:p-6 text-center border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
                <span className="inline-block px-3 sm:px-4 py-1.5 bg-[#0066FF]/10 text-[#0066FF] dark:bg-[#3B82F6]/20 dark:text-[#3B82F6] font-black rounded-full text-xs sm:text-sm">Tralance</span>
              </div>
              <div className="p-4 sm:p-6 flex items-center justify-center text-center font-bold text-sm sm:text-base text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">Traditional Tools</div>
              <div className="p-4 sm:p-6 flex items-center justify-center text-center font-bold text-sm sm:text-base text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">Generic SaaS Platforms</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-200 dark:divide-[rgba(255,255,255,0.08)] transition-colors duration-300">
              {COMPARISONS.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={idx} 
                  className="grid grid-cols-4 hover:bg-white dark:hover:bg-[#111827]/50 transition-colors duration-300"
                >
                  <div className="p-4 sm:p-6 flex items-center text-xs sm:text-sm font-medium text-slate-700 dark:text-[#AEB7C6] transition-colors duration-300">{item.feature}</div>
                  
                  <div className="p-4 sm:p-6 flex items-center justify-center border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] bg-blue-50/30 dark:bg-[#3B82F6]/5 transition-colors duration-300">
                    {renderCell(item.tralance, true)}
                  </div>
                  
                  <div className="p-4 sm:p-6 flex items-center justify-center border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">
                    {renderCell(item.traditional)}
                  </div>
                  
                  <div className="p-4 sm:p-6 flex items-center justify-center border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">
                    {renderCell(item.saas)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
