"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  maxWidth = "lg",
}: ModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div
        className="fixed inset-0 bg-[#171717]/60 dark:bg-black/80 transition-opacity"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative w-full rounded-lg bg-[#FFFDF5] dark:bg-[#18181B] p-5 sm:p-6 shadow-[8px_8px_0px_0px_#171717] dark:shadow-[8px_8px_0px_0px_#000000] border-2 border-[#171717] dark:border-[#383838] z-10 my-4 max-h-[92vh] flex flex-col",
          maxWidthClasses[maxWidth],
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b-2 border-[#171717] dark:border-[#383838] shrink-0">
          <div>
            {title && (
              <h2 className="text-xl font-extrabold tracking-tight text-[#171717] dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs sm:text-sm font-medium text-[#525252] dark:text-[#A3A3A3] mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 border-2 border-[#171717] dark:border-[#383838] bg-[#FFE52E] text-[#171717] hover:bg-[#FFD900] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1">{children}</div>
      </div>
    </div>
  );
}
