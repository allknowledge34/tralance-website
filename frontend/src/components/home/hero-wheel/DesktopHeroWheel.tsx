"use client";

import React from "react";
import { motion } from "framer-motion";
import { IntelligenceWheel } from "./intelligence-wheel";


export default function DesktopHeroWheel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <IntelligenceWheel />
    </motion.div>
  );
}
