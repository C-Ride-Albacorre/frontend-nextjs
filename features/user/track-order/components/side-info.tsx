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
      <Card
        border="none"
        gap="md"
        className="bg-foreground-200 flex items-start gap-4 "
      >
        <div className="flex items-start gap-3 mb-0">
          <Avatar name={driverName} size={54} />

          <div className="space-y-2 mb-0">
            <h2 className="font-medium capitalize">
              {orderData.driver?.fullName ?? 'Assigned Driver'}
            </h2>

            <p className="flex items-center gap-1 text-xs">
              <Star size={14} fill="#D4AF37" strokeWidth={0} />
              {orderData.driver?.rating}
              <span className="text-neutral-400">
                ({orderData.driver?.totalTrips} trips)
              </span>
            </p>

            <p className=" text-neutral-600 text-xs">
              {orderData.driver?.phone}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {/* <Button
            leftIcon={<Phone size={16} />}
            variant="primary-inverted"
            size="full"
            onClick={() => {
              console.log('Call driver');
            }}
          >
            Call
          </Button> */}

          {/* <Button
            leftIcon={<MessageCircle size={16} />}
            variant="black"
            size="full"
            onClick={() => {
              console.log('Message driver');
            }}
          >
            Message
          </Button> */}
        </div>
      </Card>

      {/* ORDER DETAILS */}
      <Card border="none" gap="md" className="bg-foreground-200">
        <h3 className="font-medium">Order Details</h3>

        <ul className="space-y-6">
          <li className="flex justify-between">
            <p className="text-neutral-500 text-sm">Order ID</p>
            <p className="text-sm truncate w-44">
              {' '}
              {orderData.order?.id ?? ''}
            </p>
          </li>

          <li className="flex justify-between">
            <p className="text-neutral-500 text-sm">Order Code</p>
            <p className="text-sm">{orderData.order?.code ?? ''}</p>
          </li>

          <li className="flex justify-between">
            <p className="text-neutral-500 text-sm">Created at</p>
            <p className="text-sm">{formatDate(orderData?.order?.createdAt)}</p>
          </li>

          <li className="flex justify-between border-t border-border pt-4">
            <p className="font-medium">Total Paid</p>
            <p className="font-medium">
              ₦{orderData.order?.totalAmount.toLocaleString()}
            </p>
          </li>
        </ul>
      </Card>

      {/* SUPPORT */}
      <Card border='none' gap="md" className="bg-foreground-200">


        <div className="flex items-start gap-4">

          <Headset size={24} className="text-primary" />


<div className='space-y-4'>
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
