import ErrorState from '@/components/layout/error-state';
import { trackingDetailsService } from '../service';
import MapOrderInfo from './map-order-info';
import SideInfo from './side-info';
import { LoaderCircle, LocateOff } from 'lucide-react';
import EmptyState from '@/components/layout/empty-state';

export default async function TrackingDetails({
  orderId,
}: {
  orderId: string;
}) {
  try {
    const { data } = await trackingDetailsService({ orderId });

    console.log(' [TrackingDetails] fetched tracking details:', data);

    if (!data.assignment) {
      return (
        <EmptyState
          icon={
            <LoaderCircle size={24} className="text-neutral-500 animate-spin" />
          }
          title="Awaiting Driver Assignment"
          message="Please wait while we assign a driver to your order. You will receive a notification once a driver has been assigned."
        />
      );
    }

    return (
      <>
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Map */}
          <section className="lg:col-span-2">
            <MapOrderInfo orderData={data} />
          </section>

          {/* Sidebar */}
          <section>
            <SideInfo orderData={data} />
          </section>
        </section>
      </>
    );
  } catch (error) {
    console.error('[TrackingDetails] Error fetching tracking details:', error);

    return (
      <ErrorState
        icon={<LocateOff size={36} className="text-orange-500" />}
        title="Failed to load tracking details"
        message="An error occurred while fetching your tracking details. Please try again later."
      />
    );
  }
}
