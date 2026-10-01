import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { hasProAccess } from '@/lib/entitlements';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { toolId } = await req.json();

    if (!['freelancer-invoice-generator', 'project-brief-builder', 'freelance-contract-generator'].includes(toolId)) {
      return NextResponse.json({ error: 'Invalid tool ID' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (session?.user?.id) {
      const isPro = await hasProAccess(session.user.id);
      if (isPro) {
        return NextResponse.json({ allowed: true, isPro: true });
      }
    }


    let identifier = '';
    let responseCookie = null;
    if (session?.user?.id) {
      identifier = `user:${session.user.id}`;
    } else {
      const deviceCookie = req.headers.get('cookie')?.match(/tralance_device_id=([^;]+)/)?.[1];
      if (deviceCookie) {
        identifier = `device:${deviceCookie}`;
      } else {
        const newDeviceCookie = crypto.randomUUID();
        identifier = `device:${newDeviceCookie}`;
        responseCookie = `tralance_device_id=${newDeviceCookie}; Path=/; HttpOnly; Max-Age=31536000; SameSite=Strict`;
      }
    }


    let usage = await prisma.pdfUsage.findUnique({ where: { identifier } });
    if (!usage) {
      usage = await prisma.pdfUsage.create({ data: { identifier } });
    }

    const toolField = toolId === 'freelancer-invoice-generator' ? 'invoiceUses' :
                      toolId === 'project-brief-builder' ? 'briefUses' : 'contractUses';

    if (usage[toolField] >= 2) {
      return NextResponse.json({ allowed: false, limitReached: true }, { status: 403 });
    }

    await prisma.pdfUsage.update({
      where: { identifier },
      data: { [toolField]: usage[toolField] + 1 }
    });

    const response = NextResponse.json({ allowed: true, usageCount: usage[toolField] + 1 });
    if (responseCookie) {
      response.headers.set('Set-Cookie', responseCookie);
    }

    return response;
  } catch (error) {
    console.error('Consume PDF error:', error);
    return NextResponse.json({ error: 'Failed to consume limit' }, { status: 500 });
  }
}
