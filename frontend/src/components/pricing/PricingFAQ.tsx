"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const PRICING_FAQS = [
  {
    q: "Do I need an account to use the free tools?",
    a: "No account is required to use Tralance's free tools. You can generate up to 2 free PDFs per tool without signing up.",
  },
  {
    q: "Are the free tools still free?",
    a: "Yes. Our interactive calculators, invoice generator, and brief builders remain completely free to use. Calculators are 100% unlimited. PDF generators have a limit of 2 free downloads.",
  },
  {
    q: "Is payment handled securely?",
    a: "Payments are processed securely through Razorpay, a trusted and official payment gateway.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B1020] border-t border-slate-200/50 dark:border-white/5 mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {PRICING_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className="bg-white dark:bg-[#12182B] border border-slate-200/50 dark:border-white/5 rounded-2xl overflow-hidden transition-colors duration-300 shadow-sm"
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
                      <div className="px-5 md:px-6 pb-6 pt-0 text-[15px] md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
