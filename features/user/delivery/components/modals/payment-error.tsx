'use client';

import { useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';

export default function PaymentErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6">
      <div className="bg-red-100 w-24 h-24 flex items-center justify-center rounded-full border-8 border-white/60">
        <XCircle size={48} className="text-red-500" />
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Payment Failed</h2>
        <p className="text-neutral-500 text-sm">
          {reason === 'no_reference'
            ? 'No payment reference was found. Please try again.'
            : 'Something went wrong while processing your payment. Please try again.'}
        </p>
      </div>

      <div className="flex gap-4 w-full max-w-md">
        <Button
          variant="primary"
          size="lg"
          href="/user/delivery"
          className="w-full"
        >
          Back to Delivery
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
