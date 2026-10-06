'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order_id');
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed' | 'pending' | 'error'>('verifying');

  useEffect(() => {
    let mounted = true;

    if (!orderId) {
      if (mounted) setStatus('error');
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch('/api/checkout/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId }),
        });
        const data = await res.json();
        
        if (!mounted) return;

        if (data.status === 'SUCCESS') {
          setStatus('success');
          setTimeout(() => {
            if (mounted) router.push('/account');
          }, 2000);
        } else if (data.status === 'PENDING') {
          setStatus('pending');
        } else {
          setStatus('failed');
        }
      } catch {
        if (mounted) setStatus('error');
      }
    };
    verify();

    return () => { mounted = false; };
  }, [orderId, router]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {status === 'verifying' && (
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <h2 className="text-xl font-bold">Verifying Payment...</h2>
          <p className="text-slate-500 mt-2">Please do not close this window.</p>
        </div>
      )}
      {status === 'success' && (
        <div className="flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold">Payment Successful!</h2>
          <p className="text-slate-500 mt-2">Redirecting to your account...</p>
        </div>
      )}
      {status === 'failed' && (
        <div className="flex flex-col items-center text-center">
          <XCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold">Payment Failed</h2>
          <p className="text-slate-500 mt-2 mb-6">Your payment could not be processed.</p>
          <Link href="/pricing" className="px-6 py-2 bg-slate-900 text-white rounded-lg">Try Again</Link>
        </div>
      )}
      {status === 'pending' && (
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold">Payment Pending</h2>
          <p className="text-slate-500 mt-2 mb-6">Your payment is still processing. Check your account in a few minutes.</p>
          <Link href="/account" className="px-6 py-2 bg-slate-900 text-white rounded-lg">Go to Account</Link>
        </div>
      )}
      {status === 'error' && (
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-slate-500 mt-2 mb-6">We could not verify your payment status.</p>
          <Link href="/account" className="px-6 py-2 bg-slate-900 text-white rounded-lg">Go to Account</Link>
        </div>
      )}
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600"/></div>}>
      <StatusContent />
    </Suspense>
  );
}
