import React from "react";
import { Metadata } from "next";
import FinalCTA from "@/components/home/FinalCTA";
import ShowcaseFeatures from "@/components/features/ShowcaseFeatures";
import { SupportingContentFeatures } from "@/components/shared/SupportingContent";

export const metadata: Metadata = {
  title: "Features | Tralance Workspace",
  description: "Explore Tralance features. The privacy-first workspace and freelancer tool ecosystem featuring offline support, local data storage, and no cloud sync.",
};

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-32 pb-12 text-center max-w-4xl mx-auto px-4 relative">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none -z-10 transition-colors duration-300" 
          style={{
            background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, rgba(0,102,255,0) 70%)'
          }}
        />
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-[-0.03em] mt-8 leading-[1.1] text-[#0A1128] dark:text-white transition-colors duration-300">
          Every detail crafted for <br />
          <span className="text-[#0066FF] dark:text-[#3B82F6] transition-colors duration-300">
            financial sovereignty.
          </span>
        </h1>
        <p className="mt-6 text-[#8892B0] dark:text-[#AEB7C6] text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
          Manage variables, audits, and spend categories offline. No logins, no analytics tracking, no cloud accounts.
        </p>
      </section>

      <ShowcaseFeatures />
      <SupportingContentFeatures />
      <FinalCTA />
    </>
  );
}
