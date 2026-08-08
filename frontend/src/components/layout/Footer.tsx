"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#FAFBFC] dark:bg-[#050505] border-t border-slate-200/60 dark:border-white/5 font-sans pt-16 pb-8 transition-colors duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-3 h-8 mb-6">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                <Image src="/app-icon.png" alt="Tralance Logo" fill sizes="32px" className="object-cover" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white transition-colors duration-300 leading-none">
                Tralance
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium sm:max-w-xs">
              The premium, offline-first finance tracker built specifically for freelancers to manage income, payments, and expenses privately.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col">
            <h4 className="flex items-center h-8 text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-6">Product</h4>
            <ul className="flex flex-col space-y-3.5">
              <li><Link href="/" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/features" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link href="/blog" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col">
            <h4 className="flex items-center h-8 text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-6">Company</h4>
            <ul className="flex flex-col space-y-3.5">
              <li><Link href="/about" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Tools */}
          <div className="flex flex-col">
            <h4 className="flex items-center h-8 text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-6">Tools</h4>
            <ul className="flex flex-col space-y-3.5">
              <li><Link href="/tools/freelancer-invoice-generator" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Invoice Generator</Link></li>
              <li><Link href="/tools/project-brief-builder" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Project Brief Builder</Link></li>
              <li><Link href="/tools/project-profit-calculator" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Project Profit Calculator</Link></li>
              <li><Link href="/tools" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">View All Tools</Link></li>
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div className="flex flex-col">
            <h4 className="flex items-center h-8 text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-6">Connect</h4>
            <ul className="flex flex-col space-y-3.5">
              <li><a href="https://www.youtube.com/@AiCodingHub" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">YouTube</a></li>
              <li><a href="https://www.instagram.com/dmilx.tech/" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Instagram</a></li>
              <li><a href="#" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter(x)</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright & Bottom Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 border-t border-slate-200/60 dark:border-white/5 pt-8">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center md:text-left">
            © 2026 Tralance. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <Link href="/privacy" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
