"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 via-accent-purple/15 to-accent-cyan/15 blur-[100px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] bg-gradient-to-b from-slate-900 to-slate-950 dark:bg-[#1A2238] dark:from-[#1A2238] dark:to-[#1A2238] text-white px-8 py-16 sm:px-16 sm:py-20 text-center border border-slate-800 dark:border-[rgba(255,255,255,0.08)] shadow-2xl transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] rounded-[40px]" />

          <div className="relative z-10 flex flex-col items-center">

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6 xl:whitespace-nowrap">
              Take Tralance With You.
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed mb-4">
              Use Tralance on your phone or desktop to keep your freelance work organized, with privacy at the core.
            </p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Download Tralance on Google Play"
                href="https://play.google.com/store/apps/details?id=com.sachin.tralance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-[220px] inline-flex items-center justify-center sm:justify-start gap-4 px-6 py-3 rounded-2xl bg-[#0A0D14] text-white hover:bg-black font-bold transition-all shadow-xl shadow-black/20"
              >
                <svg className="w-[30px] h-[30px] flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.6 2.4c-.2.2-.3.6-.3 1.1v17c0 .5.1.9.3 1.1l.1.1 9-9v-.3l-9-9-.1.1z" fill="#3BCCFF"/>
                  <path d="M12.7 12.4l3-3-1.6-.9-9.5-5.5c-.3-.2-.7-.2-.9 0L12.7 12.4z" fill="#FF3366"/>
                  <path d="M12.7 12.4L3.7 21.4c.2.2.6.2.9 0l9.5-5.5 1.6-.9-3-3z" fill="#FFD13B"/>
                  <path d="M15.7 9.4l-3 3 3 3 1-.6 4.6-2.6c.5-.3.5-.8 0-1.1l-4.6-2.6-1-.7z" fill="#00E676"/>
                </svg>

                <div className="text-left flex flex-col justify-center">
                  <p className="text-[10px] uppercase font-semibold text-slate-300 leading-none tracking-wide">
                    Get it on
                  </p>
                  <p className="text-[19px] font-bold leading-tight mt-1 text-white">
                    Google Play
                  </p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Download Tralance on Microsoft Store"
                href="https://apps.microsoft.com/detail/xpddtkcglcbwj0?cid=PCCongratsBnr&hl=en-US&gl=IN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-[220px] inline-flex items-center justify-center sm:justify-start gap-4 px-6 py-3 rounded-2xl bg-[#0A0D14] text-white hover:bg-black font-bold transition-all shadow-xl shadow-black/20"
              >
                <svg className="w-[26px] h-[26px] flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                  <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                  <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                  <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
                </svg>

                <div className="text-left flex flex-col justify-center">
                  <p className="text-[10px] uppercase font-semibold text-slate-300 leading-none tracking-wide">
                    Get it from
                  </p>
                  <p className="text-[19px] font-bold leading-tight mt-1 text-white">
                    Microsoft
                  </p>
                </div>
              </motion.a>
            </motion.div>
            <p className="mt-8 text-sm text-slate-500 font-medium">
              Available for mobile and desktop. Web tools are available directly in your browser.
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
