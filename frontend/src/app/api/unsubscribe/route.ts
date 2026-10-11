import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new NextResponse(
      "<html><body style='font-family: sans-serif; text-align: center; padding: 40px;'><h2>Invalid Request</h2><p>No email provided.</p></body></html>",
      { headers: { "Content-Type": "text/html" }, status: 400 }
    );
  }

  try {
    await prisma.emailSuppression.upsert({
      where: { email: email.toLowerCase() },
      update: { reason: "UNSUBSCRIBE" },
      create: { email: email.toLowerCase(), reason: "UNSUBSCRIBE" },
    });

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed • Tralance</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
            .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 36px; max-width: 440px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            h2 { margin: 0 0 12px 0; font-size: 20px; font-weight: 700; }
            p { margin: 0 0 24px 0; font-size: 14px; color: #64748b; line-height: 1.5; }
            .btn { background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>You've Been Unsubscribed</h2>
            <p><strong>${email}</strong> has been removed from future marketing and product announcement broadcasts.</p>
            <a href="https://www.tralance.pro" class="btn">Return to Tralance</a>
          </div>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return new NextResponse("Server error while processing unsubscribe", { status: 500 });
  }
}
