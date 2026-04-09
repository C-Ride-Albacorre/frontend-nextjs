'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getPaymentStatusAction } from '@/features/user/delivery/action';
import { useOrderStore } from '@/features/user/delivery/order-store';

const POLL_INTERVAL = 3000;
const MAX_POLLS = 20;

export default function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pollCount = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { setPaymentData, amountPaid } = useOrderStore();

  const checkStatus = useCallback(
    async (transactionReference: string) => {
      console.log(
        '[PaymentCallback] Checking payment status:',
        transactionReference,
      );
      const result = await getPaymentStatusAction(transactionReference);
      console.log('[PaymentCallback] Status result:', result);

      if (!result.success) {
        router.replace(
          `/payment/error?reason=${encodeURIComponent(result.error || 'status_check_failed')}`,
        );
        return;
      }

      const data = result.data;
      const status = data?.status?.toUpperCase();

      if (status === 'PAID' || status === 'SUCCESS') {
        setPaymentData({
          reference: transactionReference,
          amount: data?.amount ?? data?.totalAmount ?? amountPaid ?? 0,
          method: data?.paymentMethod ?? 'CARD',
          status: status,
        });

        const params = new URLSearchParams({
          status: status,
          ...(data?.orderId && { orderId: data.orderId }),
          ...(data?.orderNumber && { orderNumber: data.orderNumber }),
        });
        router.replace(`/payment/result?${params.toString()}`);
      } else if (status === 'PENDING') {
        pollCount.current += 1;
        if (pollCount.current >= MAX_POLLS) {
          router.replace('/payment/error?reason=payment_timeout');
          return;
        }
        timerRef.current = setTimeout(
          () => checkStatus(transactionReference),
          POLL_INTERVAL,
        );
      } else {
        // FAILED or any other status
        router.replace(
          `/payment/error?reason=${encodeURIComponent(status || 'unknown')}`,
        );
      }
    },
    [router, setPaymentData, amountPaid],
  );

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

    pollCount.current = 0;
    checkStatus(ref);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 size={48} className="animate-spin text-primary" />
      <p className="text-neutral-500">Checking your payment status...</p>
    </div>
  );
}
