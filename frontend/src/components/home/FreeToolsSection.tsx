import React from "react";
import Link from "next/link";
import { toolsConfig } from "@/lib/tools/config";

export default function FreeToolsSection() {
  return (
    <section className="bg-[#F8FAFC] dark:bg-[#030303] border-t border-[#EEF2F7] dark:border-[rgba(255,255,255,0.05)] py-24 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <header className="mb-16 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#1E293B] dark:text-white">
            Free Freelance Tools
          </h2>

          <p className="text-[15px] md:text-base text-[#64748B] dark:text-slate-400 font-medium leading-relaxed">
            Everything you need to manage your freelance business-from calculating rates
            and generating invoices to building project briefs and contracts. No account
            required.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

          {toolsConfig.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} href={tool.href} className="block">
                <div className="h-full bg-white dark:bg-[#0B1020] rounded-[20px] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-transparent dark:border-[rgba(255,255,255,0.05)]">

                  <div className={`w-14 h-14 rounded-2xl ${tool.color} text-white flex items-center justify-center mb-6 shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-3">
                    {tool.name}
                  </h3>

                  <p className="text-[15px] text-[#64748B] dark:text-slate-400 font-medium leading-relaxed">
                    {tool.description}
                  </p>

                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}
