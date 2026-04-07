"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

type ChatStatus = "idle" | "loading" | "success" | "error";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onChange = (key: "name" | "email" | "message", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Name, email, and message are required.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/chatbot-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setErrorMessage(payload?.error || "Message could not be sent.");
        return;
      }

      setStatus("success");
      resetForm();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[70]">
      {open && (
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] mb-3 rounded-2xl border border-quattro-border-dark bg-quattro-surface-mid shadow-[0_12px_50px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="p-4 border-b border-quattro-border-dark bg-quattro-surface-dark">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display font-bold text-white text-lg">
                  Quattro Assistant
                </p>
                <p className="font-body text-xs text-quattro-text-secondary mt-1">
                  Send us a message and we will follow up shortly.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
                className="text-quattro-text-secondary hover:text-white transition-colors"
                type="button"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-4 space-y-3">
            <div>
              <label className="block font-body text-xs text-quattro-text-secondary mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-quattro-border-dark bg-quattro-surface-dark text-white placeholder-quattro-text-secondary/50 text-sm focus:outline-none focus:border-quattro-primary"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block font-body text-xs text-quattro-text-secondary mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-quattro-border-dark bg-quattro-surface-dark text-white placeholder-quattro-text-secondary/50 text-sm focus:outline-none focus:border-quattro-primary"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label className="block font-body text-xs text-quattro-text-secondary mb-1.5">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 rounded-lg border border-quattro-border-dark bg-quattro-surface-dark text-white placeholder-quattro-text-secondary/50 text-sm focus:outline-none focus:border-quattro-primary resize-none"
                placeholder="Tell us what you need help with"
                required
              />
            </div>

            {status === "success" && (
              <p className="text-quattro-success text-xs">
                Message sent successfully. We will contact you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-quattro-error text-xs">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-quattro-primary hover:bg-quattro-primary-light text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        aria-label="Open contact chatbot"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-quattro-primary hover:bg-quattro-primary-light text-white shadow-[0_8px_30px_rgba(23,84,154,0.45)] flex items-center justify-center transition-transform hover:scale-[1.03]"
      >
        <MessageSquare size={22} />
      </button>
    </div>
  );
}
