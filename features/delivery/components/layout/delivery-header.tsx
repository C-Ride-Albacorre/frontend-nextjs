'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

const STEPS = [
  'Item Type',
  'Vendor',
  'Products',
  'Delivery',
  'Location',
  'Confirm',
];

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary-text-100">
          Create New Delivery
        </h1>

        <Link
          href="/dashboard"
          className="rounded-xl border border-border px-5 py-2 text-sm font-medium hover:bg-neutral-50"
        >
          Close
        </Link>
      </div>

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
          <div className="mt-6 hidden rounded-xl bg-foreground-200 p-6 md:block py-10">
            <ol className="flex w-full items-start">
              {STEPS.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isLast = index === STEPS.length - 1;

                return (
                  <li
                    key={step}
                    className={`relative flex w-full flex-col items-center
            ${
              !isLast
                ? `
                  after:absolute
                  after:top-6
                  after:left-[calc(50%+38px)]
                  after:h-[3px]
                  after:w-[calc(100%-76px)]
                  after:rounded-full
                `
                : ''
            }
            ${
              !isLast && isCompleted
                ? 'after:bg-primary'
                : !isLast
                  ? 'after:bg-[#E8E8E8] '
                  : ''
            }
          `}
                  >
                    {/* Circle */}
                    <span
                      className={`z-10 flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium
              ${
                isCompleted || isActive
                  ? 'bg-primary text-primary-text-100 border-4 border-border'
                  : 'border border-[#E8E8E8] bg-white text-neutral-400'
              }`}
                    >
                      {isCompleted ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </span>

                    {/* Label */}
                    <span
                      className={`mt-3 text-xs text-center
              ${
                isCompleted || isActive
                  ? 'font-medium text-primary-text-100'
                  : 'text-neutral-400'
              }`}
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>



          
        </>
      )}
    </>
  );
}
