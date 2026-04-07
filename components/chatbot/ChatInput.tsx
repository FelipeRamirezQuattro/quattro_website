"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onSend: (message: string) => void;
  isTyping: boolean;
}

export default function ChatInput({ onSend, isTyping }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for quick-reply chip events dispatched by ChatMessages
  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      if (!e.detail?.trim()) return;
      onSend(e.detail);
      setValue("");
    };
    window.addEventListener("quattro-chat-send", handler as EventListener);
    return () =>
      window.removeEventListener("quattro-chat-send", handler as EventListener);
  }, [onSend]);

  const handleSend = () => {
    if (!value.trim() || isTyping) return;
    onSend(value.trim());
    setValue("");
  };

  const canSend = value.trim().length > 0 && !isTyping;

  return (
    <div
      className="px-3 py-3 flex items-center gap-2 flex-shrink-0"
      style={{
        borderTop: "1px solid rgba(23, 84, 154, 0.2)",
        background: "rgb(8, 15, 30)",
      }}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        placeholder="Ask about our services..."
        disabled={isTyping}
        className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
        style={{
          background: "rgb(12, 22, 45)",
          border: "1px solid rgba(23, 84, 154, 0.3)",
          color: "rgb(220, 232, 248)",
          fontFamily: "DM Sans, sans-serif",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgb(56, 189, 248)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(23, 84, 154, 0.3)";
        }}
      />
      <motion.button
        onClick={handleSend}
        disabled={!canSend}
        whileHover={{ scale: canSend ? 1.08 : 1 }}
        whileTap={{ scale: canSend ? 0.92 : 1 }}
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
        style={{
          background: canSend
            ? "linear-gradient(135deg, rgb(23, 84, 154), rgb(41, 112, 196))"
            : "rgba(23, 84, 154, 0.2)",
          cursor: canSend ? "pointer" : "not-allowed",
        }}
        aria-label="Send message"
      >
        <Send className="w-4 h-4 text-white" />
      </motion.button>
    </div>
  );
}
