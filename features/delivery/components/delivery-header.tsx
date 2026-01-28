'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Stepper from '@/components/layout/stepper';
import { STEPS } from '@/features/delivery/data';

export default function DeliveryHeader({ id }: { id: string }) {
  const path = usePathname();

  const currentStep = (() => {
    if (path.includes('vendor')) return 1;
    if (path.includes('products')) return 2;
    if (path.includes('delivery')) return 3;
    if (path.includes('location')) return 4;
    if (path.includes('confirm')) return 5;
    return 0;
  })();

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary-text-100">
          Create New Delivery
        </h1>

        <Link
          href="/user/dashboard"
          className="rounded-xl border border-border px-5 py-2 text-sm font-medium hover:bg-neutral-50"
        >
          Close
        </Link>
      </header>

      {path.includes(id) && (
        <>
          {/* Cart */}
          <div className="flex justify-end">
            <button className="mt-4 flex items-center gap-4 rounded-xl border border-border px-4 py-2 hover:bg-foreground-200">
              <span className="flex items-center gap-2 text-xs">
                <ShoppingCart size={16} />2 items
              </span>
              <div className="rounded-md border border-border bg-foreground-100 px-2 py-1 text-xs">
                ₦ 1,500
              </div>
            </button>
          </div>

          {/* Stepper */}

          <Stepper STEPS={STEPS} currentStep={currentStep} />
        </>
      )}
    </>
  );
}
