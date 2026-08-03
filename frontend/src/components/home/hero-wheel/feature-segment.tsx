"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface FeatureSegmentProps {
  label: string;
  icon: LucideIcon;
  colorClass: string;
  angle: number;
  radius: number;
  index: number;
}

export function FeatureSegment({ label, icon: Icon, colorClass, angle, radius, index }: FeatureSegmentProps) {
  // Convert polar to cartesian coordinates
  // Angle is offset by -90deg so 0 starts at the top (12 o'clock)
  const rad = (angle - 90) * (Math.PI / 180);
  // Round to 2 decimal places to prevent React hydration mismatch between server and client floating point precision
  const x = Number((radius * Math.cos(rad)).toFixed(2));
  const y = Number((radius * Math.sin(rad)).toFixed(2));

  const itemRotation = angle; 
  const contentRotation = -angle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x, y, rotate: itemRotation }}
      animate={{ opacity: 1, scale: 1, x, y, rotate: itemRotation }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", stiffness: 60, damping: 10 }}
      className="absolute top-1/2 left-1/2 -ml-12 -mt-12 w-24 h-24 z-10"
    >
      <motion.div
        whileHover={{ scale: 1.1, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`w-full h-full relative cursor-pointer group`}
      >
        <div className={`absolute inset-0 rounded-[2rem] bg-white dark:bg-[#1A2238] border border-slate-100 dark:border-[rgba(255,255,255,0.08)] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:border-slate-200 dark:group-hover:border-[rgba(255,255,255,0.2)]`}>
          <div className={`absolute inset-0 rounded-[2rem] opacity-[0.08] dark:opacity-[0.15] group-hover:opacity-[0.15] dark:group-hover:opacity-[0.25] transition-opacity duration-300 ${colorClass}`} />
        </div>

        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          animate={{ rotate: [contentRotation, contentRotation - 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <Icon className={`w-5 h-5 mb-1.5 ${colorClass.split(' ')[0]}`} />
          <span className={`text-[10px] font-bold ${colorClass.split(' ')[0]}`}>
            {label}
          </span>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
