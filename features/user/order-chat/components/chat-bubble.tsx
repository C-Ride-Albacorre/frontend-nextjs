'use client';

import { useState } from 'react';
import { Pencil, Trash2, MoreVertical } from 'lucide-react';

import { ChatMessage } from '../types';
import { formatDate } from '@/helpers/date-formatter';
import { useChatStore } from '@/store/chat-store';
import Textarea from '@/components/ui/inputs/textarea';

type Props = {
  message: ChatMessage;
  orderId: string;
};

export default function ChatBubble({ message, orderId }: Props) {
  const socket = useChatStore((state) => state.socket);

  const updateMessage = useChatStore((state) => state.updateMessage);

  const deleteMessageFromStore = useChatStore((state) => state.deleteMessage);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(message.message);

  const isMine = message.senderRole === 'CUSTOMER';

  function saveEdit() {
    if (!value.trim()) return;

    updateMessage(message.id, {
      message: value,
      editedAt: new Date().toISOString(),
    });

    if (!socket) {
      console.warn('Socket not connected');
      return;
    }

    socket.emit(
      'edit-message',
      {
        orderId,
        messageId: message.id,
        newMessage: value.trim(),
      },
      (error?: any) => {
        if (error) console.error('Edit failed:', error);
        else console.log('Edit sent successfully');
      },
    );

    setEditing(false);
  }

  function deleteMessage() {
    // Update local state immediately for instant feedback
    deleteMessageFromStore(message.id);

    if (!socket) {
      console.warn('Socket not connected');
      setOpen(false);
      return;
    }

    // Notify backend
    socket.emit(
      'delete-message',
      {
        orderId,
        messageId: message.id,
      },
      (error?: any) => {
        if (error) console.error('Delete failed:', error);
        else console.log('Delete sent successfully');
      },
    );

    setOpen(false);
  }

  return (
    <div
      className={`
        flex
        w-full
        group
        ${isMine ? 'justify-end' : 'justify-start'}
      `}
    >
      <div
        className={`
          relative
          max-w-[75%]
          rounded-2xl
          px-4
          py-3

          ${
            isMine
              ? 'bg-primary text-primary-text-100 rounded-br-md'
              : 'bg-white text-neutral-800 rounded-bl-md'
          }
        `}
      >
        {isMine && (
          <button
            onClick={() => setOpen(!open)}
            className="
              absolute
              -top-3
              right-2
              opacity-0
              group-hover:opacity-100
              transition
              bg-white
              text-neutral-500
              shadow
              rounded-full
              p-1
            "
          >
            <MoreVertical size={14} />
          </button>
        )}

        {open && (
          <div
            className="
              absolute
              right-0
              top-8
              z-50
              bg-white
              rounded-xl
              shadow-xl
              border
              border-border
              p-2
              text-neutral-700
            "
          >
            <button
              onClick={() => {
                setEditing(true);
                setOpen(false);
              }}
              className="
                flex
                items-center
                gap-2
                px-3
                py-2
                text-xs
                hover:bg-neutral-100
                rounded-lg
                w-full
                cursor-pointer
              "
            >
              <Pencil size={12} />
              Edit
            </button>

            <button
              onClick={deleteMessage}
              className="
                flex
                items-center
                gap-2
                px-3
                py-2
                text-xs
                text-red-500
                hover:bg-red-50
                rounded-lg
                w-full
                cursor-pointer
              "
            >
              <Trash2 size={12} />
              Delete
            </button>
          </div>
        )}

        {editing ? (
          <div className="space-y-2">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="
                w-full
                rounded-lg
                bg-foreground-200
                text-black
                p-2
                focus:outline-none
                focus:ring-2
                focus:ring-primary
                focus:border-transparent
                text-sm
              "
              rows={3}
              placeholder="Edit your message..."
            />

            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                className="
                  text-xs
                  bg-black
                  text-white
                  px-3
                  py-1
                  rounded-lg
                "
              >
                Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="
                  text-xs
                  text-neutral-500
                "
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="
              text-xs
              leading-6
              whitespace-pre-wrap
            "
          >
    {message.deletedAt ? (
  <p className="italic text-sm opacity-60">
    Message deleted
  </p>
) : message.type === 'IMAGE' ? (
  <img
    src={message.message}
    alt="Chat image"
    className="
      rounded-xl
      max-w-72
      max-h-80
      object-cover
    "
  />
) : editing ? (
  <div className="space-y-2">
    <Textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={3}
      placeholder="Edit your message..."
    />

    <div className="flex gap-2">
      <button
        onClick={saveEdit}
        className="rounded-lg bg-black px-3 py-1 text-xs text-white"
      >
        Save
      </button>

      <button
        onClick={() => {
          setEditing(false);
          setValue(message.message);
        }}
        className="text-xs text-neutral-500"
      >
        Cancel
      </button>
    </div>
  </div>
) : (
  <p
    className="
      text-sm
      leading-6
      whitespace-pre-wrap
    "
  >
    {message.message}
  </p>
)}
          </div>
        )}

        <div
          className="
            flex
            justify-end
            gap-2
            mt-2
            text-[11px]
            opacity-60
          "
        >
          {formatDate(message.createdAt)}

          {message.editedAt && <span>edited</span>}
        </div>
      </div>
    </div>
  );
}
