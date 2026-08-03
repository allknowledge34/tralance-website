"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const FEATURES = [
  {
    id: "dashboard",
    title: "Dashboard & Balance Overview",
    description: "Get a clear, real-time snapshot of your financial health. Your net balance, latest activity, and income vs expense summaries are all available at a glance.",
    capabilities: ["Total Balance", "Income vs Expense summary", "Timeline activity feed"],
    image: "/screenshots/dashboard.jpg",
  },
  {
    id: "analytics",
    title: "Intelligence Analytics",
    description: "Enterprise-grade financial intelligence tailored for your freelance business. Understand where your money goes with detailed breakdowns.",
    capabilities: ["Spending Trend graph", "Allocation chart", "Activity Density heatmap", "Daily Average insights"],
    image: "/screenshots/analytics.jpg",
  },
  {
    id: "management",
    title: "Income & Expense Management",
    description: "Log every transaction with precision. Attach clients, assign projects, and track payment statuses to ensure you never miss an invoice.",
    capabilities: ["Add Income", "Add Expense", "Project tracking", "Client tracking", "Payment status"],
    image: "/screenshots/savings.jpg",
  },
  {
    id: "search",
    title: "Search Vault",
    description: "Instantly locate any past transaction. Powerful local search capabilities let you filter by type, project, or client without any server latency.",
    capabilities: ["Search all transactions", "Filter Income and Expense", "Instant local search"],
    image: "/screenshots/expenses.jpg",
  },
  {
    id: "history",
    title: "Daily Transaction History",
    description: "Review your financial timeline day by day. Every transaction is beautifully organized to give you a clear chronological view of your cashflow.",
    capabilities: ["Daily summaries", "Income totals", "Expense totals", "Transaction timeline"],
    image: "/screenshots/income.jpg",
  },
  {
    id: "settings",
    title: "Settings & Privacy",
    description: "Absolute control over your application experience and data. Secure your app with biometrics and manage encrypted local backups.",
    capabilities: ["Biometric Lock", "Privacy Mode", "Auto Lock Timer", "Haptic Feedback", "CSV Export", "Encrypted Backup"],
    image: "/screenshots/settings.jpg",
  }
];

export default function ShowcaseFeatures() {
  return (
    <div className="py-24 bg-white dark:bg-[#0B1020] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {FEATURES.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={feature.id} 
              className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 flex flex-col items-start"
              >
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 transition-colors duration-300 leading-[1.1]">
                  {feature.title}
                </h2>
                <p className="text-lg text-slate-500 dark:text-[#AEB7C6] font-medium leading-relaxed mb-8 transition-colors duration-300">
                  {feature.description}
                </p>

                <div className="space-y-4 w-full">
                  {feature.capabilities.map((cap, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      className="flex items-center gap-3 bg-slate-50 dark:bg-[#1A2238] border border-slate-100 dark:border-[rgba(255,255,255,0.08)] px-5 py-4 rounded-2xl shadow-sm hover:shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#0066FF] dark:text-[#3B82F6] flex-shrink-0 transition-colors duration-300" />
                      <span className="text-sm font-bold text-slate-800 dark:text-white transition-colors duration-300">{cap}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Image Content (Phone Mockup) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 flex justify-center lg:justify-center relative"
              >
                {/* Decorative background glow */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm h-full max-h-[600px] bg-[#0066FF] opacity-5 dark:opacity-10 blur-[100px] rounded-full -z-10"
                />

                <div className="relative w-[300px] h-[600px] sm:w-[330px] sm:h-[680px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex-shrink-0 border-4 border-slate-800 dark:border-slate-800/80 transition-shadow duration-300 group">
                  <div className="w-full h-full bg-slate-100 dark:bg-[#111827] rounded-[2.5rem] overflow-hidden relative shadow-inner">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 640px) 300px, 330px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
