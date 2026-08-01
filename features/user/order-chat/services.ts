import { BASE_URL } from '@/config/api';
import { authRequest } from '@/libs/api/auth-request';
import { ChatHistoryResponse, ChatMessage, ChatMessageType } from './types';


/* ----------------------------------------
 * GET CHAT HISTORY
 * -------------------------------------- */

export async function getChatHistoryService({
  orderId,
}: {
  orderId: string;
}) {
  return await authRequest<ChatHistoryResponse>(
    `${BASE_URL}/chat/orders/${orderId}/messages`,
    {
      nextTags: [`chat-${orderId}`],
    },
  );
}

/* ----------------------------------------
 * SEND MESSAGE
 * -------------------------------------- */

export async function sendMessageService({
  orderId,
  message,
  type = 'TEXT',
}: {
  orderId: string;
  message: string;
  type?: ChatMessageType;
}) {
  return await authRequest<{
    status: string;
    statusCode: number;
    data: ChatMessage;
  }>(`${BASE_URL}/chat/orders/${orderId}/messages`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      message,
      type,
    }),
  });
}

/* ----------------------------------------
 * UPLOAD IMAGE
 * -------------------------------------- */

export async function uploadImageService({
  orderId,
  file,
}: {
  orderId: string;
  file: File;
}) {
  const formData = new FormData();

  formData.append('image', file);

  return await authRequest<{
    status: string;
    statusCode: number;
    data: ChatMessage;
  }>(`${BASE_URL}/chat/orders/${orderId}/images`, {
    method: 'POST',

    body: formData,
  });
}

/* ----------------------------------------
 * MARK READ
 * -------------------------------------- */

export async function markMessageReadService({
  messageId,
}: {
  messageId: string;
}) {
  return await authRequest(
    `${BASE_URL}/chat/messages/${messageId}/read`,
    {
      method: 'PATCH',
    },
  );
}

/* ----------------------------------------
 * DELETE MESSAGE
 * -------------------------------------- */

export async function deleteMessageService({
  messageId,
}: {
  messageId: string;
}) {
  return await authRequest(
    `${BASE_URL}/chat/messages/${messageId}`,
    {
      method: 'DELETE',
    },
  );
}

/* ----------------------------------------
 * EDIT MESSAGE
 * -------------------------------------- */

export async function editMessageService({
  messageId,
  newMessage,
}: {
  messageId: string;
  newMessage: string;
}) {
  return await authRequest(
    `${BASE_URL}/chat/messages/${messageId}`,
    {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        message: newMessage,
      }),
    },
  );
}