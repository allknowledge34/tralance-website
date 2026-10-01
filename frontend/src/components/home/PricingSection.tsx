'use client';

import React, { useState } from 'react';
import CheckoutButton from '@/components/checkout/CheckoutButton';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="pt-12 pb-24 bg-white dark:bg-[#0B1020]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center relative z-20">
         
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Built for Growth at Every Stage
          </h2>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Whether you&apos;re starting small or scaling fast, we have a plan that fits your freelance needs.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>MONTHLY</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full p-1 transition-colors flex items-center relative"
            aria-label="Toggle billing period"
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 absolute ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-bold flex items-center gap-2 transition-colors ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
            ANNUALLY <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full">(SAVE 74%)</span>
          </span>
        </div>

        {/* Container */}
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-[#12182B] rounded-[40px] p-2 sm:p-4 shadow-sm border border-slate-100 dark:border-white/5">
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Left Card - Starter */}
            <div className="bg-white dark:bg-[#0B1020] rounded-[32px] p-8 sm:p-10 shadow-sm border border-slate-100 dark:border-white/5 flex flex-col">
              <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                 <div className="w-5 h-5 bg-slate-800 dark:bg-white rounded-[6px] flex items-center justify-center">
                   <div className="w-2 h-2 bg-white dark:bg-black rounded-full"></div>
                 </div>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-2">Starter Package</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm h-10">For freelancers beginning their journey</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter">₹0</span>
                <span className="text-slate-500 dark:text-slate-400 ml-2 font-medium">/Forever</span>
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/5 w-full mb-8"></div>
              
              <p className="font-bold text-sm text-slate-900 dark:text-white mb-5">What&apos;s included:</p>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                  <Check className="w-4 h-4 mr-3 text-slate-900 dark:text-white shrink-0" /> All 5 tools included
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                  <Check className="w-4 h-4 mr-3 text-slate-900 dark:text-white shrink-0" /> Unlimited calculator usage
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                  <Check className="w-4 h-4 mr-3 text-slate-900 dark:text-white shrink-0" /> 2 free PDF downloads per tool
                </li>
              </ul>
              
              <Link 
                href="/tools"
                className="w-full py-4 px-6 text-center rounded-full font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-all shadow-md mt-auto"
              >
                Get Starter Package
              </Link>
            </div>

            {/* Right Card - Growth */}
            <div className="bg-white dark:bg-[#0B1020] rounded-[32px] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-white/5 flex flex-col relative overflow-hidden">
              
              <div className="absolute top-8 right-8 bg-slate-50 dark:bg-white/10 border border-slate-100 dark:border-white/10 text-slate-900 dark:text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="text-[10px]">✦</span> Most Popular
              </div>

              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mb-6 relative border border-slate-100 dark:border-white/5">
                 <div className="w-6 h-6 bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#A18CD1] rounded-full blur-[3px] opacity-80 mix-blend-multiply dark:mix-blend-screen absolute"></div>
                 <div className="w-4 h-4 bg-gradient-to-br from-[#fad0c4] to-[#ffd1ff] rounded-full absolute"></div>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-2">Growth Package</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm h-10">For scaling freelancers & professionals</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter">
                  {isAnnual ? '₹149' : '₹49'}
                </span>
                <span className="text-slate-500 dark:text-slate-400 ml-2 font-medium">/{isAnnual ? 'Year' : 'Month'}</span>
              </div>

              <div className="h-px bg-slate-100 dark:bg-white/5 w-full mb-8"></div>
              
              <p className="font-bold text-sm text-slate-900 dark:text-white mb-5">Included everything in Starter, plus:</p>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                  <Check className="w-4 h-4 mr-3 text-slate-900 dark:text-white shrink-0" /> Unlimited PDF generation
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                  <Check className="w-4 h-4 mr-3 text-slate-900 dark:text-white shrink-0" /> Save activity and work
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                  <Check className="w-4 h-4 mr-3 text-slate-900 dark:text-white shrink-0" /> Account dashboard & history
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                  <Check className="w-4 h-4 mr-3 text-slate-900 dark:text-white shrink-0" /> Future Pro improvements
                </li>
              </ul>
              
              <CheckoutButton 
                planId={isAnnual ? 'yearly' : 'monthly'}
                amount={isAnnual ? 149 : 49}
                title="Get Growth Package"
                className="w-full py-4 px-6 text-center rounded-full font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-all shadow-md mt-auto"
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
