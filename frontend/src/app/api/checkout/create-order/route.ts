import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
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

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Razorpay configuration missing on server.' }, { status: 500 });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    const dbOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        planId,
        amount,
        razorpayOrderId: order.id,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ ...order, dbOrderId: dbOrder.id, key_id: process.env.RAZORPAY_KEY_ID });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
