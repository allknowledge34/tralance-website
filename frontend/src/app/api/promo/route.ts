import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const promo = await prisma.promoBarSettings.findUnique({
      where: { id: "global" }
    });
    
    return NextResponse.json(promo || { isActive: false }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error("Promo API Error:", error.message || error);
    return NextResponse.json({ isActive: false, error: error.message }, { status: 500 });
  }
}
