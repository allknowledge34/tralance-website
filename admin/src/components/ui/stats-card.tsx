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
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  subtitle,
  icon: Icon,
  iconColor = "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100 dark:border-blue-900/40",
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/90 dark:border-neutral-800 bg-white dark:bg-[#161618] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-500 dark:text-neutral-400">
          {title}
        </span>
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center border shrink-0",
            iconColor
          )}
        >
          <Icon className="w-5 h-5 stroke-[2]" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full inline-flex items-center",
              {
                "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400":
                  changeType === "increase",
                "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400":
                  changeType === "decrease",
                "bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-400":
                  changeType === "neutral",
              }
            )}
          >
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-400 dark:text-neutral-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
