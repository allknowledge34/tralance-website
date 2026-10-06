"use client";

import React from "react";
import Link from "next/link";
import { Youtube, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#0A0A0A] pt-16 pb-12 transition-colors duration-300 print:hidden font-sans border-t border-slate-200 dark:border-white/5">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3 h-8 mb-10">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
            <Image src="/app-icon.png" alt="Tralance Logo" fill sizes="32px" className="object-cover" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white transition-colors duration-300 leading-none">
            Tralance
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">

          <div className="flex flex-col">
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-6">Product</h4>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/features" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-6">Tools</h4>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/tools/freelancer-invoice-generator" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Invoice Generator</Link></li>
              <li><Link href="/tools/project-brief-builder" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Project Brief Builder</Link></li>
              <li><Link href="/tools/project-profit-calculator" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Project Profit Calculator</Link></li>
              <li><Link href="/tools" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">View All Tools</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-6">Company</h4>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/about" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-6">Legal</h4>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/privacy" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openCookieSettings')); }} className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left">Cookie Settings</button></li>
              <li><Link href="/refund" className="text-[15px] font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Refund & Cancellation</Link></li>
            </ul>
          </div>

          <div className="flex flex-col md:col-span-2 lg:col-span-1">
            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-6">Connect with Us</h4>
            <div className="flex items-center gap-3 mb-10">
              <a href="https://www.instagram.com/dmilx.tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tralance on Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#a6a6a6] hover:bg-[#a6a6a6] text-white transition-colors duration-200"
              >
                <Instagram className="w-[18px] h-[18px]" strokeWidth={2} />
              </a>
              <a
                href="https://www.youtube.com/@AiCodingHub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tralance on YouTube"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#a6a6a6] hover:bg-[#a6a6a6] text-white transition-colors duration-200"
              >
                <Youtube className="w-[18px] h-[18px]" strokeWidth={2} />
              </a>
            </div>

            <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-6">Download Tralance</h4>
            <div className="flex flex-col gap-4">
              <a
                aria-label="Download Tralance on Google Play"
                href="https://play.google.com/store/apps/details?id=com.sachin.tralance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full xl:w-[200px] inline-flex items-center justify-start gap-3 px-5 py-3 rounded-lg bg-[#0A0D14] text-white hover:bg-black font-bold transition-transform hover:scale-100 active:scale-95 shadow-xl shadow-black/10"
              >
                <svg className="w-[26px] h-[26px] flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.6 2.4c-.2.2-.3.6-.3 1.1v17c0 .5.1.9.3 1.1l.1.1 9-9v-.3l-9-9-.1.1z" fill="#3BCCFF"/>
                  <path d="M12.7 12.4l3-3-1.6-.9-9.5-5.5c-.3-.2-.7-.2-.9 0L12.7 12.4z" fill="#FF3366"/>
                  <path d="M12.7 12.4L3.7 21.4c.2.2.6.2.9 0l9.5-5.5 1.6-.9-3-3z" fill="#FFD13B"/>
                  <path d="M15.7 9.4l-3 3 3 3 1-.6 4.6-2.6c.5-.3.5-.8 0-1.1l-4.6-2.6-1-.7z" fill="#00E676"/>
                </svg>

                <div className="text-left flex flex-col justify-center">
                  <p className="text-[9px] uppercase font-semibold text-slate-300 leading-none tracking-wide">
                    Get it on
                  </p>
                  <p className="text-[16px] font-bold leading-tight mt-1 text-white">
                    Google Play
                  </p>
                </div>
              </a>

              <a
                aria-label="Download Tralance on Microsoft Store"
                href="https://apps.microsoft.com/detail/xpddtkcglcbwj0?cid=PCCongratsBnr&hl=en-US&gl=IN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full xl:w-[200px] inline-flex items-center justify-start gap-3 px-5 py-3 rounded-lg bg-[#0A0D14] text-white hover:bg-black font-bold transition-transform hover:scale-100 active:scale-95 shadow-xl shadow-black/10"
              >
                <svg className="w-[22px] h-[22px] flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                  <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                  <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                  <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
                </svg>

                <div className="text-left flex flex-col justify-center">
                  <p className="text-[9px] uppercase font-semibold text-slate-300 leading-none tracking-wide">
                    Get it from
                  </p>
                  <p className="text-[16px] font-bold leading-tight mt-1 text-white">
                    Microsoft
                  </p>
                </div>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-300 dark:border-white/10">
          <div className="text-[13px] text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Privacy-focused tools for freelancers to manage projects, money, clients, and everyday freelance work. <br />
            Tralance is operated by DmilX.<br />
         
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#a6a6a6] flex items-center justify-center flex-shrink-0">
                <Image src="/app-icon.png" alt="Logo" width={16} height={16} className="rounded-sm" />
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400">
                © 2026 Tralance. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/privacy" className="text-[13px] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-[13px] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-[13px] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Cookie Policy</Link>
              <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openCookieSettings')); }} className="text-[13px] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left">Cookie Settings</button>
              <Link href="/refund" className="text-[13px] text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Refunds</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
