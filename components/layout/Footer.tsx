"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  Phone,
  Globe,
  MessageCircle,
  PlayCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import { navItems } from "@/data/nav";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Subscribed! Welcome aboard.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const quickLinks = navItems.filter((n) => !n.children);
  const serviceLinks =
    navItems.find((n) => n.label === "Services")?.children ?? [];

  return (
    <footer className="bg-quattro-surface-mid border-t border-quattro-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="font-display font-bold text-xl text-white">
                QUATTRO
              </span>
              <span className="font-body font-light text-sm text-quattro-text-secondary tracking-widest uppercase ml-1">
                SOFTWARE
              </span>
            </Link>
            <p className="text-quattro-text-secondary text-sm leading-relaxed mb-6">
              Turning your ideas into powerful custom software solutions that
              drive your business forward.
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  href: "https://www.facebook.com/quattroapps",
                  Icon: MessageCircle,
                  label: "Facebook",
                },
                {
                  href: "https://www.youtube.com/@QuattroSoftware",
                  Icon: PlayCircle,
                  label: "YouTube",
                },
                {
                  href: "https://www.linkedin.com/company/quattro-apps/",
                  Icon: Users,
                  label: "LinkedIn",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-quattro-surface-dark border border-quattro-border-dark flex items-center justify-center text-quattro-text-secondary hover:text-quattro-accent hover:border-quattro-accent/50 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <p className="text-quattro-text-secondary text-xs mt-6 opacity-60">
              © {new Date().getFullYear()} Quattro Software. All rights
              reserved.
            </p>
          </div>

          {/* Col 2 — Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Pages
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-quattro-text-secondary text-sm hover:text-quattro-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/work-with-us"
                    className="text-quattro-text-secondary text-sm hover:text-quattro-accent transition-colors"
                  >
                    Work With Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-quattro-text-secondary text-sm hover:text-quattro-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3 — Contact + Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3 mb-8">
              <a
                href="tel:+14323634009"
                className="flex items-center gap-2 text-quattro-text-secondary text-sm hover:text-quattro-accent transition-colors"
              >
                <Phone size={14} /> (432) 363-4009
              </a>
              <a
                href="https://support.quattroapps.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-quattro-text-secondary text-sm hover:text-quattro-accent transition-colors"
              >
                <Globe size={14} /> support.quattroapps.app
              </a>
            </div>

            <h4 className="font-display font-semibold text-white text-sm mb-3 uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-quattro-text-secondary text-xs mb-3">
              Stay ahead of the tech curve. No spam, ever.
            </p>
            {status === "success" ? (
              <p className="text-quattro-success text-sm">{message}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 min-w-0 px-3 py-2 text-sm bg-quattro-surface-dark border border-quattro-border-dark rounded-lg text-white placeholder-quattro-text-secondary/50 focus:outline-none focus:border-quattro-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label="Subscribe"
                  className="px-3 py-2 bg-quattro-primary hover:bg-quattro-primary-light text-white rounded-lg transition-colors disabled:opacity-60 shrink-0"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-quattro-error text-xs mt-2">{message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-quattro-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-quattro-text-secondary/60">
          <span>
            © {new Date().getFullYear()} Quattro Software. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-quattro-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-quattro-accent transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
