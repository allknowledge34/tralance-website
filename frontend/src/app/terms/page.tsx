import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – Tralance Ecosystem",
  description: "These Terms of Service apply to the Tralance ecosystem by DmilX (Sachin Kumar). Learn about licensing, usage rights, and disclaimers for our tools and offline applications.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-white dark:bg-[#030303] min-h-screen py-16 md:py-24 font-sans text-slate-800 dark:text-slate-300 selection:bg-blue-100 dark:selection:bg-blue-900">
      <div className="max-w-[850px] mx-auto px-5 sm:px-6 lg:px-8">
        
        <header className="mb-12 border-b border-slate-200/60 dark:border-white/5 pb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-[15px]">
            Last Updated: August 8, 2026
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="w-full">
            <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-[15px] prose-p:leading-relaxed prose-p:mb-5 prose-li:text-[15px] max-w-none">
              
              <section id="acceptance-of-terms" className="scroll-mt-24">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  These Terms of Service govern your use of the Tralance ecosystem, which includes our website (tralance.pro), free web tools, educational content, and the Tralance Mobile and Desktop applications (collectively, the &quot;Services&quot;). Tralance is operated by DmilX, a sole proprietorship of Sachin Kumar.
                </p>
                <p>
                  By accessing, browsing, downloading, or utilizing any of our Services, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service (subject to any separate app-store or platform terms where applicable). If you do not agree to any of these terms, you are expressly prohibited from using our Services and must discontinue use immediately.
                </p>
              </section>

              <section id="about-tralance" className="scroll-mt-24">
                <h2>2. About Tralance</h2>
                <p>
                  Tralance is a freelancer-focused ecosystem providing practical tools to help manage freelance work and finances. This includes informational content, free browser-based productivity tools, and offline-first mobile and desktop applications designed to give freelancers more control over their financial information.
                </p>
              </section>

              <section id="eligibility" className="scroll-mt-24">
                <h2>3. Eligibility</h2>
                <p>
                  You must be at least 13 years of age to use our Services. By using Tralance, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms of Service.
                </p>
              </section>

              <section id="acceptable-use" className="scroll-mt-24">
                <h2>4. Acceptable Use and User Responsibilities</h2>
                <p>
                  You agree to use our Services solely for lawful purposes. You shall not engage in any activity that interrupts, damages, or impairs the functionality of the Services, including but not limited to transmitting viruses, utilizing automated scripts, attempting unauthorized access, or violating any local, national, or international laws.
                </p>
              </section>

              <section id="app-disclaimer" className="scroll-mt-24">
                <h2>5. Tralance Applications and Local Data Responsibility</h2>
                <p>
                  The Tralance Mobile and Desktop applications are designed to operate locally on your device. We do not provide cloud synchronization or server-side backups for your financial data.
                </p>
                <p>
                  <strong>You acknowledge and agree that:</strong>
                </p>
                <ul>
                  <li>Core financial data entered into the applications is designed to remain stored locally on your device. Tralance does not provide cloud synchronization for this financial data.</li>
                  <li>You bear full and sole responsibility for regularly backing up your own data.</li>
                  <li>Tralance may not be able to recover local data after device loss, damage, or application removal.</li>
                  <li>You are responsible for securing your own device to prevent unauthorized access to your local financial information.</li>
                </ul>
              </section>

              <section id="free-tools-disclaimer" className="scroll-mt-24">
                <h2>6. Free Tools and Financial/Tax Disclaimer</h2>
                <p>
                  The free productivity tools provided on our website (such as the Rate Calculator, Project Profit Calculator, and Invoice Generator) and the financial tracking features in our applications are provided strictly for educational, informational, and organizational purposes.
                </p>
                <p>
                  While we strive to ensure the accuracy of the algorithms, the mathematical results generated by these tools should not be construed as definitive financial, tax, legal, or official accounting advice. You are solely responsible for verifying the accuracy of any calculations, invoices, or financial reports prior to making business, financial, or tax-related decisions.
                </p>
              </section>

              <section id="blog-content-disclaimer" className="scroll-mt-24">
                <h2>7. Blog and Content Disclaimer</h2>
                <p>
                  The articles, templates, and publications featured on the Tralance blog represent the personal opinions and experiences of their respective authors. This content is provided for informational purposes only. We do not guarantee the completeness, reliability, or accuracy of any information presented, and any action you take based upon this information is strictly at your own risk.
                </p>
              </section>

              <section id="intellectual-property" className="scroll-mt-24">
                <h2>8. Intellectual Property</h2>
                <p>
                  All content, design, code, graphics, logos, and original text across our Services are the exclusive intellectual property of Tralance and are protected by applicable copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any of our intellectual property without our prior express written permission.
                </p>
              </section>

              <section id="third-party-services" className="scroll-mt-24">
                <h2>9. External Links and Third-Party Services</h2>
                <p>
                  Our Services may contain links to third-party websites or services that are not owned or controlled by Tralance. We assume no responsibility for the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that Tralance shall not be held liable for any damage or loss caused by your reliance on any such external content or services.
                </p>
                <p>
                  Where enabled, the website may use third-party services for analytics, hosting, security, performance, and advertising. These services may process technical or usage information according to their respective privacy policies and applicable settings.
                </p>
              </section>

              <section id="limitation-of-liability" className="scroll-mt-24">
                <h2>10. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall Tralance, its developers, authors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or inability to access the Services, from any loss of local data, or from any reliance placed on the information or tools provided by the Services.
                </p>
              </section>

              <section id="disclaimer-of-warranties" className="scroll-mt-24">
                <h2>11. Disclaimer of Warranties</h2>
                <p>
                  Our Services and all materials contained therein are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind, either express or implied. We expressly disclaim any warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the Services will be uninterrupted, error-free, or entirely secure.
                </p>
              </section>

              <section id="indemnification" className="scroll-mt-24">
                <h2>12. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Tralance and its personnel from and against any and all claims, damages, obligations, losses, liabilities, costs, or debts, and expenses (including attorney&apos;s fees) arising from your use of and access to our Services, or your violation of any term of these Terms of Service.
                </p>
              </section>

              <section id="termination" className="scroll-mt-24">
                <h2>13. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service. Upon termination, your right to use the Services will immediately cease.
                </p>
              </section>

              <section id="changes-to-terms" className="scroll-mt-24">
                <h2>14. Changes to These Terms</h2>
                <p>
                  We reserve the exclusive right to modify or replace these Terms of Service at any time. We will indicate that updates have been made by altering the &quot;Last Updated&quot; date at the top of this document. It is your responsibility to review these Terms periodically. Your continued use of our Services following the posting of any changes constitutes acceptance of those changes.
                </p>
              </section>

              <section id="governing-law" className="scroll-mt-24">
                <h2>15. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section id="contact-information" className="scroll-mt-24 mb-16">
                <h2>16. Contact Information</h2>
                <p>
                  If you have any questions or concerns regarding these Terms of Service, please contact us by visiting the <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link> on our Website.
                </p>
              </section>

            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
