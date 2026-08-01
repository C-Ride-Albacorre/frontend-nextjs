'use client';

import { create } from 'zustand';
import { Socket } from 'socket.io-client';

import { ChatMessage } from '@/features/user/order-chat/types';

type TypingUser = {
  userId: string;
  isTyping: boolean;
};

type ChatState = {
  /**
   * Socket
   */
  socket: Socket | null;

  connected: boolean;

  /**
   * Messages
   */
  messages: ChatMessage[];

  /**
   * Typing
   */
  typingUsers: TypingUser[];

  /**
   * Socket
   */
  setSocket: (socket: Socket | null) => void;

  setConnected: (value: boolean) => void;

  /**
   * Messages
   */

  setMessages: (messages: ChatMessage[]) => void;

  addMessage: (message: ChatMessage) => void;

  updateMessage: (messageId: string, payload: Partial<ChatMessage>) => void;

  editMessage: (messageId: string, payload: Partial<ChatMessage>) => void;

  deleteMessage: (messageId: string) => void;

  markMessageRead: (messageId: string) => void;

  /**
   * Typing
   */

  setTyping: (userId: string, isTyping: boolean) => void;

  clearTyping: (userId: string) => void;

  clearChat: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  socket: null,

  connected: false,

  messages: [],

  typingUsers: [],

  setSocket: (socket) =>
    set({
      socket,
    }),

  setConnected: (connected) =>
    set({
      connected,
    }),

  setMessages: (messages) =>
    set({
      messages,
    }),

  addMessage: (message) =>
    set((state) => {
      const exists = state.messages.some((item) => item.id === message.id);

      if (exists) {
        return state;
      }

      return {
        messages: [...state.messages, message],
      };
    }),

  updateMessage: (messageId, payload) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              ...payload,
            }
          : message,
      ),
    })),

  editMessage: (messageId, payload) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              ...payload,
            }
          : message,
      ),
    })),

deleteMessage: (messageId) =>
  set((state) => ({
    messages: state.messages.map((message) =>
      message.id === messageId
        ? {
            ...message,
            deletedAt: new Date().toISOString(),
          }
        : message,
    ),
  })),

  markMessageRead: (messageId) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              isRead: true,
            }
          : message,
      ),
    })),

  setTyping: (userId, isTyping) =>
    set((state) => {
      const filtered = state.typingUsers.filter(
        (user) => user.userId !== userId,
      );

      return {
        typingUsers: isTyping
          ? [
              ...filtered,
              {
                userId,
                isTyping: true,
              },
            ]
          : filtered,
      };
    }),

  clearTyping: (userId) =>
    set((state) => ({
      typingUsers: state.typingUsers.filter((user) => user.userId !== userId),
    })),

  clearChat: () =>
    set({
      messages: [],

      typingUsers: [],

      connected: false,

      socket: null,
    }),
}));
