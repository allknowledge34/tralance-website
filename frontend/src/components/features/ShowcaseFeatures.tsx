"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

type Platform = "mobile" | "desktop";

const MOBILE_FEATURES = [
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
    capabilities: ["Add Income", "Add Expense", "Project tracking", "Client tracking"],
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

const DESKTOP_FEATURES = [
  {
    id: "desktop-dashboard",
    title: "More room to work.",
    description: "See your active projects, pending invoices, and overall balance on one screen. The desktop interface gives your data the space it needs.",
    capabilities: ["Full-screen overview", "Outstanding invoices", "Project tracking", "Quick actions"],
    image: "/screenshots/dasktop-1.png",
  },
  {
    id: "desktop-analytics",
    title: "Clear financial trends.",
    description: "Understand your income and expenses over time without clicking through endless menus. Everything stays on your device.",
    capabilities: ["Interactive charts", "Trend analysis", "Category breakdown", "Exportable data"],
    image: "/screenshots/dasktop-2.png",
  },
  {
    id: "desktop-management",
    title: "Manage clients properly.",
    description: "Organize your clients and past transactions easily. The wider screen makes bulk edits and filtering much faster.",
    capabilities: ["Client management", "Transaction filtering", "Bulk actions", "Fast local search"],
    image: "/screenshots/dasktop-4.png",
  },
  {
    id: "desktop-settings",
    title: "Your data, your machine.",
    description: "Absolute control over your workspace. Manage local backups, customize your theme, and adjust privacy settings with ease.",
    capabilities: ["Local encrypted backup", "Privacy controls", "Theme settings", "Data export"],
    image: "/screenshots/dasktop-3.png",
  }
];

export default function ShowcaseFeatures() {
  const [platform, setPlatform] = useState<Platform>("mobile");

  const activeFeatures = platform === "mobile" ? MOBILE_FEATURES : DESKTOP_FEATURES;

  return (
    <div className="pb-24 pt-8 bg-white dark:bg-[#0B1020] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-center mb-16 lg:mb-24">
          <div className="relative inline-flex p-1 bg-white dark:bg-[#111827] rounded-full border border-slate-200 dark:border-slate-800 shadow-sm items-center">
            
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-900 dark:bg-[#1A2238] rounded-full transition-transform duration-300 ease-in-out shadow-sm border border-slate-800 dark:border-[rgba(255,255,255,0.08)]"
              style={{
                transform: platform === 'mobile' ? 'translateX(0)' : 'translateX(100%)',
                left: '4px'
              }}
            />

            <button
              onClick={() => setPlatform("mobile")}
              className={`relative z-10 flex items-center justify-center gap-2.5 px-8 py-3.5 w-44 rounded-full font-semibold text-[15px] transition-colors duration-300 ${
                platform === "mobile"
                  ? "text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.6 2.4c-.2.2-.3.6-.3 1.1v17c0 .5.1.9.3 1.1l.1.1 9-9v-.3l-9-9-.1.1z" fill="#3BCCFF"/>
                  <path d="M12.7 12.4l3-3-1.6-.9-9.5-5.5c-.3-.2-.7-.2-.9 0L12.7 12.4z" fill="#FF3366"/>
                  <path d="M12.7 12.4L3.7 21.4c.2.2.6.2.9 0l9.5-5.5 1.6-.9-3-3z" fill="#FFD13B"/>
                  <path d="M15.7 9.4l-3 3 3 3 1-.6 4.6-2.6c.5-.3.5-.8 0-1.1l-4.6-2.6-1-.7z" fill="#00E676"/>
              </svg>
              Mobile
            </button>
            <button
              onClick={() => setPlatform("desktop")}
              className={`relative z-10 flex items-center justify-center gap-2.5 px-8 py-3.5 w-44 rounded-full font-semibold text-[15px] transition-colors duration-300 ${
                platform === "desktop"
                  ? "text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                  <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                  <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                  <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
              </svg>
              Desktop
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-32"
            >
              {activeFeatures.map((feature, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div 
                    key={feature.id} 
                    className={`flex flex-col items-center gap-12 lg:gap-16 ${
                      platform === "mobile" 
                        ? (!isEven ? 'lg:flex-row-reverse' : 'lg:flex-row') 
                        : ''
                    }`}
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`w-full ${
                        platform === "desktop" 
                          ? 'max-w-4xl text-center flex flex-col items-center' 
                          : 'lg:w-1/2 flex flex-col items-start'
                      }`}
                    >
                      <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 transition-colors duration-300 leading-[1.1]">
                        {feature.title}
                      </h2>
                      <p className={`text-lg text-slate-500 dark:text-[#AEB7C6] font-medium leading-relaxed mb-8 transition-colors duration-300 ${platform === "desktop" ? "max-w-2xl mx-auto" : ""}`}>
                        {feature.description}
                      </p>

                      <div className={`w-full ${
                        platform === "desktop" 
                          ? 'flex flex-wrap justify-center gap-x-8 gap-y-4' 
                          : 'space-y-4'
                      }`}>
                        {feature.capabilities.map((cap, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 * i }}
                            className={
                              platform === "desktop"
                                ? "flex items-center gap-2.5 text-slate-700 dark:text-slate-300"
                                : "flex items-center gap-3 bg-slate-50 dark:bg-[#1A2238] border border-slate-100 dark:border-[rgba(255,255,255,0.08)] px-5 py-4 rounded-2xl shadow-sm hover:shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300"
                            }
                          >
                            <CheckCircle2 className={`flex-shrink-0 ${
                              platform === "desktop" 
                                ? "w-5 h-5 text-[#0066FF] dark:text-[#3B82F6] opacity-80" 
                                : "w-5 h-5 text-[#0066FF] dark:text-[#3B82F6] transition-colors duration-300"
                            }`} />
                            <span className={
                              platform === "desktop"
                                ? "text-[15px] font-semibold"
                                : "text-sm font-bold text-slate-800 dark:text-white transition-colors duration-300"
                            }>{cap}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`w-full ${
                        platform === "desktop" 
                          ? 'mt-8 flex justify-center relative' 
                          : 'lg:w-1/2 flex justify-center relative'
                      }`}
                    >
                      <div 
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm h-full ${platform === 'desktop' ? 'max-h-[400px]' : 'max-h-[600px]'} bg-[#0066FF] opacity-5 dark:opacity-10 blur-[100px] rounded-full -z-10`}
                      />

                      {platform === "mobile" ? (
                        <div className="relative w-[300px] h-[600px] sm:w-[330px] sm:h-[680px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex-shrink-0 border-4 border-slate-800 dark:border-slate-800/80 transition-shadow duration-300 group">
                          <div className="w-full h-full bg-slate-100 dark:bg-[#111827] rounded-[2.5rem] overflow-hidden relative shadow-inner">
                            <Image
                              src={feature.image}
                              alt={`Tralance mobile ${feature.title.toLowerCase()}`}
                              fill
                              sizes="(max-width: 640px) 300px, 330px"
                              className="object-cover"
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full max-w-[1100px] flex-shrink-0 group flex flex-col items-center">
                          
                          <div className="relative w-full bg-slate-800 dark:bg-slate-900 rounded-xl sm:rounded-2xl p-2 sm:p-3 pb-3 sm:pb-4 border-[3px] border-slate-700 dark:border-slate-800 shadow-2xl z-10 transition-shadow duration-300">
                          
                            <div className="w-full relative aspect-[21/9] rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
                              <Image
                                src={feature.image}
                                alt={`Tralance desktop ${feature.title.toLowerCase()}`}
                                fill
                                quality={100}
                                unoptimized={true}
                                sizes="(max-width: 1200px) 100vw, 1100px"
                                className="object-cover object-top"
                                priority={index === 0}
                              />
                            </div>
                            
                            <div className="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-slate-700 dark:bg-slate-800"></div>
                          </div>
                          
                          <div className="relative w-12 sm:w-16 h-8 sm:h-12 bg-gradient-to-b from-slate-700 to-slate-900 dark:from-slate-800 dark:to-black z-0 -mt-2 border-l border-r border-slate-600 dark:border-slate-700"></div>

                          <div className="relative w-32 sm:w-48 h-3 sm:h-4 bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-t-xl rounded-b-sm shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-0 -mt-1 border-t border-slate-400 dark:border-slate-600"></div>
                        </div>
                      )}

                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
