"use server";

import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";

export async function getAuditLogs(page = 1, pageSize = 20) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const [totalCount, logs] = await Promise.all([
    prisma.adminAuditLog.count(),
    prisma.adminAuditLog.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    logs,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}
