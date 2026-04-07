"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message || "You're subscribed! 🎉");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  };

  return (
    <AnimatedSection direction="right">
      <div
        className="p-8 sm:p-10 rounded-3xl relative overflow-hidden h-full"
        style={
          {
            background:
              "linear-gradient(135deg, rgba(14,55,105,0.9), rgba(23,84,154,0.6))",
          } as CSSProperties
        }
      >
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-quattro-accent/20 border border-quattro-accent/30 flex items-center justify-center mb-6">
            <Mail size={22} color="rgb(56,189,248)" />
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
            Stay ahead of the tech curve.
          </h3>
          <p className="font-body text-quattro-text-secondary mb-8 leading-relaxed">
            Get the latest insights on AI automation, custom software,
            QuickBooks integrations, and digital transformation — straight to
            your inbox. No spam, ever.
          </p>

          {status === "success" ? (
            <div className="p-5 rounded-2xl bg-green-900/40 border border-green-500/30 text-green-100">
              <p className="font-body font-medium">{msg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 text-sm rounded-xl bg-quattro-surface-dark/60 border border-quattro-border-dark text-white placeholder-quattro-text-secondary/50 focus:outline-none focus:border-quattro-accent transition-colors"
                autoComplete="name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 text-sm rounded-xl bg-quattro-surface-dark/60 border border-quattro-border-dark text-white placeholder-quattro-text-secondary/50 focus:outline-none focus:border-quattro-accent transition-colors"
                autoComplete="email"
              />
              {status === "error" && (
                <p className="text-quattro-error text-xs">{msg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-quattro-primary hover:bg-quattro-primary-light text-white font-display font-semibold rounded-xl transition-colors disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <LoadingSpinner size={16} /> Subscribing…
                  </>
                ) : (
                  <>
                    Subscribe <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
