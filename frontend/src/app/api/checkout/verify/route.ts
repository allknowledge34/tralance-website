import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { order_id } = await req.json();

    if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const order = await prisma.order.findUnique({
      where: { id: order_id }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: 'User mismatch' }, { status: 403 });
    }

    if (order.status === 'SUCCESS') {
      return NextResponse.json({ status: 'SUCCESS' });
    }

    const env = process.env.CASHFREE_ENVIRONMENT || 'PRODUCTION';
    const baseUrl = env === 'SANDBOX' 
      ? `https://sandbox.cashfree.com/pg/orders/${order_id}`
      : `https://api.cashfree.com/pg/orders/${order_id}`;

    const cfRes = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'x-api-version': process.env.CASHFREE_API_VERSION || '2025-01-01',
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      }
    });

    const cfData = await cfRes.json();

    if (!cfRes.ok || !cfData.order_status) {
       return NextResponse.json({ error: 'Failed to verify payment with provider' }, { status: 500 });
    }

    const orderStatus = cfData.order_status;
    
    if (orderStatus === 'PAID') {
      const updateResult = await prisma.order.updateMany({
        where: { id: order.id, status: 'PENDING' },
        data: { status: 'SUCCESS' }
      });

      if (updateResult.count === 0) {
        // If it wasn't PENDING, it was already processed
        return NextResponse.json({ status: 'SUCCESS' });
      }

      const expiresAt = new Date();
      if (order.planId === 'monthly') {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else if (order.planId === 'yearly') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      const existing = await prisma.entitlement.findFirst({
        where: {
          userId: order.userId,
          planId: { in: ['monthly', 'yearly'] },
          toolId: order.toolId,
        }
      });

      if (existing) {
        const newExpiry = existing.expiresAt && existing.expiresAt > new Date() 
          ? new Date(existing.expiresAt.getTime() + (expiresAt.getTime() - new Date().getTime()))
          : expiresAt;
          
        await prisma.entitlement.update({
          where: { id: existing.id },
          data: { 
            expiresAt: newExpiry,
            planId: order.planId // Upgrade/change to the new plan ID if it was different
          }
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
      return NextResponse.json({ status: 'SUCCESS' });
    }

    if (orderStatus === 'ACTIVE') {
      return NextResponse.json({ status: 'PENDING' });
    }

    return NextResponse.json({ status: 'FAILED' });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
