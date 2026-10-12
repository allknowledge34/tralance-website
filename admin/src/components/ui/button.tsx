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
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold tracking-tight transition-all duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] dark:focus-visible:ring-[#FFE52E] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          {
            "border-2 border-[#171717] dark:border-[#383838] bg-[#FFE52E] text-[#171717] hover:bg-[#FFDF1A] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] dark:active:shadow-[1px_1px_0px_0px_#000000]":
              variant === "default",
            "border-2 border-[#171717] dark:border-[#383838] bg-[#35B9F5] text-[#171717] hover:bg-[#1EAEF1] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] dark:active:shadow-[1px_1px_0px_0px_#000000]":
              variant === "secondary",
            "border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] text-[#171717] hover:bg-[#F4EFE6] dark:bg-[#1C1C20] dark:text-[#F5F5F5] dark:hover:bg-[#25252B] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] dark:active:shadow-[1px_1px_0px_0px_#000000]":
              variant === "outline",
            "border-2 border-transparent text-[#171717] dark:text-[#F5F5F5] hover:border-[#171717] dark:hover:border-[#383838] hover:bg-[#FFFDF5] dark:hover:bg-[#1C1C20] hover:shadow-[3px_3px_0px_0px_#171717] dark:hover:shadow-[3px_3px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717]":
              variant === "ghost",
            "border-2 border-[#171717] dark:border-[#383838] bg-[#FF6B6B] text-[#171717] hover:bg-[#FF5252] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] dark:active:shadow-[1px_1px_0px_0px_#000000]":
              variant === "danger",
            "border-2 border-[#171717] dark:border-[#383838] bg-[#6EE7B7] text-[#171717] hover:bg-[#50E0A6] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#171717] dark:active:shadow-[1px_1px_0px_0px_#000000]":
              variant === "success",
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base": size === "lg",
            "h-9 w-9 p-0": size === "icon",
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
