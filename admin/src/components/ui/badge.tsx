import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "pro" | "free" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        {
          "bg-slate-100 text-slate-800 dark:bg-neutral-800 dark:text-neutral-200": variant === "default",
          "bg-slate-200/70 text-slate-700 dark:bg-neutral-700 dark:text-neutral-300": variant === "secondary",
          "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800": variant === "success",
          "bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800": variant === "warning",
          "bg-red-50 text-red-700 border border-red-200/80 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800": variant === "danger",
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm font-bold": variant === "pro",
          "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700": variant === "free",
          "border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}
