import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const order = await prisma.order.findUnique({
      where: { razorpayOrderId: razorpay_order_id }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json({ success: false, error: 'User mismatch' }, { status: 403 });
    }

    if (order.status === 'SUCCESS') {
      return NextResponse.json({ success: true, alreadyVerified: true });
    }

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'FAILED' }
      });
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { 
        status: 'SUCCESS',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      }
    });


    const expiresAt = new Date();
    if (order.planId === 'monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    } else if (order.planId === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    }


    const existing = await prisma.entitlement.findFirst({
      where: {
        userId: order.userId,
        planId: order.planId,
        toolId: order.toolId,
      }
    });

    if (existing) {
      await prisma.entitlement.update({
        where: { id: existing.id },
        data: { expiresAt }
      });
    } else {
      await prisma.entitlement.create({
        data: {
          userId: order.userId,
          planId: order.planId,
          toolId: order.toolId,
          expiresAt
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
