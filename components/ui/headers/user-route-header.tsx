'use client';

import { usePathname, useRouter } from 'next/navigation';

import { IconButton } from '@/components/ui/buttons/icon-button';
import { ChevronLeft } from 'lucide-react';
import clsx from 'clsx';
import { useCustomerStore } from '@/store/socket';

export default function Header({
  orderId,
}: {
  orderId?: string;
}) {
  const router = useRouter();

  const backHandler = () => {
    router.back();
  };

  const pathName = usePathname();



    console.log(' Header Search Params OrderId :', orderId);

  const isOnTrackOrderPage = pathName === '/user/track-order';

  const pageTitle = clsx({
    'Tracking Delivery': isOnTrackOrderPage,
    'Order History': pathName === '/user/order-history',
    'Profile & Address': pathName === '/user/profile',
    'Help Center': pathName === '/user/help-center',
    'Payments Method': pathName === '/user/wallet',
    'Payment Confirmation': pathName === '/payment/callback',
  });

  const etaToCustomer = useCustomerStore((s) => s.tracking.eta.toCustomer);

  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-6">
          <IconButton onClick={backHandler}>
            <ChevronLeft size={24} className="cursor-pointer" />
          </IconButton>

          <div className="space-y-2">
            <h1 className=" text-xl md:text-2xl font-medium">{pageTitle}</h1>
            {isOnTrackOrderPage && orderId && (
              <p className="text-sm text-neutral-500">Order Id: {orderId}</p>
            )}
          </div>
        </div>

        {isOnTrackOrderPage && etaToCustomer != null && (
          <span className="rounded-full bg-[#10B981] p-2 text-xs text-white">
            On Route
          </span>
        )}
      </header>
    </>
  );
}
