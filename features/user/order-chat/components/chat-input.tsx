'use client';

import { useState, useEffect } from 'react';

import { Send } from 'lucide-react';

import { Button } from '@/components/ui/buttons/button';
import { useChatStore } from '@/store/chat-store';
import { ChatMessage } from '../types';
import Input from '@/components/ui/inputs/input';

type Props = {
  orderId: string;
};

export default function ChatInput({ orderId }: Props) {
  const socket = useChatStore((state) => state.socket);

  const [message, setMessage] = useState('');

  const [typing, setTyping] = useState(false);

  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    if (!socket) return;

    const timeout = setTimeout(() => {
      if (typing) {
        socket.emit('typing', {
          orderId,
          isTyping: false,
        });

        setTyping(false);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [message, typing, socket, orderId]);

  function handleTyping(value: string) {
    setMessage(value);

    if (!socket) return;

    if (!typing) {
      setTyping(true);

      socket.emit('typing', {
        orderId,
        isTyping: true,
      });
    }
  }

  function sendMessage() {
    const trimmed = message.trim();

    if (!trimmed || !socket) {
      return;
    }

    const tempMessage: ChatMessage = {
      id: crypto.randomUUID(),

      orderId,

      senderId: 'customer',

      senderRole: 'CUSTOMER',

      message: trimmed,

      type: 'TEXT',

      createdAt: new Date().toISOString(),

      isRead: false,

      deletedAt: null,

      editedAt: null,
    };

    // show instantly
    addMessage(tempMessage);

    // send to server
    socket.emit('send-message', {
      orderId,
      message: trimmed,
      type: 'TEXT',
    });

    setMessage('');

    socket.emit('typing', {
      orderId,
      isTyping: false,
    });

    setTyping(false);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();

      sendMessage();
    }
  }

  return (
    <div
      className="
        border-t
        border-border
  px-6

      pt-5
        pb-5
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <></>

      <Input
        value={message}
        onChange={(event) => handleTyping(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message... "
        spacing="none"
      />

      <Button
        size="icon"
        variant="black"
        onClick={sendMessage}
        disabled={!message.trim()}
      >
        <Send size={20} />
      </Button>
    </div>
  );
}
