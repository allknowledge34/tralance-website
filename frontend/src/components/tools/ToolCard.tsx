import React from "react";
import Link from "next/link";
import { ToolConfig } from "@/lib/tools/config";

interface ToolCardProps {
  tool: ToolConfig;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link 
      href={tool.href}
      className="group flex flex-col h-full bg-white dark:bg-[#0B1020] rounded-2xl p-8 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-transparent dark:border-white/5 relative overflow-hidden"
    >
      <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-white mb-6 ${tool.color}`}>
        <Icon className="w-[22px] h-[22px] stroke-[2.5]" />
      </div>
      
      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug mb-3">
        {tool.name}
      </h3>
      
      <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-[1.6]">
        {tool.description}
      </p>
    </Link>
  );
}
