'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
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

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
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
      
      if (typeof window !== 'undefined' && (window as unknown as { gtag: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', `${planId}_checkout_click`, {
          event_category: 'ecommerce',
          value: amount
        });
      }

      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you offline?');
        setLoading(false);
        return;
      }

      const orderResponse = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, toolId }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.id) {
        alert(orderData.error || 'Failed to initialize payment.');
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Tralance',
        description: `Purchase: ${title}`,
        order_id: orderData.id,

        handler: async function (response: RazorpaySuccessResponse) {
          try {
            const verifyRes = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              if (typeof window !== 'undefined' && (window as unknown as { gtag: (...args: unknown[]) => void }).gtag) {
                (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'purchase_success', { event_category: 'ecommerce', value: amount, planId });
              }
              window.location.href = "/account";
            } else {
              if (typeof window !== 'undefined' && (window as unknown as { gtag: (...args: unknown[]) => void }).gtag) {
                (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'purchase_failed', { event_category: 'ecommerce', error: 'Verification failed' });
              }
              alert('Payment verification failed.');
            }
          } catch (e) {
            alert('Payment verification error.');
          }
        },
        prefill: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
          contact: ''
        },
        theme: {
          color: '#0066FF'
        }
      };


      const paymentObject = new (window as unknown as { Razorpay: new (options: Record<string, unknown>) => { open: () => void, on: (event: string, handler: (response: RazorpayErrorResponse) => void) => void } }).Razorpay(options);

      paymentObject.on('payment.failed', function (response: RazorpayErrorResponse) {
        if (typeof window !== 'undefined' && (window as unknown as { gtag: (...args: unknown[]) => void }).gtag) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'purchase_failed', { event_category: 'ecommerce', error: response.error.description });
        }
      });
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert('Checkout error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading || status === 'loading'}
      className={className}
    >
      {loading ? 'Processing...' : title}
    </button>
  );
}
