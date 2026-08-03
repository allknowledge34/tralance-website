import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
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
        
        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="writer@example.com"
              className="w-full bg-[var(--layer-1)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-foreground placeholder:text-subtle focus:outline-none focus:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)] transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground/80">Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-[var(--layer-1)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-foreground placeholder:text-subtle focus:outline-none focus:border-[var(--border-strong)] focus:ring-1 focus:ring-[var(--border-strong)] transition-all"
            />
          </div>
          
          <div className="pt-4">
            <Link href="/" className="block w-full">
              <button className="w-full bg-foreground text-background font-medium rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Continue to Workspace
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
