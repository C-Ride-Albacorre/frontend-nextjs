'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import Stepper from '@/components/navigation/stepper';
import { STEPS } from '@/features/user/delivery/data';

export default function DeliveryHeader({ id }: { id: string }) {
  const path = usePathname();

  const params = useParams;

  // Returns 0-based index: first step = 0, second step = 1, etc.
  const currentStep = (() => {
    if (path.includes('/delivery-confirmation')) return 5;
    if (path.includes('/delivery-location')) return 4;
    if (path.endsWith('/delivery-type')) return 3;
    if (path.endsWith('/delivery/food/1')) return 2;
    if (path.endsWith('/food')) return 1;
    if (path.endsWith('/delivery')) return 0;
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
