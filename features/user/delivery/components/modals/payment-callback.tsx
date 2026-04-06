'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import Card from '@/components/layout/card';
import { verifyPaymentAction } from '@/features/user/delivery/action';
import { useOrderStore } from '@/features/user/delivery/order-store';

type Status = 'loading' | 'success' | 'error' | 'paid';

export default function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const { setPaymentData, paymentReference, paymentStatus, amountPaid, reset } =
    useOrderStore();

  useEffect(() => {
    const ref =
      searchParams.get('paymentReference') ??
      searchParams.get('transactionReference') ??
      searchParams.get('ref') ??
      searchParams.get('reference');

    console.log('[PaymentCallback] Reference from URL:', ref);

    if (!ref) {
      setErrorMessage('No payment reference found');
      setStatus('error');
      return;
    }

    verifyPayment(ref);
  }, [searchParams]);

  const verifyPayment = async (reference: string) => {
    setStatus('loading');

    console.log('[PaymentCallback] Verifying payment:', reference);
    const result = await verifyPaymentAction(reference);
    console.log('[PaymentCallback] Verification result:', result);

    if (result.success) {
      const data = result.data;

      setOrderNumber(data?.orderNumber ?? '');

      setPaymentData({
        reference: reference,
        amount: data?.amount ?? data?.totalAmount ?? amountPaid ?? 0,
        method: data?.paymentMethod ?? 'CARD',
        status: data?.status ?? 'success',
      });

      setStatus('success');
    } else {
      setErrorMessage(result.error || 'Payment verification failed');
      setStatus('error');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-primary" />
        <p className="text-neutral-500">Verifying your payment...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-6">
        <div className="bg-red-100 w-24 h-24 flex items-center justify-center rounded-full border-8 border-white/60">
          <XCircle size={48} className="text-red-500" />
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold">Payment Failed</h2>
          <p className="text-neutral-500 text-sm">{errorMessage}</p>
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

  // Success page
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
          {/* <li className="flex justify-between">
            <span className="text-neutral-500">Amount Paid</span>
            <span className="font-medium text-primary">
              ₦{amountPaid?.toLocaleString() ?? '—'}
            </span>
          </li> */}
          {orderNumber && (
            <li className="flex justify-between">
              <span className="text-neutral-500">Order Number</span>
              <span className="font-medium">{orderNumber}</span>
            </li>
          )}
          <li className="flex justify-between">
            <span className="text-neutral-500">Payment Method</span>
            <span className="font-medium">Card</span>
          </li>
          <li className="flex justify-between">
            <span className="text-neutral-500">Reference</span>
            <span className="font-medium text-xs break-all">
              {paymentReference ?? '—'}
            </span>
          </li>
          <li className="flex justify-between border-t border-border pt-4">
            <span className="text-neutral-500">Status</span>
            <span className="text-xs rounded-full bg-[#10B981] text-white px-2 py-1 capitalize">
              {paymentStatus?.toLowerCase() ?? 'success'}
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
          onClick={() => reset()}
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
