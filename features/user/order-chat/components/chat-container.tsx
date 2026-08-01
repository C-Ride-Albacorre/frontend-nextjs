'use client';

import { useEffect } from 'react';
import ChatMessageList from './chat-message-list';

import Card from '@/components/layout/card';

import { useChatStore } from '@/store/chat-store';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import { ChatMessage } from '../types';
import TypingIndicator from './typing-indicator';

type Props = {
  orderId: string;
  initialMessages: ChatMessage[];
  orderData: any; // Replace 'any' with the appropriate type for orderData
};

export default function ChatContainer({
  orderId,
  initialMessages,
  orderData,
}: Props) {
  const messages = useChatStore((state) => state.messages);

  const setMessages = useChatStore((state) => state.setMessages);

  const typingUsers = useChatStore((state) => state.typingUsers);

  console.log('typingUsers', typingUsers);

  const isTyping = typingUsers.length > 0;

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, setMessages]);

  return (
    <Card
      spacing="none"
      gap="none"
      className="
        bg-white
        overflow-hidden
        flex
        flex-col
        h-175
      "
    >
      {/* status */}

      <ChatHeader orderId={orderId} driver={orderData.driver} />
      {/* messages */}

      <div
        className="
           flex-1
    overflow-hidden
    bg-foreground-200
    py-4
    px-6
    relative
        "
      >
        <ChatMessageList messages={messages} />

        {typingUsers.length > 0 && <TypingIndicator />}
      </div>

      {/* input */}

      <ChatInput orderId={orderId} />
    </Card>
  );
}
