import type { ChatMessage } from "@/types/chat";

const CHAT_URL = process.env.NEXT_PUBLIC_N8N_CHAT_URL!;
const LEAD_URL = process.env.NEXT_PUBLIC_N8N_LEAD_URL!;

export interface N8NChatRequest {
  message: string;
  sessionId: string;
  conversationHistory: Array<{ role: string; content: string }>;
}

export interface N8NChatResponse {
  response: string;
  source: "faq" | "openai";
  showContactForm: boolean;
  sessionId: string;
  timestamp: string;
}

export interface N8NLeadRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  sessionId: string;
  conversationSummary: string;
}

export async function sendChatMessage(
  payload: N8NChatRequest,
): Promise<N8NChatResponse> {
  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Chat API error: ${res.status}`);
  return res.json() as Promise<N8NChatResponse>;
}

export async function submitChatLead(
  payload: N8NLeadRequest,
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Lead API error: ${res.status}`);
  return res.json() as Promise<{ success: boolean; message: string }>;
}

/** Generates a unique session ID per browser session */
export function generateSessionId(): string {
  return `qs-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Builds a plain-text conversation summary for the lead submission */
export function buildConversationSummary(
  messages: Pick<ChatMessage, "role" | "content">[],
): string {
  return messages
    .filter((m) => m.role !== "system")
    .map(
      (m) =>
        `${m.role === "user" ? "Visitor" : "Quattro Bot"}: ${m.content.slice(0, 300)}`,
    )
    .join("\n\n");
}
