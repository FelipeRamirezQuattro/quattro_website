import { NextRequest, NextResponse } from "next/server";
import { insertLead, pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (!pool) {
    return NextResponse.json(
      { error: "Database is not configured" },
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

  try {
    await insertLead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      service: service?.trim() || undefined,
      message: message.trim(),
      source: source || "website",
    });
  } catch (error) {
    console.error("[leads API]", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to save your message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
