'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Entitlement {
  id?: string;
  planId: string;
  expiresAt?: string | null;
  [key: string]: unknown;
}

export default function AccountPage() {
  const { data: session, status } = useSession({ required: true });
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    if (e.planId === 'monthly' || e.planId === 'yearly') {
      return !e.expiresAt || new Date(e.expiresAt) > now;
    }
    return false;
  });

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch('/api/auth/delete', { method: 'DELETE' });
      if (res.ok) {
        signOut({ callbackUrl: '/' });
      } else {
        alert('Failed to delete account. Please try again later.');
        setIsDeleting(false);
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting account.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Account</h1>
      
      <div className="bg-white dark:bg-[#12182B] p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Profile</h2>
        <div className="space-y-2 mb-6 text-sm text-slate-600 dark:text-slate-400">
          <p><strong>Name:</strong> {session?.user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {session?.user?.email}</p>
        </div>
        
        <div className="flex gap-4 border-t border-slate-200 dark:border-slate-800 pt-4">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Logout
          </button>
          
          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Delete Account
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-red-600 dark:text-red-500">Are you sure?</span>
              <button 
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-1.5"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#12182B] p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Current Plan</h2>
        
        {activePro ? (
          <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-lg text-slate-900 dark:text-white">Pro</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Billing: {activePro.planId === 'yearly' ? 'Yearly' : 'Monthly'}
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </span>
            </div>
            
            {activePro.expiresAt && (
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                <span className="font-medium">Expires on:</span> {new Date(activePro.expiresAt).toLocaleDateString()}
              </div>
            )}
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 pt-4 border-t border-blue-200/50 dark:border-blue-800/50">
              You have unlimited access to all Pro features across all tools.
            </p>
          </div>
        ) : (
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-lg text-slate-900 dark:text-white">Free</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              All 5 tools, unlimited calculator usage, and 2 free PDF downloads per tool.
            </p>
            
            <Link href="/pricing" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Upgrade to Pro
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
