import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Successful | Tralance',
  robots: { index: false, follow: false },
};

export default function DeliveryPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  return (
    <main className="flex-grow pt-20 pb-32 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Payment successful
        </h1>
        <p className="text-xl font-bold text-primary mb-8">
          Your Tralance Pro access is now active.
        </p>

        <Link href="/tools" className="inline-flex justify-center items-center w-full md:w-auto py-3 px-8 rounded-xl font-bold bg-primary text-white shadow-md hover:bg-primary-dark transition-all">
          Open Pro Tools
        </Link>
      </div>
    </main>
  );
}
