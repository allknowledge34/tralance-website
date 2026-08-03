"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const COMPARISONS = [
  {
    feature: "Fully Offline / No Cloud Sync",
    tralance: true,
    spreadsheets: true,
    traditional: false,
  },
  {
    feature: "Zero Telemetry & Tracking",
    tralance: true,
    spreadsheets: false, // Google Sheets uses cloud
    traditional: false,
  },
  {
    feature: "Automated Activity Heatmaps",
    tralance: true,
    spreadsheets: false,
    traditional: true,
  },
  {
    feature: "Native Mobile Experience",
    tralance: true,
    spreadsheets: false,
    traditional: true,
  },
  {
    feature: "Built for Freelancers specifically",
    tralance: true,
    spreadsheets: false,
    traditional: false,
  },
  {
    feature: "Biometric App Lock",
    tralance: true,
    spreadsheets: false,
    traditional: true,
  },
  {
    feature: "One-Time Payment / Free (No Subscriptions)",
    tralance: true,
    spreadsheets: true,
    traditional: false,
  }
];

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0B1020] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Why Freelancers Choose Tralance
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-[#AEB7C6] transition-colors duration-300 max-w-2xl mx-auto">
            Comparing Tralance against Excel, Google Sheets, and traditional expense tracking apps.
          </p>
        </div>

        <div className="overflow-x-auto pb-8">
          <div className="min-w-[700px] bg-slate-50 dark:bg-[#1A2238] rounded-3xl border border-slate-200 dark:border-[rgba(255,255,255,0.08)] shadow-sm transition-colors duration-300 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">
              <div className="p-6 flex items-center font-bold text-slate-900 dark:text-white transition-colors duration-300">Features</div>
              <div className="p-6 text-center border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
                <span className="inline-block px-4 py-1.5 bg-[#0066FF]/10 text-[#0066FF] dark:bg-[#3B82F6]/20 dark:text-[#3B82F6] font-black rounded-full text-sm">Tralance</span>
              </div>
              <div className="p-6 text-center font-bold text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">Excel / Sheets</div>
              <div className="p-6 text-center font-bold text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">Traditional SaaS Apps</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-200 dark:divide-[rgba(255,255,255,0.08)] transition-colors duration-300">
              {COMPARISONS.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  key={idx} 
                  className="grid grid-cols-4 hover:bg-white dark:hover:bg-[#111827]/50 transition-colors duration-300"
                >
                  <div className="p-6 flex items-center text-sm font-medium text-slate-700 dark:text-[#AEB7C6] transition-colors duration-300">{item.feature}</div>
                  
                  <div className="p-6 flex items-center justify-center border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] bg-blue-50/30 dark:bg-[#3B82F6]/5 transition-colors duration-300">
                    {item.tralance ? <CheckCircle2 className="w-6 h-6 text-[#0066FF] dark:text-[#3B82F6]" /> : <XCircle className="w-6 h-6 text-slate-300 dark:text-slate-700" />}
                  </div>
                  
                  <div className="p-6 flex items-center justify-center border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">
                    {item.spreadsheets ? <CheckCircle2 className="w-6 h-6 text-slate-400" /> : <XCircle className="w-6 h-6 text-slate-300 dark:text-slate-700" />}
                  </div>
                  
                  <div className="p-6 flex items-center justify-center border-l border-slate-200 dark:border-[rgba(255,255,255,0.08)] transition-colors duration-300">
                    {item.traditional ? <CheckCircle2 className="w-6 h-6 text-slate-400" /> : <XCircle className="w-6 h-6 text-slate-300 dark:text-slate-700" />}
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
