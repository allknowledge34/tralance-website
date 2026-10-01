'use client';
import React from 'react';
import Link from 'next/link';

interface PdfLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PdfLimitModal({ isOpen, onClose }: PdfLimitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#12182B] rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-white/10 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Free Limit Reached</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          You have used your 2 free PDF generations for this tool. Upgrade to Tralance Pro to unlock unlimited PDF generation across all tools.
        </p>

        <Link 
          href="/pricing"
          className="w-full flex items-center justify-center py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors"
        >
          View Pricing Plans
        </Link>
      </div>
    </div>
  );
}
