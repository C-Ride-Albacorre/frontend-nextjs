import EmptyState from '@/components/layout/empty-state';
import Header from '@/components/ui/headers/user-route-header';

import ChatSocket from '@/features/user/order-chat/components/chat-socket';
import ChatContainer from '@/features/user/order-chat/components/chat-container';

import { getAuthTokens } from '@/utils/cookies';

import { LoaderCircle, MessageCircle, Package } from 'lucide-react';

import { Suspense } from 'react';
import { getChatHistoryService } from '@/features/user/order-chat/services';
import ErrorState from '@/components/layout/error-state';
import { trackingDetailsService } from '@/features/user/track-order/service';

type Props = {
  searchParams: {
    orderId?: string;
  };
};

export default async function OrderChatPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  const { accessToken } = await getAuthTokens();

  if (!orderId) {
    return (
      <EmptyState
        icon={<Package size={36} className="text-neutral-500" />}
        title="Invalid Chat Link"
        message="No order ID was provided."
      />
    );
  }

  try {
    const response = await getChatHistoryService({
      orderId,
    });

  const { data } = await trackingDetailsService({ orderId });

    console.log(' [OrderChatPage]  ', data);

    return (
      <>
        {/* websocket connection */}

        <ChatSocket orderId={orderId} accessToken={accessToken} />

        <ChatContainer orderId={orderId} initialMessages={response.data} orderData={data} />
      </>
    );
  } catch (error) {
    console.error('[OrderChatPage] Error fetching chat history:', error);

    return (
      <ErrorState
        icon={<MessageCircle size={36} className="text-orange-500" />}
        title="Something went wrong"
        message={
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while fetching chat history.'
        }
      />
    );
  }
}
