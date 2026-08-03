import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-3xl border border-white/5 bg-black/20 px-5 py-4 text-base text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:bg-white/5 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
