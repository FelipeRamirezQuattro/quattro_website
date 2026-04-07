"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitChatLead } from "@/lib/chatApi";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(5, "Please tell us a bit more"),
});

type FormValues = z.infer<typeof schema>;

const SERVICE_OPTIONS = [
  "AI Solutions & Automation",
  "Custom Application Development",
  "Modern Website Design",
  "QuickBooks Integration",
  "Microsoft Power Apps",
  "Staffing Solutions",
  "Other / Not Sure Yet",
];

interface Props {
  messageId: string;
  sessionId: string;
  getConversationSummary: () => string;
  onSubmitted: (messageId: string) => void;
}

const inputStyle: React.CSSProperties = {
  background: "rgb(8, 15, 30)",
  border: "1px solid rgba(23, 84, 154, 0.4)",
  color: "rgb(220, 232, 248)",
  fontFamily: "DM Sans, sans-serif",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

function focusStyle(
  e: React.FocusEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
) {
  e.target.style.borderColor = "rgb(56, 189, 248)";
  e.target.style.boxShadow = "0 0 0 3px rgba(56, 189, 248, 0.1)";
}

function blurStyle(
  e: React.FocusEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
) {
  e.target.style.borderColor = "rgba(23, 84, 154, 0.4)";
  e.target.style.boxShadow = "none";
}

export default function ChatContactForm({
  messageId,
  sessionId,
  getConversationSummary,
  onSubmitted,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      await submitChatLead({
        ...data,
        sessionId,
        conversationSummary: getConversationSummary(),
        phone: data.phone || undefined,
        company: data.company || undefined,
        service: data.service || undefined,
      });
      onSubmitted(messageId);
    } catch {
      setError(
        "Could not send — please try again or call us at +1 (432) 363-4009.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-3 py-2 rounded-lg text-sm outline-none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="mt-3 rounded-xl p-3"
      style={{
        background: "rgb(8, 15, 30)",
        border: "1px solid rgba(23, 84, 154, 0.3)",
      }}
    >
      <p
        className="text-xs font-semibold mb-3 uppercase tracking-wider"
        style={{
          color: "rgb(56, 189, 248)",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        💬 Get in Touch — Free Consultation
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" noValidate>
        <div>
          <input
            {...register("name")}
            placeholder="Your name *"
            className={inputCls}
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          {errors.name && (
            <p className="text-xs mt-1" style={{ color: "rgb(239, 68, 68)" }}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email address *"
            className={inputCls}
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          {errors.email && (
            <p className="text-xs mt-1" style={{ color: "rgb(239, 68, 68)" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            {...register("phone")}
            placeholder="Phone (optional)"
            className={inputCls}
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
          <input
            {...register("company")}
            placeholder="Company (optional)"
            className={inputCls}
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>

        <div>
          <select
            {...register("service")}
            className={inputCls}
            style={{ ...inputStyle, cursor: "pointer" }}
            defaultValue=""
            onFocus={focusStyle}
            onBlur={blurStyle}
          >
            <option value="" disabled style={{ background: "rgb(8, 15, 30)" }}>
              Service interested in...
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option
                key={opt}
                value={opt}
                style={{ background: "rgb(12, 22, 45)" }}
              >
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <textarea
            {...register("message")}
            placeholder="Tell us about your project or question *"
            rows={3}
            className={inputCls}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={focusStyle as React.FocusEventHandler<HTMLTextAreaElement>}
            onBlur={blurStyle as React.FocusEventHandler<HTMLTextAreaElement>}
          />
          {errors.message && (
            <p className="text-xs mt-1" style={{ color: "rgb(239, 68, 68)" }}>
              {errors.message.message}
            </p>
          )}
        </div>

        {error && (
          <p
            className="text-xs px-2 py-1.5 rounded-lg"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              color: "rgb(239, 68, 68)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: loading
              ? "rgba(23, 84, 154, 0.5)"
              : "linear-gradient(135deg, rgb(23, 84, 154), rgb(41, 112, 196))",
            color: "white",
            fontFamily: "DM Sans, sans-serif",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message — Free Consultation →"
          )}
        </motion.button>

        <p
          className="text-center text-xs"
          style={{ color: "rgba(148, 172, 209, 0.5)" }}
        >
          We reply within 1 business day. No spam, ever.
        </p>
      </form>
    </motion.div>
  );
}
