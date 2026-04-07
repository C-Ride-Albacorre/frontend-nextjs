'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import Card from '@/components/layout/card';

export default function PaymentResultContent() {
  const searchParams = useSearchParams();

  const status = searchParams.get('status') ?? '';
  const orderId = searchParams.get('orderId') ?? '';
  const orderNumber = searchParams.get('orderNumber') ?? '';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6">
      <div className="bg-[#10B981]/20 w-24 h-24 flex items-center justify-center rounded-full border-8 border-white/60">
        <CheckCircle2 size={48} className="text-[#10B981]" />
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Payment Successful!</h2>
        <p className="text-neutral-500 text-sm">
          Your order is now being processed
        </p>
      </div>

      <Card className="w-full max-w-md p-4">
        <ul className="space-y-4 text-sm">
          {orderNumber && (
            <li className="flex justify-between">
              <span className="text-neutral-500">Order Number</span>
              <span className="font-medium">{orderNumber}</span>
            </li>
          )}
          <li className="flex justify-between border-t border-border pt-4">
            <span className="text-neutral-500">Status</span>
            <span className="text-xs rounded-full bg-[#10B981] text-white px-2 py-1 capitalize">
              {status?.toLowerCase() || 'success'}
            </span>
          </li>
        </ul>
      </Card>

      <Card
        gap="sm"
        className="w-full max-w-md bg-[#10B981]/10 border border-[#10B981] text-sm"
      >
        <p className="font-medium">Beyond Delivery, It&apos;s Care</p>
        <p className="text-neutral-500">
          Your order will be handled with premium care by our dedicated delivery
          partners
        </p>
      </Card>

      <div className="flex gap-4 w-full max-w-md">
        <Button
          variant="primary"
          size="lg"
          href="/user/track-order"
          className="w-full"
        >
          Track Your Order
        </Button>
        <Button
          variant="outline"
          size="lg"
          href="/user/order-history"
          className="w-full"
        >
          View Orders
        </Button>
      </div>
    </div>
  );
}
