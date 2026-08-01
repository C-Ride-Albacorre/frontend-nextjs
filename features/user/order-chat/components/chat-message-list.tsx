'use client';

import { useEffect, useRef } from 'react';

import { ChatMessage } from '../types';
import ChatBubble from './chat-bubble';

type Props = {
  messages: ChatMessage[];
  orderId: string;
};

export default function ChatMessageList({
  messages,
  orderId,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages.length]);

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
            <ChatBubble
              key={message.id}
              message={message}
              orderId={orderId}
            />
          ))
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}