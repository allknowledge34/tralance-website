import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – Tralance (Offline Finance Tracker)",
  description: "Tralance does not collect or share your financial data. This Privacy Policy (by Sachin Kumar) explains our zero-telemetry approach and commitment to on-device security.",
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
            Last Updated: August 3, 2026
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          
          <div className="w-full">
            

            <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-[15px] prose-p:leading-relaxed prose-p:mb-5 prose-li:text-[15px] max-w-none">
              
              <section id="introduction" className="scroll-mt-24">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to Tralance (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting any information that may be collected through your use of our website. This Privacy Policy applies exclusively to the Tralance website and governs data collection, processing, and usage.
                </p>
                <p>
                  Tralance (operated by DmilX, developer Sachin Kumar) operates entirely offline and does not collect any personal data. For privacy inquiries, contact allknowledge34@gmail.com.
                </p>
                <p>
                  By accessing or using our website, you consent to the data practices described in this Privacy Policy. If you do not agree with the terms set forth herein, please do not use our website.
                </p>
              </section>

              <section id="information-we-collect" className="scroll-mt-24">
                <h2>2. Information We Collect</h2>
                <p>
                  Our website primarily serves as an informational resource and provides free web-based productivity tools. We do not require users to create an account, register, or provide personally identifiable information to use these tools.
                </p>
                <p>However, we may collect the following types of information when you interact with our website:</p>
                <ul>
                  <li><strong>Voluntarily Provided Information:</strong> If you contact us via email or a contact form, we collect the name and email address you provide, along with any message content.</li>
                  <li><strong>Automatically Collected Information:</strong> We automatically collect standard diagnostic and technical data. This includes your IP address, browser type, operating system, pages visited, and referring URLs.</li>
                </ul>
              </section>

              <section id="how-information-is-used" className="scroll-mt-24">
                <h2>3. How Information Is Used</h2>
                <p>
                  The information we collect is used solely for the following legitimate business purposes:
                </p>
                <ul>
                  <li>To provide, operate, and maintain our website and its free tools.</li>
                  <li>To improve user experience and optimize our website&apos;s performance.</li>
                  <li>To respond to your direct inquiries or customer support requests.</li>
                  <li>To serve personalized advertisements via Google AdSense.</li>
                  <li>To monitor aggregated usage metrics and analyze website traffic.</li>
                </ul>
              </section>

              <section id="cookies" className="scroll-mt-24">
                <h2>4. Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website may not function optimally.
                </p>
              </section>

              <section id="google-analytics" className="scroll-mt-24">
                <h2>5. Google Analytics</h2>
                <p>
                  We use Google Analytics, a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our website. This data is shared with other Google services.
                </p>
                <p>
                  You can opt-out of having your activity on the website made available to Google Analytics by installing the Google Analytics opt-out browser add-on. For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page.
                </p>
              </section>

              <section id="google-adsense" className="scroll-mt-24">
                <h2>6. Google AdSense</h2>
                <p>
                  We use Google AdSense to display advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our website or other websites.
                </p>
                <p>
                  Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google&apos;s Ads Settings</a>.
                </p>
              </section>

              <section id="third-party-services" className="scroll-mt-24">
                <h2>7. Third-Party Services</h2>
                <p>
                  We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, perform website-related services, or assist us in analyzing how our website is used.
                </p>
                <p>
                  These third parties have access to your data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              <section id="embedded-content" className="scroll-mt-24">
                <h2>8. Embedded Content</h2>
                <p>
                  Articles on this site may include embedded content (e.g., videos, images, articles). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
                </p>
                <p>
                  These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content.
                </p>
              </section>

              <section id="external-links" className="scroll-mt-24">
                <h2>9. External Links</h2>
                <p>
                  Our website may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy of every site you visit.
                </p>
                <p>
                  We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
              </section>

              <section id="data-security" className="scroll-mt-24">
                <h2>10. Data Security</h2>
                <p>
                  The security of your data is important to us. We employ standard security measures to prevent the loss, misuse, and alteration of the information under our control. However, remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section id="data-retention" className="scroll-mt-24">
                <h2>11. Data Retention</h2>
                <p>
                  We will retain your information only for as long as is necessary for the purposes set out in this Privacy Policy. Analytics data and server logs are retained in accordance with our third-party service providers&apos; standard retention policies.
                </p>
              </section>

              <section id="childrens-privacy" className="scroll-mt-24">
                <h2>12. Children&apos;s Privacy</h2>
                <p>
                  Our website does not address anyone under the age of 13 (&quot;Children&quot;). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
                </p>
              </section>

              <section id="your-rights" className="scroll-mt-24">
                <h2>13. Your Rights</h2>
                <p>
                  Depending on your jurisdiction, you may have certain rights regarding your personal information, including:
                </p>
                <ul>
                  <li>The right to access, update, or delete the information we have on you.</li>
                  <li>The right of rectification if your information is inaccurate.</li>
                  <li>The right to object to our processing of your personal data.</li>
                  <li>The right to withdraw consent at any time where we relied on your consent.</li>
                </ul>
              </section>

              <section id="changes-to-policy" className="scroll-mt-24">
                <h2>14. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top of this policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              <section id="contact-information" className="scroll-mt-24 mb-16">
                <h2>15. Contact Information</h2>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us via the <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link> on our website.
                </p>
              </section>

            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
