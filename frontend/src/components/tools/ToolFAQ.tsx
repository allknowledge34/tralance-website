"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface ToolFAQItem {
  q: string;
  a: string;
}

export function ToolFAQ({ faqs }: { faqs: ToolFAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq.q}
            className="bg-white dark:bg-[#1A2238] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden transition-colors duration-300 shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none group"
            >
              <span className="font-bold text-slate-900 dark:text-white transition-colors duration-300 pr-2">
                {faq.q}
              </span>

              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "bg-[#0066FF] text-white"
                    : "bg-slate-100 dark:bg-[#111827] text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-[#111827]/80"
                }`}
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="px-5 md:px-6 pb-6 pt-0 text-[15px] md:text-base text-slate-500 dark:text-[#AEB7C6] leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
