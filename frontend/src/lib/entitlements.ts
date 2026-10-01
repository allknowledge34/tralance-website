import { prisma } from '@/lib/db/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function hasProAccess(userId: string): Promise<boolean> {
  const entitlements = await prisma.entitlement.findMany({
    where: { userId }
  });

  const now = new Date();

  return entitlements.some(e => {

    if (e.planId === 'pro') return true;
    

    if (e.planId === 'monthly' || e.planId === 'yearly') {
      if (!e.expiresAt) return true; // Safety fallback if no expiry set
      return e.expiresAt > now;
    }
    
    return false;
  });
}

export async function requireProAccess() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return false;
  }
  return await hasProAccess(session.user.id);
}
