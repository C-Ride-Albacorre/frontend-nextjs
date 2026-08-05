'use client';

import { useState, useEffect, useRef } from 'react';

import { Send, Image as ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/buttons/button';
import { useChatStore } from '@/store/chat-store';
import Input from '@/components/ui/inputs/input';
import ImagePreviewModal from './image-preview-modal';
import { IconButton } from '@/components/ui/buttons/icon-button';

type Props = {
  orderId: string;
  onSendQuickMessage?: (message: string) => void;
};

export default function ChatInput({ orderId }: Props) {
  const socket = useChatStore((state) => state.socket);

  const [message, setMessage] = useState('');

  const [typing, setTyping] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [sendingImage, setSendingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // send to server - wait for server echo instead of showing temp message
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

  function sendQuickMessage(quickMessage: string) {
    if (!socket) {
      return;
    }

    // send to server
    socket.emit('send-message', {
      orderId,
      message: quickMessage,
      type: 'TEXT',
    });

    socket.emit('typing', {
      orderId,
      isTyping: false,
    });

    setTyping(false);
  }

  function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function sendImage() {
    if (!selectedFile || !socket) return;

    setSendingImage(true);

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;

      socket.emit('send-message', {
        orderId,
        message: base64,
        type: 'IMAGE',
      });

      // Clear preview
      setImagePreview(null);
      setSelectedFile(null);
      setSendingImage(false);
    };
    reader.readAsDataURL(selectedFile);
  }

  function cancelImagePreview() {
    setImagePreview(null);
    setSelectedFile(null);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();

      sendMessage();
    }
  }

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Image preview modal */}
      {imagePreview && (
        <ImagePreviewModal
          imageUrl={imagePreview}
          onConfirm={sendImage}
          onCancel={cancelImagePreview}
          isLoading={sendingImage}
        />
      )}

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
        <IconButton
          onClick={() => fileInputRef.current?.click()}
          className="
            p-2
            hover:bg-neutral-100
            rounded-lg
            transition
            text-neutral-600
          "
          title="Upload image"
          variant='white'
        >
          <ImageIcon size={20} />
        </IconButton>

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
    </div>
  );
}
