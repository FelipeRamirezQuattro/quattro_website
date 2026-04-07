import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, name } = body as Record<string, string>;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.trim().toLowerCase(), name: name?.trim() || null });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 },
      );
    }
    console.error("[newsletter API]", error.message);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
