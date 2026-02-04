'use client';


import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function VendorDashboardHeader() {
  const pathName = usePathname();

  const pageTitle = clsx({
    'Order Management': pathName === '/vendor/orders',
    'Product Management': pathName === '/vendor/products',
    'Store Management': pathName === '/vendor/store',
    'Vendor Onboarding': pathName === '/vendor/onboarding',
    "Active Deliveries": pathName ==='/vendor/active-deliveries'
  });

  const pageDescription = clsx(
    'The Place Restaurant - Victoria Island, Lagos',
    {
      'Your registration information and account setup':
        pathName === '/vendor/onboarding',
    },
  );

  return (
    <header className="space-y-2 md:space-y-3 border-b border-border py-8 md:py-6  px-4 md:px-8">
      <h1 className=" text-2xl md:text-3xl font-semibold text-neutral-900">
        {pageTitle}
      </h1>
      <p className="text-sm text-neutral-500">{pageDescription}</p>
    </header>
  );
}
