'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Save } from 'lucide-react';
import Link from 'next/link';

export default function ProSaveFeature({ toolId, data }: { toolId: string, data: unknown }) {
  const { data: session, status } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/entitlements')
        .then(res => res.json())
        .then(res => {
          if (res.entitlements) {
            const now = new Date();
            const hasPro = res.entitlements.some((e: Record<string, unknown>) => {
              if (e.planId === 'pro') return true;
              if (e.planId === 'monthly' || e.planId === 'yearly') {
                return !e.expiresAt || new Date(e.expiresAt as string) > now;
              }
              return false;
            });
            setHasAccess(hasPro);
          }
        })
        .catch(console.error);
    }
  }, [status, toolId]);

  const handleSave = async () => {
    if (!hasAccess) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/tools/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, data })
      });
      if (res.ok) setMessage('Saved successfully!');
      else setMessage('Failed to save.');
    } catch (e) {
      setMessage('Error saving.');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (status === 'loading') return null;

  if (hasAccess) {
    return (
      <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/20 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-green-700 dark:text-green-400">Pro Feature: Cloud Save</p>
          <p className="text-xs text-green-600 dark:text-green-500">Securely backup this data to your account.</p>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className="text-xs text-green-600 font-medium">{message}</span>}
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Data'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Pro Feature: Cloud Save</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">Upgrade to Monthly or Yearly to save, track, and export your calculations.</p>
      </div>
      <Link 
        href="/pricing"
        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap"
      >
        View Pricing
      </Link>
    </div>
  );
}
