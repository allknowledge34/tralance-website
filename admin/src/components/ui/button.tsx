import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "danger" | "success"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-neutral-700 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
          {
            "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm":
              variant === "default",
            "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700":
              variant === "secondary",
            "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-neutral-800 dark:bg-[#161618] dark:text-neutral-200 dark:hover:bg-neutral-800 shadow-sm":
              variant === "outline",
            "hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-600 dark:text-neutral-300":
              variant === "ghost",
            "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-900/40":
              variant === "danger",
            "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50 dark:hover:bg-emerald-900/40":
              variant === "success",
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs rounded-lg": size === "sm",
            "h-12 px-6 text-base rounded-xl": size === "lg",
            "h-9 w-9 p-0 rounded-lg": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
