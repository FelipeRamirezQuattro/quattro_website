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

  const { name, email, phone, company, service, message, source } =
    body as Record<string, string>;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message" },
      { status: 400 },
    );
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("leads").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    company: company?.trim() || null,
    service: service?.trim() || null,
    message: message.trim(),
    source: source || "website",
  });

  if (error) {
    console.error("[leads API]", error.message);
    return NextResponse.json(
      { error: "Failed to save your message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
