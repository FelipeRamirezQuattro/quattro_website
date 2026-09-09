import { NextRequest, NextResponse } from "next/server";
import { insertNewsletterSubscriber, pool } from "@/lib/db";

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

  try {
    const { alreadySubscribed } = await insertNewsletterSubscriber(
      email.trim().toLowerCase(),
      name?.trim() || null,
    );

    if (alreadySubscribed) {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("[newsletter API]", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
