export type MessageRole = "user" | "assistant" | "system";
export type MessageSource = "faq" | "openai" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  source?: MessageSource;
  timestamp: Date;
  showContactForm?: boolean;
  /** Tracks if the inline form after this message was already submitted */
  formSubmitted?: boolean;
}

export interface ChatLead {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  sessionId: string;
  conversationSummary: string;
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  /** True once the user submits the inline form anywhere in the session */
  leadSubmitted: boolean;
}
