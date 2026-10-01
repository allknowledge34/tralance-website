/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import PageTracker from "@/components/analytics/PageTracker";

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Tralance',
  description: 'Review our policies regarding cancellations and refunds for Tralance Pro plans.',
  alternates: {
    canonical: 'https://www.tralance.pro/refund',
  },
};

export default function RefundPage() {
  return (
    <main className="flex-grow pt-10 pb-24 bg-white dark:bg-[#050505]">
      <PageTracker eventName="refund_view" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Last Updated: October 1, 2026
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-p:leading-relaxed prose-li:leading-relaxed">
          <p>
            This Refund & Cancellation Policy outlines the terms regarding purchases of paid plans on Tralance (<strong>https://www.tralance.pro</strong>).
          </p>

          <h2>1. Paid Plans & Delivery of Service</h2>
          <p>
            Tralance offers digital productivity tools. When you purchase a paid plan (such as our Monthly ₹49 plan or Yearly ₹149 plan) via our payment processor, <strong>Razorpay</strong>, digital access to Pro features is granted immediately to your account upon successful payment verification.
          </p>
          <p>
            These features include unlimited PDF generation and the ability to save work to your account. Because these are instantly accessible digital features, the service is considered delivered immediately.
          </p>

          <h2>2. Cancellations and Expiration</h2>
          <p>
            Our current paid plans provide access for a fixed entitlement period (approximately 30 days for Monthly, and 365 days for Yearly). 
          </p>
          <ul>
            <li><strong>No Automatic Billing:</strong> Tralance does not currently utilize automatic recurring subscriptions. Therefore, you do not need to formally "cancel" a recurring charge.</li>
            <li><strong>Expiration:</strong> Your Pro access will simply expire at the end of the term you purchased. After expiration, your account will revert to the Free tier, which includes the standard 2-PDF generation limits.</li>
          </ul>

          <h2>3. Refund Policy</h2>
          <p>
            Because our services grant immediate digital access to unlimited PDF generation and data-saving features, <strong>all sales are generally considered final, and we do not offer automatic refunds</strong> for partial usage, buyer's remorse, or failure to utilize the tools during your active entitlement period.
          </p>
          <p>
            However, refund requests may be evaluated on a strict case-by-case basis in the following extraordinary circumstances:
          </p>
          <ul>
            <li><strong>Duplicate Charges:</strong> If a technical error causes you to be charged multiple times for a single plan purchase.</li>
            <li><strong>Service Outages:</strong> If Tralance experiences a catastrophic, prolonged outage preventing any reasonable use of the Pro features immediately following your purchase.</li>
          </ul>

          <h2>4. Unauthorized Transactions</h2>
          <p>
            If you believe a purchase was made fraudulently using your payment method, please contact us immediately, and simultaneously contact your bank or credit card issuer to report the unauthorized transaction.
          </p>

          <h2>5. Payment Failures</h2>
          <p>
            If a payment fails or is marked as pending by Razorpay, the Pro entitlement will not be granted until the transaction is successfully verified. If money is deducted from your account but the order remains in a failed or pending state, the funds are typically auto-refunded by your bank or Razorpay within 5-7 business days.
          </p>

          <h2>6. How to Contact Us</h2>
          <p>
            If you experience a severe billing issue or believe you qualify for an exceptional refund based on the criteria above, please reach out to us via our <Link href="/contact">Contact page</Link>. When contacting us, please include your registered email address and any relevant transaction or order IDs provided by Razorpay to help us locate your payment.
          </p>
        </div>
      </div>
    </main>
  );
}
