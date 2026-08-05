'use client';
import {
  Star,
  Phone,
  MessageCircle,
  AlertCircle,
  Stars,
  StarIcon,
  Sparkles,
  Locate,
  Bike,
  Headset,
} from 'lucide-react';

import Card from '@/components/layout/card';

import { useCustomerStore } from '@/store/socket';
import { useMemo } from 'react';
import Avatar from '@/components/ui/avatar';
import { formatDate } from '@/helpers/date-formatter';
import { Button } from '@/components/ui/buttons/button';
import DriverCard from './driver-card';

export default function SideInfo({ orderData }: { orderData: any }) {

  // const activeOrder = useCustomerStore((s) => s.activeOrder);

  const etaToVendor = useCustomerStore((s) => s.tracking.eta.toVendor);
  const etaToCustomer = useCustomerStore((s) => s.tracking.eta.toCustomer);
  const orderStatus =
    useCustomerStore((s) => s.tracking.orderStatus) ?? orderData.order.status;

  const isToCustomer =
    orderStatus === 'PICKED_UP' ||
    orderStatus === 'IN_TRANSIT' ||
    etaToCustomer != null;

  const eta = isToCustomer
    ? (etaToCustomer ?? etaToVendor)
    : (etaToVendor ?? etaToCustomer);

  const etaText = useMemo(() => {
    if (eta == null) return;

    if (eta < 60) return `${eta} sec`;

    return `${Math.ceil(eta / 60)} min`;
  }, [eta]);

  const driverName = `${orderData.driver?.fullName ?? ''}`;

  /**
   * Driver (future: replace with backend driver object)
   */
  // const driverName = activeOrder?.driver?.name ?? 'Assigned Driver';

  // const driverRating = activeOrder?.driver?.rating ?? 4.9;

  // const trips = activeOrder?.driver?.trips ?? 1247;

  // const vehicle = activeOrder?.driver?.vehicle ?? 'Vehicle info pending';

  // const plate = activeOrder?.driver?.plate ?? '---';

  // const orderId = activeOrder?.order_number ?? '—';

  // const deliveryFee = activeOrder?.distance_meters
  //   ? Math.round(activeOrder.distance_meters * 0.5)
  //   : 500;

  // const totalPaid = activeOrder?.total_amount ?? 0;

  return (
    <div className="space-y-8">
      {/* DRIVER */}
      <DriverCard orderId={orderData.order?.id} driver={orderData.driver} />
      {/* ORDER DETAILS */}
      <Card border="none" gap="md" className="bg-foreground-200">
        <h3 className="font-medium">Order Details</h3>

        <ul className="space-y-6">
          <li className="flex flex-col justify-between gap-2">
            <p className="text-neutral-500 text-xs">Order ID</p>
            <p className="text-sm">
              {' '}
              {orderData.order?.id ?? ''}
            </p>
          </li>

        <li className="flex flex-col justify-between gap-2">
            <p className="text-neutral-500 text-xs">Order Code</p>
            <p className="text-sm">{orderData.order?.code ?? ''}</p>
          </li>

        <li className="flex flex-col justify-between gap-2">
            <p className="text-neutral-500 text-xs">Created at</p>
            <p className="text-sm">{formatDate(orderData?.order?.createdAt)}</p>
          </li>

          <li className="flex justify-between border-t border-border pt-4">
            <h5 className="font-semibold">Total Paid</h5>
            <h5 className="font-semibold">
              NGN {orderData.order?.totalAmount.toLocaleString()}
            </h5>
          </li>
        </ul>
      </Card>

      {/* SUPPORT */}
      <Card border="none" gap="md" className="bg-foreground-200">
        <div className="flex items-start gap-4">
          <Headset size={24} className="text-primary" />

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Need Assistance?</h3>
              <p className="text-sm text-neutral-500">
                Our care team is here to help
              </p>
            </div>

            <Button
              leftIcon={<AlertCircle size={16} />}
              size="icon"
              variant="black"
              onClick={() => {
                window.location.href = 'mailto:support@c-ride.com';
              }}
            >
              Report Issue
            </Button>
          </div>
        </div>
      </Card>

      {/* PREMIUM */}
      <Card border="none" className="flex items-start gap-4 bg-primary/10">
        <Sparkles size={24} className="text-primary" />

        <div className="space-y-2">
          <h2 className="font-medium">Premium Service Guarantee</h2>
          <p className="text-sm text-neutral-500 leading-6">
            Your delivery is handled with care by verified premium drivers
          </p>
        </div>
      </Card>
    </div>
  );
}
