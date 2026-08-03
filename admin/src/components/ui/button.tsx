import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "danger" | "glass"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-white text-black hover:bg-neutral-200 hover:scale-[1.02] active:scale-95 shimmer": variant === "default",
            "border border-white/10 bg-white/5 hover:bg-white/10 text-white hover:scale-[1.02] active:scale-95": variant === "outline",
            "hover:bg-white/10 hover:text-white text-white/70 active:scale-95": variant === "ghost",
            "bg-red-500/10 text-red-400 hover:bg-red-500/20 active:scale-95": variant === "danger",
            "glass-panel hover:bg-white/10 active:scale-95": variant === "glass",
            "h-11 px-6 py-2": size === "default",
            "h-9 px-4": size === "sm",
            "h-14 px-8 text-base": size === "lg",
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
