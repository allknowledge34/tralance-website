'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Loader2, AlertCircle } from 'lucide-react';

interface Entitlement {
  id?: string;
  planId: string;
  expiresAt?: string | null;
  [key: string]: unknown;
}

export default function AccountPage() {
  const { data: session, status } = useSession({ required: true });
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [isLoadingEntitlements, setIsLoadingEntitlements] = useState(true);
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/entitlements')
        .then(res => res.json())
        .then(data => {
          setEntitlements(data.entitlements || []);
          setIsLoadingEntitlements(false);
        })
        .catch(() => {
          setErrorMsg('Failed to load plan details. Please refresh.');
          setIsLoadingEntitlements(false);
        });
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const hasImage = session?.user?.image && !imageError;
  const isGoogle = session?.user?.image && session?.user?.image.includes('googleusercontent');

  const now = new Date();
  const activePro = entitlements.find(e => {
    if (e.planId === 'monthly' || e.planId === 'yearly') {
      return !e.expiresAt || new Date(e.expiresAt) > now;
    }
    return false;
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/' });
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setErrorMsg('');
      const res = await fetch('/api/auth/delete', { method: 'DELETE' });
      if (res.ok) {
        await signOut({ callbackUrl: '/' });
      } else {
        setErrorMsg('Something went wrong. Please try again.');
        setIsDeleting(false);
        setShowDeleteConfirm(false);
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Account</h1>
      
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{errorMsg}</p>
        </div>
      )}

      <div className="bg-white dark:bg-[#12182B] p-6 sm:p-8 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Profile</h2>
        
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-[#0B1020] shadow-sm flex items-center justify-center shrink-0">
            {hasImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={session.user!.image!} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <User className="w-10 h-10 text-slate-400" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {session?.user?.name || 'User'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
              {session?.user?.email}
            </p>
            {isGoogle && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Connected via Google
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut || isDeleting}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoggingOut && <Loader2 className="w-4 h-4 animate-spin" />}
            Log out
          </button>
          
          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isLoggingOut || isDeleting}
              className="flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-bold bg-white hover:bg-red-50 dark:bg-transparent dark:hover:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/30 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Delete Account
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 w-full sm:w-auto">
              <span className="text-sm font-medium text-red-700 dark:text-red-400">Are you sure? This is permanent.</span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-70 transition-colors"
                >
                  {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Delete
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="flex-1 sm:flex-none bg-white dark:bg-transparent border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-70 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#12182B] p-6 sm:p-8 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Current Plan</h2>
        
        {isLoadingEntitlements ? (
          <div className="py-8 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : activePro ? (
          <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
              <div>
                <p className="font-bold text-2xl text-slate-900 dark:text-white mb-1">Pro Plan</p>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Billing: {activePro.planId === 'yearly' ? 'Yearly' : 'Monthly'}
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 self-start">
                Active
              </span>
            </div>
            
            {activePro.expiresAt && (
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50 inline-block">
                <span className="font-semibold mr-2">Renews on:</span> 
                {new Date(activePro.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            )}
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              You have unlimited access to all features and PDFs across all tools.
            </p>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
              <div>
                <p className="font-bold text-2xl text-slate-900 dark:text-white mb-1">Free Plan</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 self-start">
                Active
              </span>
            </div>
            
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-8 list-disc pl-5">
              <li>Access to all 5 professional tools</li>
              <li>Unlimited calculator usage</li>
              <li>2 free PDF downloads per tool</li>
            </ul>
            
            <Link 
              href="/pricing" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-yellow-300 hover:bg-yellow-400 transition-colors w-full sm:w-auto"
            >
              Upgrade to Pro
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
