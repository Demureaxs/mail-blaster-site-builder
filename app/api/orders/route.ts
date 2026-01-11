import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/kv";
import { OrderPayload } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Basic validation
    if (!body.contactEmail || !body.industry || !body.slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await createOrder(body as OrderPayload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
