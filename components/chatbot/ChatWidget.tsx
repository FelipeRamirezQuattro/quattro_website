"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Minimize2 } from "lucide-react";
import { useChatSession } from "./useChatSession";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatWidget() {
  const {
    session,
    toggleChat,
    closeChat,
    sendMessage,
    markFormSubmitted,
    getConversationSummary,
  } = useChatSession();

  const { isOpen, isTyping, leadSubmitted } = session;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeChat();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeChat]);

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Quattro chat"
            className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{
              width: "min(440px, calc(100vw - 20px))",
              height: "min(680px, calc(100vh - 100px))",
              background: "rgb(8, 15, 30)",
              border: "1px solid rgba(23, 84, 154, 0.4)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(23,84,154,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 flex items-center justify-between px-4 py-3"
              style={{
                background:
                  "linear-gradient(135deg, rgb(10, 18, 36) 0%, rgb(14, 28, 56) 100%)",
                borderBottom: "1px solid rgba(23, 84, 154, 0.35)",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(23, 84, 154), rgb(41, 112, 196))",
                    color: "white",
                    fontFamily: "Syne, sans-serif",
                    boxShadow: "0 0 0 2px rgba(56, 189, 248, 0.2)",
                  }}
                >
                  Q
                </div>
                <div>
                  <p
                    className="text-sm font-semibold leading-none"
                    style={{
                      color: "rgb(220, 232, 248)",
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    Quattro AI Assistant
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "rgb(34, 197, 94)",
                        boxShadow: "0 0 4px rgb(34, 197, 94)",
                        animation:
                          "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs"
                      style={{
                        color: "rgb(134, 239, 172)",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    >
                      Online — typically replies instantly
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={closeChat}
                aria-label="Minimize chat"
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "rgba(148, 172, 209, 0.7)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgb(220, 232, 248)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(148, 172, 209, 0.7)")
                }
              >
                <Minimize2 size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <ChatMessages
              messages={session.messages}
              isTyping={isTyping}
              leadSubmitted={leadSubmitted}
              sessionId={session.sessionId}
              getConversationSummary={getConversationSummary}
              onMarkFormSubmitted={markFormSubmitted}
            />

            {/* Input */}
            <ChatInput isTyping={isTyping} onSend={sendMessage} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: isOpen
            ? "rgb(12, 22, 45)"
            : "linear-gradient(135deg, rgb(23, 84, 154), rgb(41, 112, 196))",
          border: isOpen
            ? "2px solid rgba(23,84,154,0.5)"
            : "2px solid rgba(56,189,248,0.2)",
          color: "white",
          cursor: "pointer",
        }}
        animate={
          isOpen
            ? { scale: 1 }
            : {
                boxShadow: [
                  "0 0 0 0 rgba(56,189,248,0)",
                  "0 0 0 10px rgba(56,189,248,0.12)",
                  "0 0 0 0 rgba(56,189,248,0)",
                ],
              }
        }
        transition={
          isOpen
            ? { duration: 0.2 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={22} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
