import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";

interface AuditLogParams {
  action: string;
  entityType: "BLOG" | "USER" | "PROMO" | "NOTIFICATION" | "CAMPAIGN" | "SETTINGS" | "AUTH";
  entityId?: string;
  details?: string;
  ipAddress?: string;
}

export async function logAdminActivity({
  action,
  entityType,
  entityId,
  details,
  ipAddress,
}: AuditLogParams) {
  try {
    const session = await verifySession();
    const adminEmail = (session as { email?: string } | null)?.email || process.env.ADMIN_EMAIL || "admin@tralance.pro";

    await prisma.adminAuditLog.create({
      data: {
        action,
        entityType,
        entityId,
        details,
        adminEmail,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Failed to write admin audit log:", error);
  }
}
