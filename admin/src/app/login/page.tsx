"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF5] dark:bg-[#121214] p-4 font-sans text-[#171717] dark:text-[#FFFDF5]">
      <div className="w-full max-w-sm bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[6px_6px_0px_0px_#171717] dark:shadow-[6px_6px_0px_0px_#000000] p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#FFE52E] border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] p-2 flex items-center justify-center mx-auto mb-5">
            <Image
              src="/app-icon.png"
              alt="Tralance App Icon"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
              unoptimized
            />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5] mb-1">Welcome Back</h1>
          <p className="text-subtle text-xs font-bold uppercase tracking-wider">Sign in to your workspace</p>
        </div>
        
        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div className="p-3 bg-[#FF6B6B]/20 border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center gap-2 text-[#171717] dark:text-[#FF6B6B] text-xs font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#FF6B6B]" />
              <p>{state.error}</p>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">Email</label>
            <input 
              id="email" 
              name="email"
              type="email" 
              required
              placeholder="admin@example.com"
              className="w-full bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] px-4 py-2.5 text-sm font-medium text-[#171717] dark:text-[#FFFDF5] placeholder:text-subtle focus:outline-none focus:border-[#FFE52E]"
            />
          </div>
          
          <div className="space-y-1.5 relative">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">Password</label>
            <div className="relative">
              <input 
                id="password" 
                name="password"
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••" 
                className="w-full bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] px-4 py-2.5 pr-10 text-sm font-medium text-[#171717] dark:text-[#FFFDF5] placeholder:text-subtle focus:outline-none focus:border-[#FFE52E]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-[#FFE52E] text-[#171717] font-black uppercase tracking-wider text-xs border-2 border-[#171717] shadow-[3px_3px_0px_0px_#171717] px-4 py-3 flex items-center justify-center gap-2 hover:bg-[#FFE52E]/90 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Continue to Workspace
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
