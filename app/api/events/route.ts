import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/kv";
import { EventPayload } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Basic validation
    if (!body.event) {
      return NextResponse.json({ error: "Missing event name" }, { status: 400 });
    }

    await logEvent(body as EventPayload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Event log error:", error);
    // Don't fail the client for logging errors
    return NextResponse.json({ success: false }, { status: 200 }); 
  }
}
