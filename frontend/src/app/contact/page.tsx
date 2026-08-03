import React from "react";
import { Metadata } from "next";
import { Mail } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import FaqAccordion from "@/components/contact/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact Tralance – Help & Support",
  description: "Have questions about Tralance, the website, or free tools? Contact the developer for support or feedback. (Email: allknowledge34@gmail.com)",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-20 pb-12 text-center max-w-4xl mx-auto px-4">
        
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-6 leading-tight text-slate-900 dark:text-white">
          We&apos;re here to help.
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Have questions about Tralance, the website, free tools, bug reports or general feedback? Feel free to get in touch.
        </p>
      </section>

      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Direct Contact</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-3">
                If you have questions about Tralance, the website, privacy, free tools, bug reports, or partnership inquiries, feel free to contact us directly.
              </p>
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                <Mail className="w-4.5 h-4.5 text-primary" />
                <a href={`mailto:allknowledge34@gmail.com`} className="hover:underline">
                  allknowledge34@gmail.com
                </a>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-white/5" />

            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Support Information</h3>
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <span>• General Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>• Bug Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>• Feature Requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>• Business Inquiries</span>
                </div>
              </div>

              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Response Time</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Usually within 24–48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-slate-55/30 dark:bg-white/[0.005] border-t border-slate-200/50 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
          
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
