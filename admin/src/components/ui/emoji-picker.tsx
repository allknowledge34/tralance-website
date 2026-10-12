"use client";

import * as React from "react";
import { Smile } from "lucide-react";
import { cn } from "@/lib/utils";

const emojiCategories = [
  {
    name: "Popular",
    emojis: ["🚀", "🎉", "✨", "💡", "📢", "🔥", "🎁", "⭐", "📧", "💼", "📈", "🔒", "🏷️", "💰", "🔔", "👍", "🙌", "❤️"],
  },
  {
    name: "Status & Signals",
    emojis: ["✅", "⚠️", "❌", "ℹ️", "⚡", "🕒", "🎯", "🏆", "🌟", "🛡️", "💬", "📌", "🔗", "🛠️", "📊", "💎"],
  },
  {
    name: "Emotions",
    emojis: ["😃", "🥳", "👋", "👏", "💪", "🤩", "🤝", "😎", "🙌", "🙏", "👀", "🔥", "💯", "🎈"],
  },
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  className?: string;
  buttonLabel?: string;
}

export function EmojiPicker({ onSelect, className, buttonLabel }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-[#171717] dark:text-[#E5E5E5] bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] hover:bg-[#FFE52E] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
        title="Insert Emoji"
        aria-label="Insert Emoji"
      >
        <Smile className="w-3.5 h-3.5 stroke-[2.5]" />
        {buttonLabel && <span>{buttonLabel}</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-64 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] z-50 p-2.5 animate-in fade-in zoom-in-95 duration-100">
          <div className="text-[11px] font-black text-[#171717] dark:text-white uppercase tracking-wider mb-2 px-1">
            Pick an Emoji
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {emojiCategories.map((cat) => (
              <div key={cat.name}>
                <div className="text-[10px] text-[#525252] dark:text-[#A3A3A3] font-bold uppercase tracking-wider px-1 mb-1">
                  {cat.name}
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {cat.emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        onSelect(emoji);
                        setIsOpen(false);
                      }}
                      className="w-8 h-8 flex items-center justify-center text-base hover:bg-[#FFE52E] rounded border border-transparent hover:border-[#171717] transition-all cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
