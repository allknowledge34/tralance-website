"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is Tralance?",
    a: "Tralance is a privacy-first freelance workspace built to help freelancers manage the practical side of their work. It combines useful freelance tools on the web with offline-first apps for managing money, projects, and everyday freelance workflows."
  },
  {
    q: "What can I do with Tralance?",
    a: "Tralance provides practical tools for freelancers, including invoice generation, project profit calculation, rate calculation, project brief creation, contract generation, and other tools designed around common freelance workflows."
  },
  {
    q: "Is Tralance only a finance tracking app?",
    a: "No. Tralance started with freelance finance management, but it is now designed as a broader freelance workspace. The ecosystem covers money, projects, clients, invoices, rates, briefs, contracts, and other practical parts of freelance work."
  },
  {
    q: "Does Tralance work offline?",
    a: "Tralance follows an offline-first approach wherever the product supports it. The native app is designed to keep core financial information available locally on the device, while the website provides browser-based freelance tools that can be used directly without creating an account for the tools that support anonymous use."
  },
  {
    q: "Is Tralance private?",
    a: "Privacy is a core part of Tralance's design philosophy. The native finance experience is built around local data storage and an offline-first approach rather than requiring your financial information to live on a central cloud account."
  },
  {
    q: "Do I need an account to use Tralance's website tools?",
    a: "No account is required for the Tralance website tools that are designed for direct browser use. You can use tools such as the Invoice Generator, Project Profit Calculator, Rate Calculator, Project Brief Builder, and Contract Generator without creating a Tralance account."
  },
  {
    q: "Can I create professional invoices with Tralance?",
    a: "Yes. The Tralance Invoice Generator lets freelancers create professional invoices by entering their business details, client information, services, pricing, taxes, discounts, payment terms, and notes, then preview and print or save the invoice."
  },
  {
    q: "Can Tralance help me calculate whether a freelance project is profitable?",
    a: "Yes. The Project Profit Calculator helps you estimate your take-home amount and effective hourly rate after considering platform fees, processing fees, project expenses, and estimated taxes."
  },
  {
    q: "Can Tralance help me decide what to charge clients?",
    a: "Yes. Tralance includes a Rate Calculator designed to help freelancers estimate and evaluate their freelance rates based on factors such as income goals, working hours, expenses, and other business considerations."
  },
  {
    q: "Can Tralance help freelancers and clients agree on project requirements?",
    a: "Yes. The Project Brief Builder is designed to turn project requirements into a clearer brief that both the freelancer and client can refer to. This can help reduce misunderstandings around deliverables, requirements, timelines, and project expectations."
  },
  {
    q: "Can I create a freelance contract with Tralance?",
    a: "Yes. Tralance includes a Contract Generator designed to help freelancers create a structured starting point for freelance agreements. Generated contracts should be reviewed and adapted to the specific project and applicable legal requirements."
  },
  {
    q: "What platforms does Tralance support?",
    a: "Tralance is being built as a multi-platform freelance workspace, with browser-based tools on the website and native experiences for supported devices. The goal is to make useful freelance workflows available across web, mobile, and desktop rather than limiting Tralance to a single platform."
  },
  {
    q: "Does Tralance store the information I enter into its website tools?",
    a: "The website tools are designed with privacy in mind and do not require an account for supported tools. Where a tool operates locally in the browser, the information is processed within that browser session rather than requiring a personal Tralance account."
  },
  {
    q: "Who is Tralance built for?",
    a: "Tralance is built primarily for freelancers and independent professionals who want simpler ways to manage the practical side of freelance work, especially money, projects, clients, invoices, rates, and project documentation."
  },
  {
    q: "Is Tralance trying to solve every freelancer problem?",
    a: "No. Tralance does not claim to solve every problem a freelancer can have. Its focus is on practical parts of freelance work where better tools can reduce unnecessary manual work and make managing a freelance business easier."
  },
  {
    q: "Why is Tralance focused on privacy and offline-first tools?",
    a: "Freelancers often deal with sensitive information such as income, expenses, client details, project information, and financial records. Tralance is designed around a privacy-first and offline-first philosophy so freelancers can have more control over information that does not always need to live in the cloud."
  },
  {
    q: "Is Tralance free to use?",
    a: "Many Tralance website tools are available to use directly in the browser without an account. Availability and pricing can vary between individual Tralance products and experiences, so check the specific tool or product page for its current terms."
  },
  {
    q: "Can Tralance replace all of my freelance software?",
    a: "Tralance is not intended to claim that it replaces every piece of software a freelancer may need. Instead, it brings together practical freelance workflows and tools in one ecosystem while keeping privacy and simplicity at the center."
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
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] dark:text-white mb-4">
            Frequently Asked Questions
          </h2>

          <p className="max-w-2xl mx-auto text-[15px] md:text-base text-[#64748B] dark:text-slate-400 font-medium leading-relaxed">
            Everything you need to know about Tralance, its freelance tools,
            privacy-first approach, and supported experiences.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
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
      </div>
    </section>
  );
}