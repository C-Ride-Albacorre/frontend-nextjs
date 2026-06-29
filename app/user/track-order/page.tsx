import EmptyState from '@/components/layout/empty-state';
import Header from '@/components/ui/headers/user-route-header';

import MapOrderInfo from '@/features/user/track-order/components/map-order-info';
import SideInfo from '@/features/user/track-order/components/side-info';
import TrackingSocket from '@/features/user/track-order/components/tracking-socket';
import { getAuthTokens } from '@/utils/cookies';
import { Locate, Package } from 'lucide-react';

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
        <Header orderId={orderId} />

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
      <Header orderId={orderId} />

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Map */}
        <section className="lg:col-span-2">
          <MapOrderInfo />
        </section>

        {/* Sidebar */}
        <section>
          <SideInfo />
        </section>
      </section>
    </main>
  );
}
