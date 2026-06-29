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
} from 'lucide-react';

import Card from '@/components/layout/card';

import { useCustomerStore } from '@/store/socket';
import { useMemo } from 'react';

export default function SideInfo() {
  // const activeOrder = useCustomerStore((s) => s.activeOrder);

  const etaToCustomer = useCustomerStore((s) => s.tracking.eta.toCustomer);

  const etaText = useMemo(() => {
    const eta = etaToCustomer;

    if (eta == null) return 'Waiting...';

    if (eta < 60) return `${eta} sec`;

    return `${Math.ceil(eta / 60)} min`;
  }, [etaToCustomer]);

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
        <Bike size={24} className="text-primary" />
           <div className="space-y-2">
          <h2 className="font-medium">Your Driver Status</h2>
          <div className="space-y-2 text-sm">
            {/* <p className="font-medium">{driverName}</p>

          <p className="flex items-center gap-1 text-xs">
            <Star size={14} fill="#D4AF37" strokeWidth={0} />
            {driverRating}
            <span className="text-neutral-400">({trips} trips)</span>
          </p> */}

         

           {etaToCustomer != null ? (
             <p className="font-medium text-primary">
               {etaText == null 
                 ? 'Waiting for driver...' 
                 : 'Driver is on the way to your location'}
             </p>
           ) : (
             <p className="font-medium text-neutral-500">
               Waiting for driver to be assigned...
             </p>
           )}
   
          </div>
        </div>

        {/* <div className="flex items-center gap-4">
          <Avatar
            src="/assets/image/driver.jpg"
            alt="driver"
            name={driverName}
            size={54}
          />

        
        </div> */}

        {/* <Card border="none" gap="sm" className="bg-white text-sm">
          <p className="text-xs text-neutral-500">Vehicle</p>
          <p className="font-medium">{vehicle}</p>
          <p className="text-neutral-500">{plate}</p>
        </Card> */}

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
      {/* <Card gap="md" className="bg-foreground-200">
        <h3 className="font-medium">Order Details</h3>

        <ul className="space-y-6 text-sm">
          <li className="flex justify-between">
            <p className="text-neutral-500">Order ID</p>
            <p>{orderId}</p>
          </li>

          <li className="flex justify-between">
            <p className="text-neutral-500">Type</p>
            <p>Food Delivery</p>
          </li>

          <li className="flex justify-between">
            <p className="text-neutral-500">Delivery Fee</p>
            <p>₦{deliveryFee.toLocaleString()}</p>
          </li>

          <li className="flex justify-between border-t border-border pt-4">
            <p className="font-medium">Total Paid</p>
            <p className="font-medium">₦{totalPaid.toLocaleString()}</p>
          </li>
        </ul>
      </Card> */}

      {/* SUPPORT */}
      {/* <Card gap="md" className="bg-foreground-200">
        <div className="space-y-2">
          <h3 className="font-medium">Need Assistance?</h3>
          <p className="text-sm text-neutral-500">
            Our care team is here to help
          </p>
        </div>

        <Button
          leftIcon={<AlertCircle size={16} />}
          size="full"
          variant="red"
          onClick={() => {
            console.log('Report issue');
          }}
        >
          Report Issue
        </Button>
      </Card> */}

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
