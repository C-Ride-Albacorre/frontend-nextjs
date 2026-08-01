export type ChatMessageType =
  | 'TEXT'
  | 'IMAGE';

export type SenderRole =
  | 'CUSTOMER'
  | 'DRIVER'
  | 'DISPATCHER'
  | 'VENDOR';


export type ChatMessage = {
  id: string;

  orderId: string;

  senderId: string;

  senderRole: 'CUSTOMER' | 'DRIVER';

  message: string;

  type: 'TEXT' | 'IMAGE';

  createdAt: string;

  editedAt?: string | null;

  deletedAt?: string | null;

  isRead?: boolean;
};

export interface ChatHistoryResponse {
  status: string;

  statusCode: number;

  timestamp: string;

  path: string;

  data: ChatMessage[];
}

/* ---------------- SOCKET EVENTS ---------------- */

export interface JoinChatPayload {
  orderId: string;
}

export interface SendMessagePayload {
  orderId: string;

  message: string;

  type: ChatMessageType;
}

export interface TypingPayload {
  orderId: string;

  isTyping: boolean;
}

export interface MarkReadPayload {
  orderId: string;

  messageId: string;
}

export interface DeleteMessagePayload {
  orderId: string;

  messageId: string;
}

export interface EditMessagePayload {
  orderId: string;

  messageId: string;

  newMessage: string;
}

/* ---------- SERVER EVENTS ---------- */

export interface NewMessageEvent {
  orderId: string;

  message: ChatMessage;
}

export interface UserTypingEvent {
  userId: string;

  isTyping: boolean;
}

export interface MessageReadEvent {
  messageId: string;

  userId: string;
}

export interface MessageDeletedEvent {
  messageId: string;

  deletedBy: string;
}

export interface MessageEditedEvent {
  messageId: string;

  newMessage: string;

  editedAt: string;

  editedBy: string;
}

export interface ConnectedEvent {
  userId: string;

  role: string;

  status: string;
}

export interface JoinedEvent {
  orderId: string;
}
