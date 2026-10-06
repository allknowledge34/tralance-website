/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import PageTracker from "@/components/analytics/PageTracker";

export const metadata: Metadata = {
  title: 'Terms of Service | Tralance',
  description: 'Read the terms and conditions for using Tralance, our freelance tools, and paid plans.',
  alternates: {
    canonical: 'https://www.tralance.pro/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="flex-grow pt-10 pb-24 bg-white dark:bg-[#050505]">
      <PageTracker eventName="terms_view" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
         
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Last Updated: October 1, 2026
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-p:leading-relaxed prose-li:leading-relaxed">
          <p>
            Welcome to Tralance. These Terms of Service ("Terms") govern your access to and use of the Tralance website located at <strong>https://www.tralance.pro</strong> (the "Website") and all associated tools, templates, and services (collectively, the "Services") operated by DmilX, a sole proprietorship of Sachin Kumar.
          </p>
          <p>
            Please read these Terms carefully before using our Services. By accessing or using the Services, you agree to be bound by these Terms.
          </p>

          <h2>1. Acceptance and Eligibility</h2>
          <p>
            By accessing Tralance, you represent that you are at least 18 years old or the legal age of majority in your jurisdiction, and have the legal capacity to enter into a binding contract. If you are using the Services on behalf of a business entity, you represent that you have the authority to bind that entity to these Terms.
          </p>

          <h2>2. Description of Tralance</h2>
          <p>
            Tralance provides a suite of digital productivity tools designed for freelancers, including but not limited to the Freelancer Invoice Generator, Freelancer Rate Calculator, Project Profit Calculator, Project Brief Builder, and Freelance Contract Generator.
          </p>

          <h2>3. Accounts and Security</h2>
          <p>
            While certain tools may be used without an account, creating an account is required to access paid plans and features (such as saving your activity and work). When you create an account, you agree to provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2>4. Free Tools and PDF Limits</h2>
          <p>
            We offer access to our core tools for free, subject to the following limitations:
          </p>
          <ul>
            <li><strong>Calculators:</strong> Our interactive calculators (such as the Rate Calculator and Profit Calculator) are completely free and offer unlimited usage.</li>
            <li><strong>PDF Generators:</strong> Tools that generate downloadable PDF documents (such as the Invoice Generator, Brief Builder, and Contract Generator) are subject to a strict free limit of <strong>two (2) free PDF generations/downloads per tool</strong>.</li>
          </ul>
          <p>
            Attempting to bypass these technical limitations through automated means, script manipulation, or excessive account creation is a violation of these Terms and may result in a ban from the Services.
          </p>

          <h2>5. Paid Plans and Pricing</h2>
          <p>
            To unlock unlimited PDF generation, the ability to save your work to your account, and access future Pro improvements, you may purchase a paid plan.
          </p>
          <ul>
            <li><strong>Monthly Plan (₹49/month):</strong> Provides access to Pro features for an entitlement period of approximately 30 days.</li>
            <li><strong>Yearly Plan (₹149/year):</strong> Provides access to Pro features for an entitlement period of approximately 365 days.</li>
          </ul>
          <p>
            <strong>These are not lifetime plans.</strong> Your access will expire at the end of the entitlement period unless you renew your access. The exact expiration date is calculated securely at the time of purchase and tied to your account.
          </p>

          <h2>6. Payments and Processing</h2>
          <p>
            All payments are processed securely through our authorized third-party payment provider, <strong>Cashfree</strong>. By submitting payment information, you authorize Cashfree to charge the specified amount. Tralance does not store your full credit card number or financial credentials. We reserve the right to change our pricing at any time, but price changes will not affect active, previously purchased entitlement periods.
          </p>

          <h2>7. Cancellation and Refunds</h2>
          <p>
            Please review our <Link href="/refund">Refund & Cancellation Policy</Link> for detailed information regarding cancellations and refund eligibility. Because digital access is granted immediately upon successful payment, refunds are generally evaluated on a case-by-case basis.
          </p>

          <h2>8. Saved Work and Activity</h2>
          <p>
            If you subscribe to a paid plan, you may utilize the feature to save your work/activity to your account. We strive to maintain the availability and security of your saved data; however, we do not guarantee that data loss will never occur. We strongly recommend keeping independent backups of any critical business documents or invoices generated using our tools.
          </p>

          <h2>9. User Responsibilities and Acceptable Use</h2>
          <p>
            You agree to use the Services only for lawful purposes. You shall not:
          </p>
          <ul>
            <li>Use the Services to generate illegal, fraudulent, or deceptive documents.</li>
            <li>Interfere with or disrupt the integrity or performance of the Website or its servers.</li>
            <li>Attempt to gain unauthorized access to the Services, other user accounts, or our infrastructure.</li>
            <li>Use the Services for any competitive intelligence or to scrape/copy our proprietary algorithms.</li>
          </ul>

          <h2>10. Intellectual Property</h2>
          <p>
            All content, design, algorithms, code, graphics, and logos provided by Tralance are the exclusive intellectual property of Tralance and are protected by applicable copyright and trademark laws. You may not reproduce, distribute, modify, or create derivative works of our software or website design without prior written permission. The documents (e.g., PDFs) you generate using our tools containing your own data remain your property.
          </p>

          <h2>11. Financial, Tax, and Legal Disclaimer</h2>
          <p>
            <strong>Not Professional Advice:</strong> The tools provided by Tralance (including contract templates, invoices, and calculators) are provided strictly for informational and organizational purposes. They do not constitute definitive financial, tax, legal, or accounting advice. You are solely responsible for verifying the accuracy of any calculations, legal clauses, or financial reports prior to using them in your business. We strongly recommend consulting with a qualified attorney or accountant for professional advice.
          </p>

          <h2>12. Disclaimer of Warranties</h2>
          <p>
            Our Services are provided on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind, either express or implied. We expressly disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that the Services will be uninterrupted, entirely secure, or error-free.
          </p>

          <h2>13. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall Tralance, its developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your access to or use of the Services, from any loss of saved data, or from any reliance placed on the templates and calculations provided.
          </p>

          <h2>14. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Tralance and its personnel from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the Services, or your violation of these Terms.
          </p>

          <h2>15. Third-Party Services</h2>
          <p>
            Our Services may contain links to or integrate with third-party websites or services (e.g., Google Analytics, AdSense, Cashfree). We assume no responsibility for the content, privacy policies, or practices of any third-party services.
          </p>

          <h2>16. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the Services at our sole discretion, without prior notice or liability, for any reason, including a breach of these Terms.
          </p>

          <h2>17. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will indicate that updates have been made by altering the "Last Updated" date. Your continued use of the Services following the posting of changes constitutes your acceptance of those changes.
          </p>

          <h2>18. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions.
          </p>

          <h2>19. Contact Information</h2>
          <p>
            If you have any questions regarding these Terms, please contact us via the <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
