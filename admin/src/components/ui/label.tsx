import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-xs font-bold uppercase tracking-wider leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#171717] dark:text-[#E5E5E5]", className)} {...props} />
))
Label.displayName = "Label"

export { Label }
