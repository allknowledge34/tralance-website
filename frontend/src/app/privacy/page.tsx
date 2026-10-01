/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import PageTracker from "@/components/analytics/PageTracker";

export const metadata: Metadata = {
  title: 'Privacy Policy | Tralance',
  description: 'Learn how Tralance protects your privacy and handles data for our freelance tools, accounts, and services.',
  alternates: {
    canonical: 'https://www.tralance.pro/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="flex-grow pt-10 pb-24 bg-white dark:bg-[#050505]">
      <PageTracker eventName="privacy_view" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
         
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Last Updated: October 1, 2026
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-p:leading-relaxed prose-li:leading-relaxed">
          <p>
            Welcome to Tralance ("we," "our," or "us"). We operate the website located at <strong>https://www.tralance.pro</strong> (the "Website") and provide various digital tools, templates, and services for freelancers (collectively, the "Services"). Tralance is operated by DmilX, a sole proprietorship of Sachin Kumar.
          </p>
          <p>
            This Privacy Policy explains how information is collected, used, and shared across our Services. By accessing or using our Services, you consent to the data practices described in this Privacy Policy.
          </p>

          <h2>1. Website and Web Tools</h2>
          <p>
            Our website provides productivity tools (such as the Rate Calculator, Invoice Generator, Project Brief Builder, Contract Generator, and Project Profit Calculator).
          </p>
          <ul>
            <li><strong>Browser-Local Processing:</strong> For our calculators that do not generate PDFs, the numerical data you input is processed locally in your web browser to provide instant results and is not transmitted to our servers.</li>
            <li><strong>Server-Side Functionality:</strong> For features that generate documents (such as PDFs), process payments, or manage your account, relevant information is transmitted to Tralance servers to provide that specific feature.</li>
            <li><strong>Automatically Collected Information:</strong> When you visit our Website, our hosting and infrastructure providers automatically collect standard technical information. This includes your IP address, browser type, operating system, referring URLs, and timestamps, which are used to ensure the security, reliability, and performance of our Website.</li>
          </ul>

          <h2>2. Accounts and Authentication</h2>
          <p>
            You may choose to create an account to access paid features (such as Tralance Pro). We support authentication via email and password, as well as third-party providers like Google OAuth.
          </p>
          <p>
            If you create an account, we collect and store:
          </p>
          <ul>
            <li>Your name, email address, and profile picture (if provided via Google sign-in).</li>
            <li>A securely hashed version of your password (if you use email/password sign-in).</li>
            <li>Authentication tokens necessary to securely maintain your active session.</li>
          </ul>

          <h2>3. Saved Work and Activity</h2>
          <p>
            When you subscribe to a paid plan and use the save functionality, the data you explicitly choose to save (such as tool inputs, project details, or client configurations) is stored securely in our database and associated with your account so that you can access it across devices. We only store the data fields that are part of the specific tool you are using.
          </p>

          <h2>4. PDF Usage Limits</h2>
          <p>
            To enforce our free usage limits (e.g., maximum 2 free PDF generations per tool), Tralance maintains usage information. If you are not logged in, we use an anonymous browser identifier (stored as a secure cookie) to track the number of PDFs generated. If you are logged into an account, this usage is tracked against your account ID. This data is used solely to enforce access limits.
          </p>

          <h2>5. Payments</h2>
          <p>
            When you purchase a paid plan, your payment is processed securely by our third-party payment provider, <strong>Razorpay</strong>.
          </p>
          <ul>
            <li><strong>Payment Processor:</strong> Razorpay handles and stores your full payment credentials (such as credit card numbers or UPI details) subject to their own privacy policy and security standards. Tralance does not collect, process, or store your full financial credentials.</li>
            <li><strong>Tralance Records:</strong> We receive and retain payment confirmation information from Razorpay, including transaction IDs, order amounts, currency, and the specific plan purchased, in order to grant you the correct account entitlements and maintain accurate billing records.</li>
          </ul>

          <h2>6. Analytics and Advertising</h2>
          <p>
            To understand website traffic and support our free tools, we may use third-party analytics and advertising networks:
          </p>
          <ul>
            <li><strong>Analytics:</strong> We use Google Analytics (GA4) to understand how users interact with our Website. Google Analytics uses cookies to collect anonymous traffic data.</li>
            <li><strong>Advertising:</strong> Our website may display advertisements provided by third-party networks, including Google AdSense. These providers may use cookies, web beacons, or similar technologies to serve personalized and non-personalized advertisements based on your prior visits to our Website or other websites across the internet.</li>
          </ul>

          <h2>7. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies (such as local storage) for various purposes:
          </p>
          <ul>
            <li><strong>Essential & Authentication Cookies:</strong> Required to maintain your logged-in session, process checkouts, and enforce security.</li>
            <li><strong>Preference Technologies:</strong> Used to remember choices such as your dark/light theme preference.</li>
            <li><strong>Analytics & Advertising Cookies:</strong> Used by third-party services as described above to measure performance and serve relevant ads.</li>
            <li><strong>Usage Cookies:</strong> Used to track free-tier limitations for anonymous users.</li>
          </ul>
          <p>You can read more about how we use cookies in our <Link href="/cookies">Cookie Policy</Link>.</p>

          <h2>8. Information You Voluntarily Provide</h2>
          <p>
            If you contact us via email or a support form, we collect the name and email address you provide, along with any message content, strictly to respond to your inquiry and provide customer support.
          </p>

          <h2>9. Data Retention</h2>
          <p>
            We retain your personal information only for as long as is reasonably necessary to fulfill the purposes outlined in this Privacy Policy, provide our Services, enforce our terms, or as required by applicable legal and regulatory obligations.
          </p>

          <h2>10. Third-Party Services</h2>
          <p>
            We employ third-party companies to facilitate our Services. These include hosting/infrastructure providers, authentication providers (Google), payment processors (Razorpay), and analytics/advertising networks. These third parties have access to your data only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.
          </p>

          <h2>11. Your Rights</h2>
          <p>
            Depending on your location and applicable law, you may have certain rights regarding your personal information, such as the right to access, correct, or request deletion of your account data. To exercise these rights, please contact us. Please note that we cannot access or delete data that you have processed entirely locally in your browser without saving it to an account.
          </p>

          <h2>12. Security</h2>
          <p>
            We employ reasonable industry-standard security measures to protect the information collected by our Website. However, no method of transmission over the Internet or electronic storage is entirely secure, and we cannot guarantee absolute security.
          </p>

          <h2>13. Children's Privacy</h2>
          <p>
            Our Services are intended for professional freelancers and adults. They are not directed to anyone under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2>14. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised policy on this page and update the "Last Updated" date.
          </p>

          <h2>15. Contact Information</h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact us via the <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
