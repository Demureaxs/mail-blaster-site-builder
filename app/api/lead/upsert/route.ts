import { NextRequest, NextResponse } from "next/server";
import { upsertLead } from "@/lib/kv";
import { LeadConfig } from "@/lib/types";

export async function POST(req: NextRequest) {
  const token = req.headers.get("X-ADMIN-TOKEN");
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { industry, slug, data } = body;

    if (!industry || !slug || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await upsertLead(industry, slug, data as LeadConfig);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Upsert error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
