import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "pro" | "free" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] select-none",
        {
          "bg-[#F3F4F6] text-[#171717] dark:bg-[#27272A] dark:text-[#F5F5F5]": variant === "default",
          "bg-[#FEF08A] text-[#171717]": variant === "secondary",
          "bg-[#6EE7B7] text-[#171717]": variant === "success",
          "bg-[#FDE047] text-[#171717]": variant === "warning",
          "bg-[#FF6B6B] text-[#171717]": variant === "danger",
          "bg-[#35B9F5] text-[#171717]": variant === "pro",
          "bg-[#E5E7EB] text-[#525252] dark:bg-[#1C1C20] dark:text-[#A3A3A3]": variant === "free",
          "bg-transparent text-[#171717] dark:text-[#F5F5F5]": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}
