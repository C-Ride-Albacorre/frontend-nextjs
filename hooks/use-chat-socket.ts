'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import { useChatStore } from '@/store/chat-store';

const SOCKET_URL = 'https://backend-service-1rc7.onrender.com';

interface NewMessagePayload {
  orderId: string;
  message: any;
}

interface TypingPayload {
  userId: string;
  isTyping: boolean;
}

interface MessageReadPayload {
  messageId: string;
  userId: string;
}

interface MessageDeletedPayload {
  messageId: string;
  deletedBy: string;
}

interface MessageEditedPayload {
  messageId: string;
  newMessage: string;
  editedAt: string;
  editedBy: string;
}

interface ConnectedPayload {
  userId: string;
  role: string;
  status: string;
}

export function useChatSocket(orderId?: string, accessToken?: string) {
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const setSocket = useChatStore((state) => state.setSocket);

  const setConnected = useChatStore((state) => state.setConnected);

  const addMessage = useChatStore((state) => state.addMessage);

  const setTyping = useChatStore((state) => state.setTyping);

  const clearTyping = useChatStore((state) => state.clearTyping);

  const markMessageRead = useChatStore((state) => state.markMessageRead);

  const deleteMessage = useChatStore((state) => state.deleteMessage);

  const editMessage = useChatStore((state) => state.editMessage);

  useEffect(() => {
    if (!orderId) {
      console.warn('[ChatSocket] Missing orderId');
      return;
    }

    if (!accessToken) {
      console.warn('[ChatSocket] Missing token');
      return;
    }

    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
    }

    const socket = io(`${SOCKET_URL}/chat`, {
      transports: ['websocket'],

      auth: {
        token: accessToken,
      },

      reconnection: true,

      reconnectionAttempts: Infinity,

      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    setSocket(socket);

    const joinRoom = () => {
      console.log('Joining chat room:', orderId);

socket.emit('join-chat', orderId);
    };

    socket.on('connect', () => {
      console.log('Chat socket connected:', socket.id);

      setConnected(true);

      joinRoom();
    });

    socket.io.on('reconnect', () => {
      console.log('Chat socket reconnecting');

      joinRoom();
    });

    /**
     * Server confirms joined
     */
    socket.on('joined', (payload) => {
      console.log('Joined chat:', payload);
    });

    /**
     * New message
     */

    socket.on('new-message', (payload: NewMessagePayload) => {
      console.log('new-message', payload);

      if (payload.orderId !== orderId) {
        return;
      }

      addMessage(payload.message);
    });

    /**
     * Typing indicator
     */

    socket.on('user-typing', (payload: TypingPayload) => {
      setTyping(payload.userId, payload.isTyping);

      // Clear any existing timeout for this user
      const existingTimeout = typingTimeoutRef.current.get(payload.userId);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      // If user is typing, set a timeout to auto-clear after 3 seconds
      if (payload.isTyping) {
        const timeout = setTimeout(() => {
          clearTyping(payload.userId);
          typingTimeoutRef.current.delete(payload.userId);
        }, 3000);

        typingTimeoutRef.current.set(payload.userId, timeout);
      } else {
        // User explicitly stopped typing
        typingTimeoutRef.current.delete(payload.userId);
      }
    });

    /**
     * Read receipt
     */

    socket.on('message-read', (payload: MessageReadPayload) => {
      markMessageRead(payload.messageId);
    });

    /**
     * Delete
     */

    socket.on('message-deleted', (payload: MessageDeletedPayload) => {
      deleteMessage(payload.messageId);
    });

    /**
     * Edit
     */

    socket.on('message-edited', (payload: MessageEditedPayload) => {
      editMessage(payload.messageId, {
        message: payload.newMessage,

        editedAt: payload.editedAt,
      });
    });

    /**
     * Connected user
     */

    socket.on('connected', (payload: ConnectedPayload) => {
      console.log('chat connected user', payload);
    });

    socket.onAny((event, ...args) => {
      console.log('CHAT EVENT:', event, args);
    });

    socket.onAny((event, payload) => {
      console.log('CUSTOMER EVENT', event, payload);
    });

    socket.on('connect_error', (error) => {
      console.error('Chat socket error', error);
    });

    return () => {
      console.log('Closing chat socket');

      // Clear all typing timeouts
      typingTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      typingTimeoutRef.current.clear();

      socket.removeAllListeners();

      socket.disconnect();

      socketRef.current = null;

      setConnected(false);

      setSocket(null);
    };
  }, [
    orderId,
    accessToken,
    setSocket,
    setConnected,
    addMessage,
    setTyping,
    clearTyping,
    markMessageRead,
    deleteMessage,
    editMessage,
  ]);

  return {
    socket: socketRef.current,
  };
}
