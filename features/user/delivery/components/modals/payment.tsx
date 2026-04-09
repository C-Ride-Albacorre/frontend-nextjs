// features/user/delivery/components/modals/payment.tsx
'use client';

import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import Image from 'next/image';
import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import FormHeader from '@/components/ui/headers/form-header';
import { useOrderStore } from '@/features/user/delivery/order-store';
import { initializePaymentAction } from '@/features/user/delivery/action';
import { toast } from 'sonner';

export default function PaymentModal({
  isModalOpen,
  onClose,
  setIsPaymentSuccessModalOpen,
  totalAmount,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  setIsPaymentSuccessModalOpen: () => void;
  totalAmount: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { orderId, setPaymentData, setCheckoutUrl } = useOrderStore();

  const handlePay = async () => {
    if (!orderId) {
      toast.error('Order not found. Please go back and try again.');
      return;
    }

    setIsLoading(true);

    const callbackUrl =
      'https://backend-service-1rc7.onrender.com/api/v1/payment/callback';

    const result = await initializePaymentAction({
      orderId,
      paymentMethod: 'CARD',
      callbackUrl,
    });

    setIsLoading(false);

    if (!result.success) {
      toast.error(result.error || 'Payment initialization failed');
      return;
    }

    const data = result.data;

    console.log(
      '[PaymentModal] Payment response data:',
      JSON.stringify(data, null, 2),
    );

    // Monnify may nest the checkout URL at different levels
    const redirectUrl =
      data?.checkoutUrl ??
      data?.paymentUrl ??
      data?.authorizationUrl ??
      data?.body?.checkoutUrl ??
      data?.body?.paymentUrl ??
      data?.body?.authorizationUrl ??
      data?.responseBody?.checkoutUrl ??
      data?.responseBody?.paymentUrl ??
      data?.responseBody?.authorizationUrl ??
      null;

    const ref =
      data?.reference ??
      data?.transactionReference ??
      data?.paymentReference ??
      data?.body?.transactionReference ??
      data?.body?.paymentReference ??
      data?.responseBody?.transactionReference ??
      data?.responseBody?.paymentReference ??
      '';

    setPaymentData({
      reference: ref,
      amount: totalAmount,
      method: 'CARD',
      status: 'PENDING',
    });

    if (redirectUrl) {
      // Cache the checkout URL so we can resume without re-initializing
      if (orderId) setCheckoutUrl(orderId, redirectUrl);
      // Redirect to Monnify hosted checkout
      window.location.href = redirectUrl;
      return;
    }

    // No redirect URL — treat as immediate success (e.g. wallet/inline flow)
    setIsPaymentSuccessModalOpen();
  };

  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="space-y-4">
        <FormHeader
          title="Payment"
          subtitle="Choose your payment method"
          className="text-left"
        />

        <div className="space-y-6">
          <Card className="bg-foreground-100 p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium md:text-lg">Total Amount</p>
              <div className="space-y-4 text-right">
                <p className="font-medium md:text-lg">
                  ₦{totalAmount.toLocaleString()}
                </p>
                <p className="text-sm text-neutral-400">Including VAT & fees</p>
              </div>
            </div>
          </Card>

          {/* Payment method options — keep your existing Paystack/Flutterwave UI
              but note your API currently only accepts 'CARD' as paymentMethod.
              Update these if your backend adds more methods. */}
          <div className="space-y-6">
            <label className="border border-border flex items-center justify-between px-4 rounded-xl cursor-pointer">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="payment"
                  value="paystack"
                  className="accent-primary"
                  defaultChecked
                />
                <span>Pay with Paystack</span>
              </div>
              <Image
                src="/assets/image/paystack.png"
                alt="Paystack"
                width={100}
                height={50}
              />
            </label>

            <label className="border border-border flex items-center justify-between p-4 rounded-xl cursor-pointer">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="payment"
                  value="flutterwave"
                  className="accent-primary"
                />
                <span>Pay with Flutterwave</span>
              </div>
              <Image
                src="/assets/image/flutterwave.webp"
                alt="Flutterwave"
                width={100}
                height={50}
              />
            </label>
          </div>

          <div className="border border-[#10B981] px-4 py-3 flex items-center gap-6 rounded-xl bg-[#10B981]/10">
            <Lock size={20} className="text-[#10B981]" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Secure Payment</p>
              <p className="text-xs text-neutral-400">
                Your payment information is encrypted and secure. We never store
                your CVV.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <p className="text-xs text-neutral-400">Powered by</p>
          <Image
            src="/assets/image/paystack.png"
            alt="Paystack"
            width={80}
            height={50}
          />
          <Image
            src="/assets/image/flutterwave.webp"
            alt="Flutterwave"
            width={80}
            height={50}
          />
        </div>

        <div className="flex justify-between md:justify-around items-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handlePay}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Processing...
              </span>
            ) : (
              `Pay ₦${totalAmount.toLocaleString()}`
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
