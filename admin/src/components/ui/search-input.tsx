"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export function SearchInput({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        if (query) {
          params.set("q", query);
        } else {
          params.delete("q");
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, pathname, router, searchParams]);

  return (
    <div className="relative w-full rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] focus-within:ring-2 focus-within:ring-[#FFE52E] transition-all overflow-hidden">
      <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#171717] dark:text-[#A3A3A3] stroke-[2.5] transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`} />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none py-2.5 pl-10 pr-4 text-sm font-medium text-[#171717] dark:text-[#FFFFFF] placeholder:text-[#A3A3A3] dark:placeholder:text-[#737373] focus:outline-none"
      />
    </div>
  );
}
