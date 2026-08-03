"use client";

import { useActionState, useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4 font-sans text-[var(--foreground)]">
      <div className="w-full max-w-sm material-layer-elevated p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-[var(--layer-1)] border border-[var(--border-strong)] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="font-sans font-bold text-xl text-foreground">W</span>
          </div>
          <h1 className="editorial-title text-2xl text-foreground mb-2">Welcome Back</h1>
          <p className="text-subtle text-sm">Sign in to your workspace</p>
        </div>
        
        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>{state.error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
            <input 
              id="email" 
              name="email"
              type="email" 
              required
              placeholder="admin@example.com"
              className="w-full bg-[var(--layer-1)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-foreground placeholder:text-subtle focus:outline-none focus:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)] transition-all"
            />
          </div>
          
          <div className="space-y-2 relative">
            <label htmlFor="password" className="text-sm font-medium text-foreground/80">Password</label>
            <div className="relative">
              <input 
                id="password" 
                name="password"
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••" 
                className="w-full bg-[var(--layer-1)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 pr-10 text-foreground placeholder:text-subtle focus:outline-none focus:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-foreground text-background font-medium rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Continue to Workspace
                  <ArrowRight className="w-4 h-4 stroke-[2]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
