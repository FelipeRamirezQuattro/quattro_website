import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "https://felipe-osi.app.n8n.cloud/webhook/quattro-contact";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, string>;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message" },
      { status: 400 },
    );
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message" },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      }),
      cache: "no-store",
    });

    if (response.status !== 200) {
      console.error("[chatbot-contact API] n8n non-200:", response.status);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[chatbot-contact API]", error);
    return NextResponse.json(
      { error: "Could not reach contact automation." },
      { status: 500 },
    );
  }
}
