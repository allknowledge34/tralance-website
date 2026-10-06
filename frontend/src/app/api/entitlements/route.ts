import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ entitlements: [] });
    }

    const userEntitlements = await prisma.entitlement.findMany({
      where: { userId: session.user.id }
    });

    return NextResponse.json({ entitlements: userEntitlements });
  } catch (error) {
    console.error('Failed to fetch entitlements:', error);
    return NextResponse.json({ entitlements: [] });
  }
}
