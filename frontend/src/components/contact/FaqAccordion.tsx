"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { CONTACT_FAQS } from "@/lib/data";

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTACT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="flex flex-col gap-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {CONTACT_FAQS.map((faq, idx) => {
        const isOpen = openFaq === idx;
        return (
          <div
            key={idx}
            className="glass dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenFaq(isOpen ? null : idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base outline-none cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                {faq.q}
              </span>
              {isOpen ? <ChevronUp className="w-4.5 h-4.5" /> : <ChevronDown className="w-4.5 h-4.5" />}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-black/20"
                >
                  <div className="px-6 py-4 text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
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
