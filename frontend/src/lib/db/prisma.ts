import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

delete (global as any).prisma;
export const prisma = new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
