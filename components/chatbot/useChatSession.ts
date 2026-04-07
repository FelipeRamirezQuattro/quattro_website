"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage, ChatSession } from "@/types/chat";
import {
  sendChatMessage,
  submitChatLead,
  generateSessionId,
  buildConversationSummary,
} from "@/lib/chatApi";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `Hi there! 👋 Welcome to **Quattro Software**.\n\nI can answer questions about our services, process, and pricing. How can I help you today?`,
  source: "system",
  timestamp: new Date(),
  showContactForm: false,
};

function buildInitialSession(): ChatSession {
  return {
    sessionId: generateSessionId(),
    messages: [WELCOME_MESSAGE],
    isOpen: false,
    isTyping: false,
    leadSubmitted: false,
  };
}

export function useChatSession() {
  const [session, setSession] = useState<ChatSession>(buildInitialSession);
  // Keep a ref so async callbacks always read the latest state without stale closures
  const sessionRef = useRef(session);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const toggleChat = useCallback(() => {
    setSession((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const closeChat = useCallback(() => {
    setSession((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: userText.trim(),
      timestamp: new Date(),
    };

    setSession((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    try {
      const current = sessionRef.current;
      const history = current.messages
        .filter((m) => m.role !== "system" && m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await sendChatMessage({
        message: userText.trim(),
        sessionId: current.sessionId,
        conversationHistory: history,
      });

      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: response.response,
        source: response.source,
        timestamp: new Date(),
        showContactForm: response.showContactForm && !current.leadSubmitted,
        formSubmitted: false,
      };

      setSession((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isTyping: false,
      }));
    } catch {
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: `Sorry, I'm having trouble connecting right now. Please reach us directly:\n\n📞 **+1 (432) 363-4009**\n\n🌐 [Contact page](/contact)`,
        source: "system",
        timestamp: new Date(),
        showContactForm: false,
      };
      setSession((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false,
      }));
    }
  }, []);

  const markFormSubmitted = useCallback((messageId: string) => {
    setSession((prev) => ({
      ...prev,
      leadSubmitted: true,
      messages: prev.messages.map((m) =>
        m.id === messageId
          ? { ...m, formSubmitted: true, showContactForm: false }
          : m,
      ),
    }));
  }, []);

  const getConversationSummary = useCallback(() => {
    return buildConversationSummary(sessionRef.current.messages);
  }, []);

  return {
    session,
    toggleChat,
    closeChat,
    sendMessage,
    markFormSubmitted,
    getConversationSummary,
  };
}
