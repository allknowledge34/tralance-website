/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import PageTracker from "@/components/analytics/PageTracker";

export const metadata: Metadata = {
  title: 'Cookie Policy | Tralance',
  description: 'Understand how Tralance uses cookies and similar technologies to provide our services, maintain security, and analyze traffic.',
  alternates: {
    canonical: 'https://www.tralance.pro/cookies',
  },
};

export default function CookiesPage() {
  return (
    <main className="flex-grow pt-10 pb-24 bg-white dark:bg-[#050505]">
      <PageTracker eventName="cookies_view" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Last Updated: October 1, 2026
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-p:leading-relaxed prose-li:leading-relaxed">
          <p>
            This Cookie Policy explains how Tralance ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website at <strong>https://www.tralance.pro</strong>. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2>1. What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Tralance) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>

          <h2>2. Why do we use cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate securely (such as maintaining your logged-in session), and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track free-tier limitations, analyze traffic, or serve relevant advertisements.
          </p>

          <h2>3. Types of technologies we use</h2>

          <h3>Essential / Authentication Technologies</h3>
          <p>
            These are strictly necessary to provide you with services available through our website. They are used to authenticate users, prevent fraudulent use of user accounts, and maintain secure sessions via our authentication provider (NextAuth). Without these cookies, features requiring an account cannot be provided.
          </p>

          <h3>Usage Tracking Cookies</h3>
          <p>
            To fairly enforce our free-tier limits (such as allowing only 2 free PDF generations per tool), we use secure, server-read cookies (e.g., a device identifier) for unauthenticated users. This ensures the technical stability and fair use of our infrastructure.
          </p>

          <h3>Preference / Local Storage Technologies</h3>
          <p>
            We use local storage mechanisms in your browser to remember information that changes the way the website behaves or looks, such as your preference for "dark mode" or "light mode" themes.
          </p>

          <h3>Analytics Technologies</h3>
          <p>
            These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are. We use <strong>Google Analytics (GA4)</strong> for this purpose.
          </p>

          <h3>Advertising Technologies</h3>
          <p>
            These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests. We use third-party networks, specifically <strong>Google AdSense</strong>, which may place cookies on your device to serve targeted advertising.
          </p>

          <h2>4. How can you control cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website (such as logging in or generating free PDFs) may be severely restricted or broken.
          </p>
          <p>
            Because the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. To opt-out of personalized advertising from Google, you can visit the <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> page.
          </p>

          <h2>5. Changes to this Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please contact us via the <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
