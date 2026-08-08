import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tralance – Tools for Freelancers",
  description:
    "Learn about Tralance, a freelancer-focused platform offering practical finance management, productivity tools, and privacy-first applications for managing freelance work.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sachin Kumar",
    jobTitle: "Independent Full Stack & Android Developer",
    affiliation: {
      "@type": "Organization",
      name: "DmilX",
    },
    url: "https://tralance.pro/about",
    email: "allknowledge34@gmail.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">

          <header className="mb-14 border-b border-slate-200/60 dark:border-white/5 pb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              About Tralance
            </h1>

            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium mb-6">
              Tralance is a freelancer-focused platform built to make freelance
              work, finances, and everyday business tasks simpler, more private,
              and easier to manage.
            </p>

            <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
              Last Updated: August 2026
            </p>
          </header>

          <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-6 prose-p:text-[16px] prose-p:leading-relaxed prose-p:mb-6 prose-li:text-[16px] max-w-none">

            <section className="scroll-mt-24">
              <h2>Why I Built Tralance</h2>

              <p>
                While working on freelance projects, I found that managing
                income, expenses, projects, clients, rates, invoices, and other
                everyday freelance tasks often meant using several different
                tools.
              </p>

              <p>
                I wanted something simpler: practical tools that help freelancers
                manage their work without unnecessary complexity. What started
                as a small personal utility gradually grew into Tralance - a
                broader platform for freelancers to manage their finances and
                everyday freelance work.
              </p>
            </section>

            <hr className="my-12 border-slate-200/60 dark:border-white/5" />

            <section className="scroll-mt-24">
              <h2>What Tralance Offers</h2>

              <p>
                Tralance brings together practical tools and applications
                designed around the everyday needs of freelancers.
              </p>

              <ul>
                <li>
                  <strong>Finance Management:</strong> Track income, expenses,
                  budgets, savings, transactions, and financial activity.
                </li>

                <li>
                  <strong>Freelance Tools:</strong> Use tools for calculating
                  rates, estimating project profit, generating invoices,
                  creating contracts, and building project briefs.
                </li>

                <li>
                  <strong>Mobile & Desktop:</strong> Use Tralance across
                  supported devices to manage freelance work and finances.
                </li>

                <li>
                  <strong>Privacy-Focused Experience:</strong> Tralance is
                  designed to minimize unnecessary data sharing and provide
                  local or offline functionality where supported.
                </li>

                <li>
                  <strong>Simple Workflows:</strong> Practical features without
                  unnecessary accounts, complexity, or subscription pressure
                  for the core experience.
                </li>
              </ul>
            </section>

            <hr className="my-12 border-slate-200/60 dark:border-white/5" />

            {/* What Makes Tralance Different */}
            <section className="scroll-mt-24">
              <h2>What Makes Tralance Different</h2>

              <p>
                Tralance is built around a simple idea: freelance tools should
                help you get work done instead of making everyday tasks more
                complicated.
              </p>

              <p>
                Privacy is also an important part of the product philosophy.
                Tralance uses local and offline functionality where supported,
                while its web tools are designed to provide useful functionality
                directly in your browser without requiring an account for normal
                use.
              </p>

              <p>
                The goal is not to build another complicated business platform.
                It is to provide focused, practical tools that freelancers can
                actually use in their day-to-day work.
              </p>
            </section>

            <hr className="my-12 border-slate-200/60 dark:border-white/5" />

            <section className="scroll-mt-24">
              <h2>About the Developer</h2>

              <div className="flex items-center gap-4 mb-6 not-prose">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-[#0B1020] flex items-center justify-center border border-slate-200/60 dark:border-[rgba(255,255,255,0.05)] shadow-sm">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    SK
                  </span>
                </div>

                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-base">
                    Sachin Kumar
                  </div>

                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    Independent Full Stack & Android Developer
                  </div>
                </div>
              </div>

              <p>
                I build practical software focused on privacy, simplicity,
                useful workflows, and offline-first experiences where they make
                sense.
              </p>
            </section>

            <hr className="my-12 border-slate-200/60 dark:border-white/5" />

            <section className="scroll-mt-24">
              <h2>About DmilX</h2>

              <p>
                DmilX is my independent software studio where I build and
                publish apps, developer tools, web projects, and other practical
                software.
              </p>
            </section>

            <hr className="my-12 border-slate-200/60 dark:border-white/5" />

            <section className="scroll-mt-24">
              <h2>Project Timeline</h2>

              <div className="not-prose relative border-l border-slate-200 dark:border-slate-800 ml-2 md:ml-3 my-8">
                <div className="mb-0 ml-6 md:ml-8 relative">
                  <span className="absolute -left-[29px] md:-left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-[#030303]"></span>

                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3">
                    2026
                  </h3>

                  <ul className="space-y-3 text-[15px] text-slate-600 dark:text-slate-400 font-medium">
                    <li className="flex items-start">
                      <span className="mr-2 text-slate-400 dark:text-slate-500">
                        •
                      </span>
                      <span>Started building Tralance</span>
                    </li>

                    <li className="flex items-start">
                      <span className="mr-2 text-slate-400 dark:text-slate-500">
                        •
                      </span>
                      <span>Released Android application</span>
                    </li>

                    <li className="flex items-start">
                      <span className="mr-2 text-slate-400 dark:text-slate-500">
                        •
                      </span>
                      <span>Released Desktop application</span>
                    </li>

                    <li className="flex items-start">
                      <span className="mr-2 text-slate-400 dark:text-slate-500">
                        •
                      </span>
                      <span>Launched official website</span>
                    </li>

                    <li className="flex items-start">
                      <span className="mr-2 text-slate-400 dark:text-slate-500">
                        •
                      </span>
                      <span>Added free freelance productivity tools</span>
                    </li>

                    <li className="flex items-start">
                      <span className="mr-2 text-slate-400 dark:text-slate-500">
                        •
                      </span>
                      <span>Expanded Tralance into a broader freelancer-focused platform</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="my-12 border-slate-200/60 dark:border-white/5" />

            <section className="scroll-mt-24">
              <h2>Future Direction</h2>

              <p>
                Tralance will continue to grow around the real problems
                freelancers face. Future improvements will focus on expanding
                practical freelance tools, improving financial management
                features, and making the experience across web, mobile, and
                desktop more useful.
              </p>

              <p>
                The goal is to keep Tralance simple, practical, privacy-focused,
                and useful as the platform grows.
              </p>
            </section>

            <hr className="my-12 border-slate-200/60 dark:border-white/5" />

            <section className="scroll-mt-24 mb-8">
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Thank you for visiting Tralance. I hope these tools make your
                freelance work a little simpler.
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}