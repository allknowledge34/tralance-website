'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

interface CashfreeCheckoutResult {
  error?: {
    message: string;
  };
  redirect?: boolean;
  paymentDetails?: {
    paymentMessage: string;
  };
}

interface CheckoutButtonProps {
  planId: string;
  toolId?: string;
  amount: number;
  title: string;
  className?: string;
}

export default function CheckoutButton({ planId, toolId, amount, title, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const loadCashfree = async () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      setLoading(true);

      const isLoaded = await loadCashfree();
      if (!isLoaded) {
        setLoading(false);
        return;
      }

      const orderResponse = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, toolId }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.payment_session_id) {
        setLoading(false);
        return;
      }

      const cashfree = (window as any).Cashfree({
        mode: orderData.environment === 'SANDBOX' ? 'sandbox' : 'production',
      });

      const checkoutOptions = {
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_self',
      };

      await cashfree.checkout(checkoutOptions);

    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading || status === 'loading'}
      className={className}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          Processing...
        </span>
      ) : (
        title
      )}
    </button>
  );
}
