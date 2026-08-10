'use client';

import {
  CalendarDays,
  CreditCard,
  Hash,
  Receipt,
} from 'lucide-react';

import { formatDate } from '@/helpers/date-formatter';

type Props = {
  order: {
    id: string;
    code: string;
    totalAmount: number;
    createdAt: string;
  };
};

export default function OrderSummaryCard({
  order,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <Receipt
              size={20}
              className="text-primary"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Order
            </p>

            <h2 className="text-lg font-semibold">
              Summary
            </h2>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        {/* Order ID */}

        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <Hash
              size={18}
              className="text-neutral-400"
            />

            <span className="text-sm text-neutral-500">
              Order ID
            </span>
          </div>

          <p className="max-w-45 truncate text-right text-sm font-medium">
            {order.id}
          </p>
        </div>

        {/* Code */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Receipt
              size={18}
              className="text-neutral-400"
            />

            <span className="text-sm text-neutral-500">
              Order Code
            </span>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {order.code}
          </span>
        </div>

        {/* Date */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-neutral-400"
            />

            <span className="text-sm text-neutral-500">
              Created
            </span>
          </div>

          <p className="text-sm font-medium">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="border-t border-dashed border-border pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard
                size={18}
                className="text-primary"
              />

              <span className="font-medium">
                Total Paid
              </span>
            </div>

            <span className="text-2xl font-bold text-primary">
              NGN {order.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}