"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is the best freelance income and expense tracker?",
    a: "Tralance is designed specifically as the ultimate freelance income and expense tracker. It provides robust offline tracking, extreme privacy, and comprehensive local analytics without relying on cloud servers or generic SaaS dashboards."
  },
  {
    q: "Is Tralance a fully offline finance app?",
    a: "Yes. Tralance operates entirely offline as a local database finance app using SQLite. Your financial data never leaves your device unless you manually initiate an encrypted backup."
  },
  {
    q: "How does an offline income tracker protect my privacy?",
    a: "Unlike traditional expense trackers that harvest and monetize your financial data, a privacy-focused finance app like Tralance stores everything locally. There is absolute zero telemetry and no cloud syncing by default."
  },
  {
    q: "Can I manage multiple freelance projects with Tralance?",
    a: "Absolutely. Tralance functions as a powerful freelancer project manager. You can attach specific clients, track payment statuses, and monitor project income directly alongside your daily expenses."
  },
  {
    q: "Does Tralance support client payment tracking?",
    a: "Yes! As a complete client payment tracking app, you can log incoming payments, pending invoices, and historical client earnings to ensure you never miss a payment."
  },
  {
    q: "How do I export my data from Tralance?",
    a: "You can easily export your local SQLite finance tracker data to CSV format at any time from the Settings & Privacy Vault, giving you complete data portability."
  },
  {
    q: "Is there a biometric lock for the app?",
    a: "Yes. To enhance its status as a privacy-focused expense manager, Tralance includes a biometric lock (Face ID / Touch ID), privacy mode, and auto-lock timers."
  },
  {
    q: "Can I use Tralance without creating an account?",
    a: "Yes, Tralance requires zero sign-ups, no emails, and no passwords. It functions purely as a local storage finance tracker."
  },
  {
    q: "How do I track my savings goals?",
    a: "Tralance allows you to set automated percentage-based targets. As you log project income, it helps visualize your progress toward long-term financial targets and tax savings."
  },
  {
    q: "How do I back up my freelance accounting data?",
    a: "Tralance supports encrypted local backups. You control when and where your encrypted backup file is stored (e.g., local storage, personal iCloud, or external drive)."
  },
  {
    q: "Can I search through my past transactions?",
    a: "Yes, the built-in Search Vault provides instant local search capabilities. You can filter by income, expense, client, or project instantly with zero server latency."
  },
  {
    q: "Does Tralance track daily transaction history?",
    a: "Yes, you can view your financial timeline day by day, complete with daily summaries, income totals, and expense totals."
  },
  {
    q: "Can I categorize my expenses?",
    a: "Yes. You can categorize all your spending to monitor where your money goes, which is essential for end-of-year tax deductions."
  },
  {
    q: "What platforms does Tralance support?",
    a: "Currently, Tralance is available as a premium mobile application optimized for offline, native performance."
  },
  {
    q: "How does Tralance handle different currencies?",
    a: "Tralance allows you to log transactions in your preferred currency, maintaining a unified local ledger for all your freelance earnings."
  },
  {
    q: "Why is local storage better for an expense manager app?",
    a: "Local storage eliminates server downtime, prevents data breaches from cloud hacks, and ensures the app works flawlessly without an internet connection."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1020] transition-colors duration-300 border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-[#AEB7C6] transition-colors duration-300">
            Everything you need to know about the best freelance income and expense tracker.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-[#1A2238] border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden transition-colors duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <span className="font-bold text-slate-900 dark:text-white transition-colors duration-300 pr-8">
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#0066FF] text-white' : 'bg-slate-100 dark:bg-[#111827] text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-[#111827]/80'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-500 dark:text-[#AEB7C6] leading-relaxed transition-colors duration-300">
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
