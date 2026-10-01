import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireProAccess } from '@/lib/entitlements';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { toolId, data } = await req.json();

    const hasAccess = await requireProAccess();
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden. Pro entitlement required.' }, { status: 403 });
    }

    const saved = await prisma.toolData.create({
      data: {
        userId: session.user.id,
        toolId,
        name: `Save - ${new Date().toLocaleDateString()}`,
        data: data || {}
      }
    });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
