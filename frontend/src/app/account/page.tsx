'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const { data: session, status } = useSession({ required: true });
  const [entitlements, setEntitlements] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/entitlements')
        .then(res => res.json())
        .then(data => setEntitlements(data.entitlements || []))
        .catch(console.error);
    }
  }, [status]);

  if (status === 'loading') return <div className="p-20 text-center">Loading...</div>;

  const now = new Date();
  const activePro = entitlements.find(e => {
    if (e.planId === 'pro') return true;
    if (e.planId === 'monthly' || e.planId === 'yearly') {
      return !e.expiresAt || new Date(e.expiresAt as string) > now;
    }
    return false;
  });

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Account</h1>
      
      <div className="bg-white dark:bg-[#12182B] p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Profile</h2>
        <p className="text-slate-600 dark:text-slate-400"><strong>Name:</strong> {session?.user?.name || 'N/A'}</p>
        <p className="text-slate-600 dark:text-slate-400 mb-4"><strong>Email:</strong> {session?.user?.email}</p>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white dark:bg-[#12182B] p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Pro Access</h2>
        
        {activePro ? (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/20 rounded-xl mb-4">
            <p className="font-bold text-green-700 dark:text-green-400">Tralance Pro Active</p>
            <p className="text-sm text-green-600 dark:text-green-500">
              Plan: {activePro.planId === 'pro' ? 'Lifetime' : activePro.planId as string}
            </p>
            {activePro.expiresAt && (
              <p className="text-sm text-green-600 dark:text-green-500">
                Expires on: {new Date(activePro.expiresAt as string).toLocaleDateString()}
              </p>
            )}
            <p className="text-sm text-green-600 dark:text-green-500 mt-2">You have unlimited access to all Pro features across all tools.</p>
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-400 mb-4">You do not have any active Pro entitlements.</p>
        )}

        {!activePro && (
          <Link href="/pricing" className="inline-block mt-2 text-primary font-semibold hover:underline">
            Upgrade to Tralance Pro
          </Link>
        )}
      </div>
    </div>
  );
}
