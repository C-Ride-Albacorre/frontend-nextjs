'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Button } from '../buttons/button';
import { Download } from 'lucide-react';

export default function AdminDashboardHeader() {
  const pathName = usePathname();

  const pageTitle = clsx({
    'Admin Dashboard': pathName === '/admin/dashboard',
    'Vendor Management': pathName === '/admin/vendor-onboarding',
    'Store Management': pathName === '/admin/stores',
  });

  const pageDescription = clsx({
    'Platform overview and key metrics': pathName === '/admin/dashboard',
    'Review applications and manage vendor accounts':
      pathName === '/admin/vendor-onboarding',
    'Manage store details and performance': pathName === '/admin/stores',
  });

  return (
    <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-border py-8 md:py-6  px-4 md:px-8">
      <div className="space-y-2 md:space-y-3">
        <h1 className=" text-2xl md:text-3xl font-semibold text-neutral-900">
          {pageTitle}
        </h1>
        <p className="text-sm text-neutral-500">{pageDescription}</p>
      </div>

      <div className="flex items-center gap-3">
        {pathName === '/admin/dashboard' && (
          <div className="flex items-center gap-3">
            <Button
              variant="white"
              size="icon"
              spacing="sm"
              className="text-xs"
            >
              Today
            </Button>

            <Button
              variant="white"
              size="icon"
              spacing="sm"
              className="text-xs"
            >
              This Week
            </Button>

            <Button
              variant="white"
              size="icon"
              spacing="sm"
              className="text-xs"
            >
              This Month
            </Button>
          </div>
        )}
        <Button variant="primary" size="icon" spacing="sm" className="text-xs">
          <Download size={16} />
          Export Data
        </Button>
      </div>
    </header>
  );
}
