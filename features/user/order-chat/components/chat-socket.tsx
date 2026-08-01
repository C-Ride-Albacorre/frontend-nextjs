'use client';

import { useChatSocket } from '@/hooks/use-chat-socket';

type Props = {
  orderId: string;
  accessToken?: string;
};

export default function ChatSocket({ orderId, accessToken }: Props) {
  useChatSocket(orderId, accessToken);

  return null;
}
