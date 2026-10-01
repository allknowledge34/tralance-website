'use client';
import { signIn } from 'next-auth/react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl
    });
    if (res?.error) setError('Invalid credentials');
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-[#12182B] p-8 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Sign in to Tralance</h1>
      
      <button 
        onClick={() => signIn('google', { callbackUrl })}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-semibold text-slate-700 dark:text-slate-300 mb-6"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 24c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 21.53 7.7 24 12 24z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 4.69c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.43 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.22 6.16-4.22z" /></svg>
        Continue with Google
      </button>

      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
        <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">or</span>
        <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors">
          Sign In
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Don&apos;t have an account? <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-primary hover:underline font-medium">Create one</Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4">
      <Suspense fallback={<p>Loading...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
