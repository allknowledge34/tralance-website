import { prisma } from "@/lib/db/prisma";

export interface EmailSendOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  senderName?: string;
  senderEmail?: string;
  isTest?: boolean;
  campaignId?: string;
}

export interface EmailProviderStatus {
  configured: boolean;
  provider: "resend" | "sendgrid" | "smtp" | "simulated";
  senderEmail: string;
  senderName: string;
  description: string;
  missingRequirements: string[];
}

export function getEmailProviderStatus(): EmailProviderStatus {
  const missing: string[] = [];
  const senderEmail = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM || "updates@tralance.pro";
  const senderName = process.env.RESEND_FROM_NAME || process.env.EMAIL_FROM_NAME || "Tralance Team";

  if (process.env.RESEND_API_KEY) {
    return {
      configured: true,
      provider: "resend",
      senderEmail,
      senderName,
      description: "Production Gateway Active (Resend API)",
      missingRequirements: [],
    };
  }

  if (process.env.SENDGRID_API_KEY) {
    return {
      configured: true,
      provider: "sendgrid",
      senderEmail,
      senderName,
      description: "Production Gateway Active (SendGrid API)",
      missingRequirements: [],
    };
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return {
      configured: true,
      provider: "smtp",
      senderEmail,
      senderName,
      description: "Production Gateway Active (SMTP)",
      missingRequirements: [],
    };
  }

  // Not yet configured
  missing.push("RESEND_API_KEY: Set your real Resend API key in server-side .env (e.g. re_xxxx)");
  missing.push("RESEND_FROM_EMAIL: Configure your verified domain address (e.g. updates@tralance.pro)");
  missing.push("DNS Verification: Ensure SPF, DKIM, and MX/DMARC records are active on your domain");

  return {
    configured: false,
    provider: "simulated",
    senderEmail,
    senderName,
    description: "Simulated Provider Mode (No live API keys configured in .env)",
    missingRequirements: missing,
  };
}

// Appends compliant Tralance footer with unsubscribe link
function appendEmailFooter(html: string, recipientEmail: string): string {
  const unsubUrl = `https://www.tralance.pro/api/unsubscribe?email=${encodeURIComponent(recipientEmail)}`;
  const footerHtml = `
    <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <p style="margin: 0 0 6px 0;">© 2026 Tralance • Operated by DmilX • Private, offline-first tools for freelancers</p>
      <p style="margin: 0;">
        You received this email because you have a registered account on Tralance.
        <br />
        <a href="${unsubUrl}" style="color: #64748b; text-decoration: underline; margin-top: 4px; display: inline-block;">Unsubscribe from broadcast updates</a>
      </p>
    </div>
  `;

  // Insert before closing </body> or </div> if present, otherwise append
  if (html.includes("</body>")) {
    return html.replace("</body>", `${footerHtml}</body>`);
  }
  return `${html}${footerHtml}`;
}

/**
 * Sends a single email with real Resend delivery or fallbacks.
 */
