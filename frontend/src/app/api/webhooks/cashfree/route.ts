import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    if (!signature || !timestamp || !process.env.CASHFREE_SECRET_KEY) {
      return new NextResponse('Missing signature or config', { status: 400 });
    }

    const payload = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
      .update(payload)
      .digest('base64');

    if (expectedSignature !== signature) {
      return new NextResponse('Invalid signature', { status: 400 });
    }

    const data = JSON.parse(rawBody);

    if (data.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const order_id = data.data.order.order_id;

      const order = await prisma.order.findUnique({
        where: { id: order_id }
      });

      if (!order) {
        return new NextResponse('Order not found', { status: 200 }); 
      }

      const updateResult = await prisma.order.updateMany({
        where: { id: order_id, status: 'PENDING' },
        data: { status: 'SUCCESS' }
      });

      if (updateResult.count === 0) {
        return new NextResponse('Already processed', { status: 200 }); 
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
    }

    return new NextResponse('OK', { status: 200 });

  } catch {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
