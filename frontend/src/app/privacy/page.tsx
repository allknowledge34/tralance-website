import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – Tralance",
  description: "Learn how Tralance protects your privacy across our website, web tools, and offline-first applications.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white dark:bg-[#030303] min-h-screen py-16 md:py-24 font-sans text-slate-800 dark:text-slate-300 selection:bg-blue-100 dark:selection:bg-blue-900">
      <div className="max-w-[850px] mx-auto px-5 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-slate-200/60 dark:border-white/5 pb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-[15px]">
            Last Updated: August 8, 2026
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="w-full">
            <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-[15px] prose-p:leading-relaxed prose-p:mb-5 prose-li:text-[15px] max-w-none">
              <section id="introduction" className="scroll-mt-24">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to Tralance (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting it. Tralance operates as a freelancer-focused ecosystem comprising our main website, free browser-based productivity tools, and our Mobile and Desktop applications (collectively, the &quot;Services&quot;).
                </p>
                <p>
                  Tralance is operated by DmilX, a sole proprietorship of Sachin Kumar.
                </p>
                <p>
                  This Privacy Policy explains how information is handled across our Services. We strongly believe in giving you control over your data, which is why our mobile and desktop applications are built with an offline-first, privacy-focused architecture. By accessing or using our Services, you consent to the data practices described in this Privacy Policy.
                </p>
              </section>

              <section id="tralance-applications" className="scroll-mt-24">
                <h2>2. Tralance Mobile and Desktop Applications</h2>
                <p>
                  Our mobile and desktop applications are designed to help freelancers manage their work, income, and expenses locally. 
                </p>
                <ul>
                  <li><strong>Local Data Storage:</strong> Financial data, projects, clients, and transaction history entered into the Tralance Mobile and Desktop applications are designed to be stored locally on your device. Tralance does not provide cloud synchronization for this financial data.</li>
                  <li><strong>No Cloud Sync:</strong> Because the core financial data is stored locally, we generally cannot access or recover it if your device is lost, damaged, or the application is removed. You are responsible for maintaining any backups you choose to create.</li>
                  <li><strong>No Account Required:</strong> You are not required to create an account with us to use the core offline features of the applications.</li>
                </ul>
              </section>

              <section id="website-and-web-tools" className="scroll-mt-24">
                <h2>3. Website and Browser-Based Web Tools</h2>
                <p>
                  Our website provides informational content and free browser-based productivity tools (such as the Rate Calculator, Invoice Generator, and Project Profit Calculator).
                </p>
                <ul>
                  <li><strong>Tool Data:</strong> Data entered into our browser-based free web tools is processed locally in your browser to generate results. For tools designed to process information locally in the browser, the information you enter is processed within your browser and is not submitted to Tralance servers as part of the tool&apos;s normal operation.</li>
                  <li><strong>Automatically Collected Technical Information:</strong> When you visit our website, our hosting providers and web infrastructure automatically collect standard technical information. This may include your IP address, browser type, operating system, pages visited, referring URLs, and timestamps. This data is used to ensure the security, reliability, and performance of our website.</li>
                  <li><strong>Voluntarily Provided Information:</strong> If you contact us via email or a contact form, we collect the name and email address you provide, along with any message content, solely to respond to your inquiry.</li>
                </ul>
              </section>

              <section id="cookies-and-analytics" className="scroll-mt-24">
                <h2>4. Cookies, Analytics, and Advertising</h2>
                <p>
                  While our core applications are offline-first, our public website relies on standard web technologies:
                </p>
                <ul>
                  <li><strong>Cookies:</strong> Cookies and similar technologies may be used on parts of our public website where they are required for functionality, analytics, security, or advertising.</li>
                  <li><strong>Analytics:</strong> We may use third-party analytics services, such as Google Analytics, where enabled, to understand website traffic and usage.</li>
                  <li><strong>Advertising:</strong> If advertising is enabled on the website, third-party advertising providers such as Google AdSense may use cookies or similar technologies to serve and measure advertisements. Where required, appropriate consent and privacy controls will be provided.</li>
                </ul>
              </section>

              <section id="third-party-services" className="scroll-mt-24">
                <h2>5. Third-Party Services and Links</h2>
                <p>
                  We may employ third-party companies and individuals to facilitate our website operations (e.g., hosting providers, analytics, and advertising). These third parties have access to technical website data only to perform these tasks on our behalf.
                </p>
                <p>
                  Our Services may contain links to external websites that are not operated by us. We have no control over, and assume no responsibility for, the content or privacy practices of any third-party sites or services.
                </p>
              </section>

              <section id="data-security" className="scroll-mt-24">
                <h2>6. Data Security</h2>
                <p>
                  We employ standard security measures to protect the technical information collected by our website. However, please remember that no method of transmission over the Internet is 100% secure. For our mobile and desktop applications, the security of your financial data depends on the security of your own device, as the data is stored locally.
                </p>
              </section>

              <section id="childrens-privacy" className="scroll-mt-24">
                <h2>7. Children&apos;s Privacy</h2>
                <p>
                  Our Services are intended for professional freelancers and are not directed to anyone under the age of 13. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section id="your-rights" className="scroll-mt-24">
                <h2>8. Your Rights</h2>
                <p>
                  Depending on your jurisdiction, you may have certain rights regarding the personal information you have voluntarily provided to us (such as contact emails), including the right to access, update, or request deletion of that information. Because we do not store the data entered into our offline apps or web calculators, we cannot access or delete that local data on your behalf.
                </p>
              </section>

              <section id="changes-to-policy" className="scroll-mt-24">
                <h2>9. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top of this policy.
                </p>
              </section>

              <section id="contact-information" className="scroll-mt-24 mb-16">
                <h2>10. Contact Information</h2>
                <p>
                  If you have any questions or concerns regarding this Privacy Policy, please contact us via the <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link> on our website.
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
