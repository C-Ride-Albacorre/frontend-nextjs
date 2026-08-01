'use client';

import { useEffect, useRef } from 'react';

import { ChatMessage } from '../types';
import ChatBubble from './chat-bubble';
import { useChatStore } from '@/store/chat-store';
import TypingIndicator from './typing-indicator';

type Props = {
  messages: ChatMessage[];
};

export default function ChatMessageList({ messages }: Props) {
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

   relative
        space-y-4
      "
    >
      {messages.length === 0 ? (
        <div
          className="
              h-full
              flex
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
          <ChatBubble key={message.id} message={message} />
        ))
      )}

      {/* {isTyping && <TypingIndicator />} */}

      {/* scroll anchor */}

      <div ref={bottomRef} />
    </div>
  );
}
