import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  accentColor?: "yellow" | "blue" | "mint" | "purple" | "coral" | string;
  className?: string;
}

const accentMap: Record<string, string> = {
  yellow: "bg-[#FFE52E] text-[#171717]",
  blue: "bg-[#35B9F5] text-[#171717]",
  mint: "bg-[#6EE7B7] text-[#171717]",
  purple: "bg-[#C4B5FD] text-[#171717]",
  coral: "bg-[#FF6B6B] text-[#171717]",
};

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  subtitle,
  icon: Icon,
  iconColor = "bg-[#FFE52E] text-[#171717]",
  accentColor,
  className,
}: StatsCardProps) {
  const resolvedColor = accentColor ? (accentMap[accentColor] || accentColor) : iconColor;

  return (
    <div
      className={cn(
        "rounded-lg border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] transition-all",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
          {title}
        </span>
        <div
          className={cn(
            "w-11 h-11 rounded-md flex items-center justify-center border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] shrink-0",
            resolvedColor
          )}
        >
          <Icon className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] dark:text-white">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-md border border-[#171717] dark:border-[#383838] shadow-[1px_1px_0px_0px_#171717] dark:shadow-[1px_1px_0px_0px_#000000] inline-flex items-center",
              {
                "bg-[#6EE7B7] text-[#171717]": changeType === "increase",
                "bg-[#FF6B6B] text-[#171717]": changeType === "decrease",
                "bg-[#FFE52E] text-[#171717]": changeType === "neutral",
              }
            )}
          >
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs font-medium text-[#737373] dark:text-[#A3A3A3]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
