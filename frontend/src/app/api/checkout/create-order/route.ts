import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const { planId } = await req.json();

    let amount = 0;

    if (planId === 'monthly') {
      amount = 49;
    } else if (planId === 'yearly') {
      amount = 149;
    } else {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
      return NextResponse.json({ error: 'Payment configuration missing on server.' }, { status: 500 });
    }

    const dbOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        planId,
        amount,
        status: 'PENDING'
      }
    });

    const env = process.env.CASHFREE_ENVIRONMENT || 'PRODUCTION';
    const baseUrl = env === 'SANDBOX' 
      ? 'https://sandbox.cashfree.com/pg/orders' 
      : 'https://api.cashfree.com/pg/orders';

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.tralance.pro';

    const cashfreeResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-api-version': process.env.CASHFREE_API_VERSION || '2025-01-01',
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: 'INR',
        order_id: dbOrder.id,
        customer_details: {
          customer_id: session.user.id,
          customer_email: session.user.email || 'customer@tralance.pro',
          customer_phone: '9999999999',
          customer_name: session.user.name || 'Customer'
        },
        order_meta: {
          return_url: `${appUrl}/payment/status?order_id={order_id}`,
          notify_url: `${appUrl}/api/webhooks/cashfree`
        }
      })
    });

    const cfData = await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      console.error("Cashfree order creation failed. Status:", cashfreeResponse.status, "Response:", cfData);
      await prisma.order.delete({ where: { id: dbOrder.id } });
      return NextResponse.json({ error: 'Failed to initialize payment.' }, { status: 500 });
    }

    return NextResponse.json({
      payment_session_id: cfData.payment_session_id,
      environment: env
    });

  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
