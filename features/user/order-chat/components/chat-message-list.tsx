'use client';

import { useEffect, useRef } from 'react';

import { ChatMessage } from '../types';
import ChatBubble from './chat-bubble';
import { useChatStore } from '@/store/chat-store';

type Props = {
  messages: ChatMessage[];
  orderId: string;
};

export default function ChatMessageList({ messages, orderId }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const socket = useChatStore((state) => state.socket);

  const markMessageRead = useChatStore((state) => state.markMessageRead);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages.length]);

  // Track message visibility for read receipts
  useEffect(() => {
    if (!socket) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute('data-message-id');
            const isFromDriver =
              entry.target.getAttribute('data-from-driver') === 'true';

            // Only mark driver messages as read
            if (messageId && isFromDriver) {
              // Mark as read in local state
              markMessageRead(messageId);

              // Notify server
              socket.emit('mark-read', {
                orderId,
                messageId,
              });
            }
          }
        });
      },
      {
        threshold: 0.5, // Message is 50% visible
      },
    );

    // Observe all messages
    const messageElements = document.querySelectorAll('[data-message-id]');
    messageElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [socket, orderId, markMessageRead, messages]);

  return (
    <div
      className="
        h-full
        overflow-y-auto
      "
    >
      <div
        className="
          min-h-full
          flex
          flex-col
          justify-end
          gap-4
          py-4
        "
      >
        {messages.length === 0 ? (
          <div
            className="
              flex
              flex-1
              items-center
              justify-center
              text-sm
              text-neutral-500
            "
          >
            No messages yet
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              data-message-id={message.id}
              data-from-driver={message.senderRole === 'DRIVER'}
            >
              <ChatBubble message={message} orderId={orderId} />
            </div>
          ))
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
