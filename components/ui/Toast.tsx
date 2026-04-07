"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

export default function Toast({ message, type, onDismiss }: ToastProps) {
  const isSuccess = type === "success";
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`
          fixed bottom-6 right-6 z-[100] flex items-center gap-3
          px-5 py-4 rounded-2xl shadow-2xl max-w-sm
          ${
            isSuccess
              ? "bg-green-900/90 border border-green-500/30 text-green-100"
              : "bg-red-900/90 border border-red-500/30 text-red-100"
          }
        `}
        style={{ backdropFilter: "blur(12px)" }}
      >
        {isSuccess ? (
          <CheckCircle size={20} className="text-green-400 shrink-0" />
        ) : (
          <XCircle size={20} className="text-red-400 shrink-0" />
        )}
        <p className="text-sm font-body">{message}</p>
        <button
          onClick={onDismiss}
          className="ml-auto text-current/60 hover:text-current transition-colors"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
