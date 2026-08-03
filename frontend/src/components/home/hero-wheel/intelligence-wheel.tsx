"use client";

import React from "react";
import { motion } from "framer-motion";
import { IntelligenceCenter } from "./intelligence-center";
import { FeatureSegment } from "./feature-segment";
import { 
  TrendingUp, TrendingDown, Users, Briefcase, 
  PiggyBank, Target, LineChart, BarChart2, 
  FileText, Cloud, Lock, Shield 
} from "lucide-react";

const FEATURES = [
  { label: "Income", icon: TrendingUp, colorClass: "text-emerald-500 bg-emerald-500" },
  { label: "Expense", icon: TrendingDown, colorClass: "text-rose-500 bg-rose-500" },
  { label: "Clients", icon: Users, colorClass: "text-blue-500 bg-blue-500" },
  { label: "Projects", icon: Briefcase, colorClass: "text-purple-500 bg-purple-500" },
  { label: "Savings", icon: PiggyBank, colorClass: "text-emerald-600 bg-emerald-600" },
  { label: "Reports", icon: FileText, colorClass: "text-orange-500 bg-orange-500" },
  { label: "Analytics", icon: BarChart2, colorClass: "text-sky-500 bg-sky-500" },
  { label: "Forecast", icon: LineChart, colorClass: "text-indigo-500 bg-indigo-500" },
  { label: "Goals", icon: Target, colorClass: "text-amber-500 bg-amber-500" },
  { label: "Backup", icon: Cloud, colorClass: "text-purple-500 bg-purple-500" },
  { label: "Vault", icon: Lock, colorClass: "text-blue-500 bg-blue-500" },
  { label: "Privacy", icon: Shield, colorClass: "text-teal-500 bg-teal-500" },
];

export function IntelligenceWheel() {
  const radius = 180; // Distance of segments from center

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center scale-75 md:scale-90 lg:scale-100 origin-center lg:origin-right">
      
      <motion.svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 600 600"
      >
        <motion.circle 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          cx="300" cy="300" r="260" fill="none" className="stroke-slate-200 dark:stroke-[rgba(255,255,255,0.08)] transition-colors duration-300" strokeWidth="1" strokeDasharray="4 8" 
        />
        <motion.circle 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          cx="300" cy="300" r="110" fill="none" className="stroke-slate-200 dark:stroke-[rgba(255,255,255,0.08)] transition-colors duration-300" strokeWidth="1" strokeDasharray="8 8" 
        />
        {[0, 90, 180, 270].map((angle) => {
          const rad = angle * (Math.PI / 180);
          return (
            <circle 
              key={angle}
              cx={300 + 260 * Math.cos(rad)} 
              cy={300 + 260 * Math.sin(rad)} 
              r="4" 
              className="fill-slate-300 dark:fill-[#AEB7C6]/30 transition-colors duration-300" 
            />
          );
        })}
      </motion.svg>

      <IntelligenceCenter />

      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {FEATURES.map((feature, index) => {
          const angle = index * 30;
          return (
            <FeatureSegment
              key={feature.label}
              label={feature.label}
              icon={feature.icon}
              colorClass={feature.colorClass}
              angle={angle}
              radius={radius}
              index={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
