'use client';

import clsx from 'clsx';
import { header } from 'framer-motion/client';
import { usePathname } from 'next/navigation';
import path from 'path';
import { Button } from '../buttons/button';
import { Download } from 'lucide-react';

export default function VendorDashboardHeader() {
  const pathName = usePathname();

  const pageTitle = clsx({
    'Order Management': pathName === '/vendor/orders',
    'Product Management': pathName === '/vendor/products',
    'Store Management': pathName === '/vendor/store',
    'Vendor Onboarding': pathName === '/vendor/onboarding',
    'Active Deliveries': pathName === '/vendor/active-deliveries',
    'Financial & Earnings': pathName === '/vendor/analytics',
  });

  const pageDescription = clsx(
    'The Place Restaurant - Victoria Island, Lagos',
    {
      'Your registration information and account setup':
        pathName === '/vendor/onboarding',
    },
    {
      'Manage your payouts and track earnings':
        pathName === '/vendor/analytics',
    },
  );

  return (
    <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-border py-8 md:py-6  px-4 md:px-8">
      <div className="space-y-2 md:space-y-3">
        <h1 className=" text-2xl md:text-3xl font-semibold text-neutral-900">
          {pageTitle}
        </h1>
        <p className="text-sm text-neutral-500">{pageDescription}</p>
      </div>

      {pathName === '/vendor/analytics' && (
        <Button variant="outline" size="icon" spacing="sm" className='text-xs'>
          <Download size={16} />
          Export Data
        </Button>
      )}
    </header>
  );
}
