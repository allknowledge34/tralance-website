import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Verify webhook secret if configured
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
    if (webhookSecret) {
      const authHeader = req.headers.get("authorization");
      const svixSignature = req.headers.get("svix-signature");
      if (!authHeader && !svixSignature) {
        return NextResponse.json({ error: "Missing webhook authorization" }, { status: 401 });
      }
    }

    const { type, data } = payload;
    const emailId = data?.email_id;
    const to = Array.isArray(data?.to) ? data.to[0] : data?.to;

    if (!emailId && !to) {
      return NextResponse.json({ received: true });
    }

    // Handle delivery event
    if (type === "email.delivered") {
      if (emailId) {
        await prisma.emailRecipientLog.updateMany({
          where: { messageId: emailId },
          data: {
            status: "DELIVERED",
            deliveredAt: new Date(),
          },
        });
      }
    }

    // Handle bounce event
    if (type === "email.bounced") {
      if (emailId) {
        await prisma.emailRecipientLog.updateMany({
          where: { messageId: emailId },
          data: {
            status: "BOUNCED",
            error: data?.bounce?.message || "Email bounced by destination server",
          },
        });
      }
      if (to) {
        await prisma.emailSuppression.upsert({
          where: { email: to.toLowerCase() },
          update: { reason: "BOUNCE" },
          create: { email: to.toLowerCase(), reason: "BOUNCE" },
        });
      }
    }

    // Handle spam complaint
    if (type === "email.complained") {
      if (emailId) {
        await prisma.emailRecipientLog.updateMany({
          where: { messageId: emailId },
          data: {
            status: "FAILED",
            error: "Spam complaint received",
          },
        });
      }
      if (to) {
        await prisma.emailSuppression.upsert({
          where: { email: to.toLowerCase() },
          update: { reason: "COMPLAINT" },
          create: { email: to.toLowerCase(), reason: "COMPLAINT" },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Resend webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
