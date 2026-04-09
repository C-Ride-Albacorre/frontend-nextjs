// features/user/delivery/components/modals/payment-result-modal.tsx
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { useOrderStore } from '@/features/user/delivery/order-store';
import { getPaymentStatusAction } from '@/features/user/delivery/action';

type Status = 'loading' | 'success' | 'error';

export default function PaymentResultModal({
  isModalOpen,
  onClose,
  paymentRef,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  paymentRef: string;
}) {
  const [status, setStatus] = useState<Status>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const { setPaymentData, paymentReference, amountPaid, reset } =
    useOrderStore();

  useEffect(() => {
    if (!isModalOpen || !paymentRef) return;

    // Reset state when modal opens with a new reference
    setStatus('loading');
    setErrorMessage('');

    const verify = async () => {
      console.log('[PaymentResultModal] Checking payment status:', paymentRef);
      const result = await getPaymentStatusAction(paymentRef);
      console.log('[PaymentResultModal] Status result:', result);

      if (result.success) {
        const data = result.data;

        setPaymentData({
          reference:
            data?.paymentReference ??
            data?.transactionReference ??
            data?.reference ??
            paymentRef,
          amount: data?.amount ?? data?.totalAmount ?? amountPaid ?? 0,
          method: data?.paymentMethod ?? 'CARD',
          status: data?.status ?? 'success',
        });

        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Payment verification failed.');
      }
    };

    verify();
  }, [isModalOpen, paymentRef]);

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <Modal
      wrapperClassName="max-w-md"
      isModalOpen={isModalOpen}
      onClose={() => {}}
    >
      {status === 'loading' && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 size={48} className="animate-spin text-primary" />
          <p className="text-neutral-500">Verifying your payment...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center justify-center gap-6 p-6">
          <div className="bg-red-100 w-18 h-18 flex items-center justify-center rounded-full">
            <XCircle size={38} className="text-red-500" />
          </div>

          <div className="space-y-2 text-center">
            <p className="text-lg font-medium">Payment Failed</p>
            <p className="text-neutral-500 text-sm max-w-md">{errorMessage}</p>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="lg" onClick={onClose}>
              Try Again
            </Button>
            <Button variant="primary" size="lg" href="/user/order-history">
              View Orders
            </Button>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center justify-center gap-6 p-6">
          <div className="bg-[#10B981]/20 w-24 h-24 flex items-center justify-center rounded-full border-8 border-white/60">
            <CheckCircle2 size={48} className="text-[#10B981]" />
          </div>

          <div className="space-y-2 text-center">
            <p className="text-lg font-medium">Payment Successful!</p>
            <p className="text-neutral-500 text-sm">
              Your order is now being processed
            </p>
          </div>

          <Card className="w-full max-w-md p-4">
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span className="text-neutral-500">Amount Paid</span>
                <span className="font-medium text-primary">
                  ₦{amountPaid?.toLocaleString() ?? '—'}
                </span>
              </li>
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
                <span className="text-xs rounded-full bg-[#10B981] text-white px-2 py-1">
                  Confirmed
                </span>
              </li>
            </ul>
          </Card>

          <Card className="w-full max-w-md bg-[#10B981]/10 border border-[#10B981] p-4 rounded-xl text-sm">
            <p className="font-medium">Beyond Delivery, It&apos;s Care</p>
            <p className="text-neutral-500">
              Your order will be handled with premium care by our dedicated
              delivery partners
            </p>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="primary"
              size="lg"
              href="/user/track-order"
              onClick={handleClose}
            >
              Track Your Order
            </Button>
            <Button variant="outline" size="lg" href="/user/order-history">
              View Orders
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
