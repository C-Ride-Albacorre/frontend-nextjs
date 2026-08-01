'use client';

import { Check, CheckCheck } from 'lucide-react';
import { formatDate } from '@/helpers/date-formatter';
import { ChatMessage } from '../types';

type Props = {
  message: ChatMessage;
};

export default function ChatBubble({ message }: Props) {
  const isMine = message.senderRole === 'CUSTOMER';

  const deleted = !!message.deletedAt;

  return (
    <div
      className={`
        flex w-full
        ${isMine ? 'justify-end' : 'justify-start'}
      `}
    >
      <div
        className={`
          max-w-[78%]
          group
        `}
      >
        <div
          className={`
            px-4
            py-3
            rounded-2xl
  

            ${
              isMine
                ? `
              bg-primary
              text-primary-text-100
              rounded-br-md
              `
                : `
              bg-white 
              text-foreground
              rounded-bl-md
              border
              border-border
              `
            }
          `}
        >
          {deleted ? (
            <p
              className="
              italic
              text-sm
              opacity-60
            "
            >
              Message deleted
            </p>
          ) : message.type === 'IMAGE' ? (
            <img
              src={message.message}
              className="
                rounded-xl
                max-w-70
              "
            />
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

          <div
            className={`
              mt-2
              flex
              justify-end
              items-center
              gap-1
              text-[11px]

              ${isMine ? 'text-neutral-500' : 'text-neutral-400'}
            `}
          >
            <span>{formatDate(message.createdAt)}</span>

            {message.editedAt && <span>edited</span>}

            {isMine &&
              (message.isRead ? (
                <CheckCheck size={14} className="text-sky-300" />
              ) : (
                <Check size={14} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
