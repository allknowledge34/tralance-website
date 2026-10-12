import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] px-3.5 py-2 text-sm font-medium text-[#171717] dark:text-[#FFFFFF] placeholder:text-[#A3A3A3] dark:placeholder:text-[#737373] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE52E] focus-visible:border-[#171717] transition-all disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
