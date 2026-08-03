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
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query, pathname, router, searchParams]);

  return (
    <div className="relative w-full material-layer rounded-2xl md:rounded-full overflow-hidden focus-within:ring-1 focus-within:ring-white/20 transition-all">
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle stroke-[1.5] transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`} />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none py-3 md:py-2.5 pl-11 pr-4 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-0"
      />
    </div>
  );
}
