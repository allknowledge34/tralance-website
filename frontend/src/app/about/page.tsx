import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tralance – Privacy-First Finance App",
  description: "Learn the story behind Tralance, a privacy-first finance tool by DmilX. Designed by developer Sachin Kumar to solve freelancers' budgeting needs without tracking.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sachin Kumar",
    "jobTitle": "Software Developer",
    "affiliation": { "@type": "Organization", "name": "DmilX" },
    "url": "https://tralance.pro/about",
    "email": "allknowledge34@gmail.com"
  };

  return (
    <main className="bg-white dark:bg-[#030303] min-h-screen py-16 md:py-24 font-sans text-slate-800 dark:text-slate-300 selection:bg-blue-100 dark:selection:bg-blue-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[780px] mx-auto px-5 sm:px-6 lg:px-8">
        
        <header className="mb-14 border-b border-slate-200/60 dark:border-white/5 pb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            About Tralance
          </h1>
          <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium mb-6">
            Tralance is an independent project focused on building privacy-first tools for freelancers and students. Everything is designed to stay simple, local and useful.
          </p>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
            Last Updated: August 2026
          </p>
        </header>

        <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-6 prose-p:text-[16px] prose-p:leading-relaxed prose-p:mb-6 prose-li:text-[16px] max-w-none">
          
          <section className="scroll-mt-24">
            <h2>Why I Built Tralance</h2>
            <p>
              While working on various freelance projects, I struggled to find a simple way to keep track of my income and expenses. Every finance app I tried either required me to create an account, forced my data to sync to a cloud server, or pushed a monthly subscription just for basic features.
            </p>
            <p>
              I just wanted a lightweight tool that simply worked without getting in the way. Since I couldn&apos;t find exactly what I was looking for, I decided to build it myself. What started as a small personal utility eventually grew into Tralance.
            </p>
          </section>

          <hr className="my-12 border-slate-200/60 dark:border-white/5" />

          <section className="scroll-mt-24">
            <h2>What Makes Tralance Different</h2>
            <p>
              Tralance is designed with a strict focus on simplicity and local functionality. It works completely offline, meaning you don&apos;t need a constant internet connection to log your finances or use the calculators. 
            </p>
            <p>
              There are no mandatory accounts or login screens. Everything you type is stored locally on your own device using standard browser storage. It was built explicitly for freelancers who just want a clean interface to manage their numbers without trading their personal data to a third-party server.
            </p>
          </section>

          <hr className="my-12 border-slate-200/60 dark:border-white/5" />

          <section className="scroll-mt-24">
            <h2>About the Developer</h2>
            <div className="flex items-center gap-4 mb-6 not-prose">
              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-[#0B1020] flex items-center justify-center border border-slate-200/60 dark:border-[rgba(255,255,255,0.05)] shadow-sm">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">SK</span>
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-base">Sachin Kumar</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Independent Full Stack & Android Developer</div>
              </div>
            </div>
            <p>
              Building practical software focused on privacy, simplicity and offline-first experiences.
            </p>
          </section>

          <hr className="my-12 border-slate-200/60 dark:border-white/5" />

          <section className="scroll-mt-24">
            <h2>About DmilX</h2>
            <p>
              DmilX is my independent software studio where I publish apps, developer tools and web projects.
            </p>
          </section>

          <hr className="my-12 border-slate-200/60 dark:border-white/5" />

          <section className="scroll-mt-24">
            <h2>Project Timeline</h2>
            
            <div className="not-prose relative border-l border-slate-200 dark:border-slate-800 ml-2 md:ml-3 my-8">
              <div className="mb-0 ml-6 md:ml-8 relative">
                <span className="absolute -left-[29px] md:-left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-[#030303]"></span>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3">2026</h3>
                <ul className="space-y-3 text-[15px] text-slate-600 dark:text-slate-400 font-medium">
                  <li className="flex items-start">
                    <span className="mr-2 text-slate-400 dark:text-slate-500">•</span>
                    <span>Started building Tralance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-slate-400 dark:text-slate-500">•</span>
                    <span>Released Android application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-slate-400 dark:text-slate-500">•</span>
                    <span>Released Desktop application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-slate-400 dark:text-slate-500">•</span>
                    <span>Launched official website</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-slate-400 dark:text-slate-500">•</span>
                    <span>Added free productivity tools</span>
                  </li>
                </ul>
              </div>
            </div>
            
          </section>

          <hr className="my-12 border-slate-200/60 dark:border-white/5" />

          <section className="scroll-mt-24">
            <h2>Future Roadmap</h2>
            <p>
              Future improvements will focus on expanding the collection of offline productivity tools and refining the existing calculators. Additional privacy-focused utilities will be introduced steadily over time, maintaining the same commitment to simplicity and local storage.
            </p>
          </section>

          <hr className="my-12 border-slate-200/60 dark:border-white/5" />

          <section className="scroll-mt-24 mb-8">
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Thank you for visiting. I hope these tools prove as useful to you as they have been to me.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}
