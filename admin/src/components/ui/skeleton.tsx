import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md border-2 border-[#171717]/20 dark:border-[#383838] bg-[#E5E7EB] dark:bg-[#27272A]",
        className
      )}
      {...props}
    />
  )
}
