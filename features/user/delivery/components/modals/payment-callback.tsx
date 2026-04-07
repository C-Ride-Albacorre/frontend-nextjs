'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { verifyPaymentAction } from '@/features/user/delivery/action';
import { useOrderStore } from '@/features/user/delivery/order-store';

export default function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const { setPaymentData, amountPaid } = useOrderStore();

  useEffect(() => {
    const ref =
      searchParams.get('paymentReference') ??
      searchParams.get('transactionReference') ??
      searchParams.get('ref') ??
      searchParams.get('reference');

    console.log('[PaymentCallback] Reference from URL:', ref);

    if (!ref) {
      router.replace('/payment/error?reason=no_reference');
      return;
    }

    verifyPayment(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const verifyPayment = async (reference: string) => {
    console.log('[PaymentCallback] Verifying payment:', reference);
    const result = await verifyPaymentAction(reference);
    console.log('[PaymentCallback] Verification result:', result);

    if (result.success) {
      const data = result.data;
      const status = data?.status; // e.g. "PAID"

      setPaymentData({
        reference: reference,
        amount: data?.amount ?? data?.totalAmount ?? amountPaid ?? 0,
        method: data?.paymentMethod ?? 'CARD',
        status: status ?? 'success',
      });

      if (status === 'PAID' || status === 'SUCCESS') {
        const params = new URLSearchParams({
          status: status,
          ...(data?.orderId && { orderId: data.orderId }),
          ...(data?.orderNumber && { orderNumber: data.orderNumber }),
        });
        router.replace(`/payment/result?${params.toString()}`);
      } else {
        // Payment not confirmed as paid — treat as failure
        router.replace(
          `/payment/error?reason=${encodeURIComponent(status || 'unknown')}`,
        );
      }
    } else {
      router.replace(
        `/payment/error?reason=${encodeURIComponent(result.error || 'verification_failed')}`,
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 size={48} className="animate-spin text-primary" />
      <p className="text-neutral-500">Verifying your payment...</p>
    </div>
  );
}
