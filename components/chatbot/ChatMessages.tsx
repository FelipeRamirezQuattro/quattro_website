"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/types/chat";
import ChatContactForm from "./ChatContactForm";
import ChatTypingIndicator from "./ChatTypingIndicator";

const QUICK_REPLIES = [
  "What services do you offer?",
  "Tell me about AI automation",
  "How much does it cost?",
  "I want a free consultation",
];

const mdComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong style={{ color: "rgb(56, 189, 248)", fontWeight: 600 }}>
      {children}
    </strong>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "rgb(56, 189, 248)",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
      }}
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="space-y-1 my-2 pl-4 list-disc">{children}</ul>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
};

interface Props {
  messages: ChatMessage[];
  isTyping: boolean;
  leadSubmitted: boolean;
  sessionId: string;
  getConversationSummary: () => string;
  onMarkFormSubmitted: (messageId: string) => void;
}

export default function ChatMessages({
  messages,
  isTyping,
  leadSubmitted,
  sessionId,
  getConversationSummary,
  onMarkFormSubmitted,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const dispatchQuickReply = (text: string) => {
    window.dispatchEvent(
      new CustomEvent<string>("quattro-chat-send", { detail: text }),
    );
  };

  const showQuickReplies = messages.length === 1;

  return (
    <div
      className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(23,84,154,0.4) transparent",
      }}
      aria-live="polite"
      aria-label="Chat messages"
    >
      <AnimatePresence initial={false}>
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[88%] ${isUser ? "" : "w-full"}`}>
                {/* Avatar for assistant */}
                {!isUser && (
                  <div className="flex items-start gap-2">
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(23, 84, 154), rgb(41, 112, 196))",
                        color: "white",
                        fontFamily: "Syne, sans-serif",
                      }}
                      aria-hidden="true"
                    >
                      Q
                    </div>
                    <div
                      className="rounded-2xl rounded-tl-sm px-3 py-3 text-sm leading-relaxed flex-1"
                      style={{
                        background: "rgb(12, 22, 45)",
                        border: "1px solid rgba(23, 84, 154, 0.3)",
                        color: "rgb(220, 232, 248)",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={mdComponents}
                      >
                        {msg.content}
                      </ReactMarkdown>

                      {/* Inline contact form */}
                      {msg.showContactForm && !leadSubmitted && (
                        <>
                          {msg.formSubmitted ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-3 rounded-xl px-4 py-3 text-sm"
                              style={{
                                background: "rgba(34, 197, 94, 0.1)",
                                border: "1px solid rgba(34, 197, 94, 0.35)",
                                color: "rgb(134, 239, 172)",
                              }}
                            >
                              ✅ <strong>Message sent!</strong> We&apos;ll reach
                              out within 1 business day.
                            </motion.div>
                          ) : (
                            <ChatContactForm
                              messageId={msg.id}
                              sessionId={sessionId}
                              getConversationSummary={getConversationSummary}
                              onSubmitted={onMarkFormSubmitted}
                            />
                          )}
                        </>
                      )}

                      {/* Show confirmation if form already submitted elsewhere */}
                      {msg.showContactForm &&
                        leadSubmitted &&
                        !msg.formSubmitted && (
                          <div
                            className="mt-2 text-sm"
                            style={{ color: "rgb(134, 239, 172)" }}
                          >
                            ✅ Your info is already on the way — we&apos;ll be
                            in touch!
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* User bubble */}
                {isUser && (
                  <div
                    className="rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(23, 84, 154), rgb(41, 112, 196))",
                      color: "white",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    {msg.content}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Quick replies after welcome message */}
      {showQuickReplies && !isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.35 }}
          className="flex flex-wrap gap-2 pt-1"
        >
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              onClick={() => dispatchQuickReply(reply)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(23, 84, 154, 0.2)",
                border: "1px solid rgba(23, 84, 154, 0.5)",
                color: "rgb(56, 189, 248)",
                fontFamily: "DM Sans, sans-serif",
                cursor: "pointer",
              }}
            >
              {reply}
            </button>
          ))}
        </motion.div>
      )}

      {/* Typing indicator */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2"
          >
            <div
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background:
                  "linear-gradient(135deg, rgb(23, 84, 154), rgb(41, 112, 196))",
                color: "white",
                fontFamily: "Syne, sans-serif",
              }}
              aria-hidden="true"
            >
              Q
            </div>
            <div
              className="rounded-2xl rounded-tl-sm px-4 py-3"
              style={{
                background: "rgb(12, 22, 45)",
                border: "1px solid rgba(23, 84, 154, 0.3)",
              }}
            >
              <ChatTypingIndicator />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}
