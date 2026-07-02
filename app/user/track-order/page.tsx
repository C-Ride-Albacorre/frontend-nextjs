import EmptyState from '@/components/layout/empty-state';
import Header from '@/components/ui/headers/user-route-header';


import TrackingDetails from '@/features/user/track-order/components/tracking-details';
import TrackingSocket from '@/features/user/track-order/components/tracking-socket';
import { getAuthTokens } from '@/utils/cookies';
import { Loader,  Package } from 'lucide-react';
import { Suspense } from 'react';

type Props = {
  searchParams: {
    orderId?: string;
  };
};

export default async function TrackingDeliveryPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  const { accessToken } = await getAuthTokens();

  console.log('Search Params OrderId :', orderId);

  if (!orderId) {
    return (
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <Header />

        <EmptyState
          icon={<Package size={36} className="text-neutral-500" />}
          title="Invalid Tracking Link"
          message="No order ID was provided."
        />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Socket Connection */}
      <TrackingSocket orderId={orderId} accessToken={accessToken} />

      {/* Header */}
      <Header/>

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-12">
            <Loader size={36} className="text-primary animate-spin" />
          </div>
        }
      >
        <TrackingDetails orderId={orderId} />
      </Suspense>
    </main>
  );
}