export async function sendEmail(options: EmailSendOptions): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
  simulated: boolean;
}> {
  const provider = getEmailProviderStatus();
  const rawRecipients = Array.isArray(options.to) ? options.to : [options.to];

  // Check suppression list
  const suppressions = await prisma.emailSuppression.findMany({
    where: { email: { in: rawRecipients } },
    select: { email: true },
  });
  const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));
  const eligibleRecipients = rawRecipients.filter((e) => !suppressedSet.has(e.toLowerCase()));

  if (eligibleRecipients.length === 0) {
    return {
      success: false,
      error: "Recipient is on the suppression/unsubscribe list.",
      simulated: !provider.configured,
    };
  }

  const recipient = eligibleRecipients[0];
  const finalHtml = options.isTest ? options.html : appendEmailFooter(options.html, recipient);
  const rawFrom = options.senderEmail || provider.senderEmail;
  const fromHeader = rawFrom.includes("<")
    ? rawFrom
    : `${options.senderName || provider.senderName} <${rawFrom}>`;

  // 1. Resend API
  if (provider.provider === "resend" && process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromHeader,
          to: [recipient],
          subject: options.subject,
          html: finalHtml,
          text: options.text,
          headers: {
            "X-Entity-Ref-ID": options.campaignId || `tralance_${Date.now()}`,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.message || `Resend HTTP error ${res.status}`,
          simulated: false,
        };
      }

      return {
        success: true,
        messageId: data.id,
        simulated: false,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to communicate with Resend API";
      return { success: false, error: msg, simulated: false };
    }
  }

  // 2. SendGrid API
  if (provider.provider === "sendgrid" && process.env.SENDGRID_API_KEY) {
    try {
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: recipient }] }],
          from: {
            email: options.senderEmail || provider.senderEmail,
            name: options.senderName || provider.senderName,
          },
          subject: options.subject,
          content: [{ type: "text/html", value: finalHtml }],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: text || `SendGrid error ${res.status}`, simulated: false };
      }

      return {
        success: true,
        messageId: `sg_${Date.now()}`,
        simulated: false,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "SendGrid connection error";
      return { success: false, error: msg, simulated: false };
    }
  }

  // 3. Fallback Simulated Mode (When no key is configured in .env)
  console.log(`[Email Simulation] To: ${recipient} | Subject: "${options.subject}"`);
  return {
    success: true,
    messageId: `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    simulated: true,
  };
}

/**
 * Controlled batch broadcaster with rate limiting, duplicate protection,
 * and individual recipient log tracking.
 */
export async function sendCampaignBatch({
  campaignId,
  recipients,
  subject,
  html,
  senderName,
  senderEmail,
}: {
  campaignId: string;
  recipients: string[];
  subject: string;
  html: string;
  senderName: string;
  senderEmail: string;
}): Promise<{
  total: number;
  sent: number;
  failed: number;
  simulated: boolean;
}> {
  const provider = getEmailProviderStatus();

  // 1. Fetch suppression list
  const suppressions = await prisma.emailSuppression.findMany({
    where: { email: { in: recipients } },
    select: { email: true },
  });
  const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));

  // 2. Fetch existing logs for this campaign to prevent duplicate sends
  const existingLogs = await prisma.emailRecipientLog.findMany({
    where: { campaignId },
    select: { email: true, status: true },
  });
  const alreadySentSet = new Set(
    existingLogs
      .filter((l) => l.status === "SENT" || l.status === "DELIVERED")
      .map((l) => l.email.toLowerCase())
  );

  const eligible = recipients.filter(
    (e) => !suppressedSet.has(e.toLowerCase()) && !alreadySentSet.has(e.toLowerCase())
  );

  let sent = 0;
  let failed = 0;

  // Process in controlled batches of 20 with rate limit delay
  const BATCH_SIZE = 20;
  for (let i = 0; i < eligible.length; i += BATCH_SIZE) {
    const chunk = eligible.slice(i, i + BATCH_SIZE);

    for (const email of chunk) {
      // Upsert log as QUEUED
      const log = await prisma.emailRecipientLog.create({
        data: {
          campaignId,
          email,
          status: "QUEUED",
        },
      });

      const res = await sendEmail({
        to: email,
        subject,
        html,
        senderName,
        senderEmail,
        campaignId,
      });

      if (res.success) {
        sent++;
        await prisma.emailRecipientLog.update({
          where: { id: log.id },
          data: {
            status: "SENT",
            messageId: res.messageId,
            sentAt: new Date(),
          },
        });
      } else {
        failed++;
        await prisma.emailRecipientLog.update({
          where: { id: log.id },
          data: {
            status: "FAILED",
            error: res.error || "Unknown delivery error",
          },
        });
      }

      // Small delay between sends to respect rate limits (e.g. Resend 10 req/s)
      if (provider.configured) {
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    }
  }

  return {
    total: eligible.length,
    sent,
    failed,
    simulated: !provider.configured,
  };
}
