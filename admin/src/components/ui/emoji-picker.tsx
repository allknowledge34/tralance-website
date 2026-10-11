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
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700/80 rounded-lg transition-colors cursor-pointer"
        title="Insert Emoji"
        aria-label="Insert Emoji"
      >
        <Smile className="w-3.5 h-3.5 text-amber-500" />
        {buttonLabel && <span>{buttonLabel}</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 p-2.5 animate-in fade-in zoom-in-95 duration-100">
          <div className="text-[11px] font-semibold text-slate-400 dark:text-neutral-500 uppercase tracking-wider mb-2 px-1">
            Pick an Emoji
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {emojiCategories.map((cat) => (
              <div key={cat.name}>
                <div className="text-[10px] text-slate-400 dark:text-neutral-500 font-medium px-1 mb-1">
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
                      className="w-8 h-8 flex items-center justify-center text-base hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition-transform hover:scale-125 cursor-pointer"
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
