'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/buttons/button';
import Input from '@/components/ui/inputs/input';
import {
  Box,
  Dot,
  FileText,
  Info,
  Shield,
  Stars,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import PaymentModal from '@/features/user/delivery/components/modals/payment';
import PaymentSuccessModal from '@/features/user/delivery/components/modals/payment-success';
import { useOrderStore } from '@/features/user/delivery/order-store';
import { useCartStore } from '@/features/user/delivery/store';
import { createOrderAction } from '@/features/user/delivery/action';
import { toast } from 'sonner';
import Card from '@/components/layout/card';

const SERVICE_FEE = 6500;
const VAT_RATE = 0.075;

export default function DeliveryConfirmationPage() {
  const { id, slug } = useParams<{ id: string; slug: string }>();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] =
    useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const {
    // deliveryOptionId,
    dropoffLocation,
    recipientName,
    recipientPhone,
    deliveryInstructions,
    setDeliveryInstructions,
    orderId,
    setOrderId,
  } = useOrderStore();

  const { cart } = useCartStore();

  console.log('[DeliveryConfirmationPage] Cart:', cart);

  // Real totals from cart
  const subTotal = cart?.subTotal ?? 0;
  const vat = Math.round((subTotal + SERVICE_FEE) * VAT_RATE);
  const total = subTotal + SERVICE_FEE + vat;

  const handleContinue = async () => {
    if (!cart?.id) {
      toast.error('Your cart is empty');
      return;
    }
    if (!dropoffLocation) {
      toast.error('Please go back and select a delivery address');
      return;
    }

    // If order was already created (user navigated back), skip straight to payment
    if (orderId) {
      setIsPaymentModalOpen(true);
      return;
    }

    setIsCreatingOrder(true);

    const payload = {
      cartId: cart.id,
      // deliveryOptionId,
      dropoffLocation,
      recipientName,
      recipientPhone,
      deliveryInstructions,
    };

    console.log('[DeliveryConfirmationPage] Create order payload:', payload);

    const result = await createOrderAction(payload);

    setIsCreatingOrder(false);

    if (!result.success) {
      toast.error(result.error || 'Failed to create order. Please try again.');
      return;
    }

    const newOrderId = result.data.id ?? result.data.orderId;
    if (!newOrderId) {
      toast.error('Order created but ID is missing. Please contact support.');
      return;
    }

    setOrderId(newOrderId);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <div className="space-y-12 my-12">
        <div className="space-y-2">
          <p className="text-sm font-medium">Final Details</p>
          <span className="text-neutral-400 text-sm">
            Review and confirm your order
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Special Instructions (Optional)</p>
            <span className="text-neutral-400 text-sm">
              Any special handling or delivery instructions
            </span>
          </div>
          <Input
            type="text"
            placeholder="e.g. Leave at the gate, call on arrival..."
            spacing="none"
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium block">Promo Code</label>
          <div className="flex justify-center items-center gap-6 mt-2">
            <Input type="text" placeholder="Enter promo code" spacing="none" />
            <Button variant="primary-outline" type="button" size="icon">
              Apply
            </Button>
          </div>
        </div>
      </div>

      <Card className="bg-green-100/10 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <Shield size={24} className="text-green-100 mb-0" />
        <div className="space-y-6">
          <h5 className="font-semibold text-lg">C-Ride Guarantee</h5>
          <ul className="space-y-4">
            {[
              'On-time delivery or full refund',
              'Package protection up to ₦50,000',
              '24/7 customer support',
              'Real-time tracking included',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-neutral-400 text-sm"
              >
                <Dot size={16} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="space-y-12 mt-12">
        <div className="flex justify-between items-center">
          <p className="font-medium">Pricing Breakdown</p>
          <span className="flex items-center gap-1 text-primary text-sm">
            <Info size={16} /> Transparent pricing
          </span>
        </div>

        <ul className="space-y-6 text-sm text-neutral-500">
          <li className="flex justify-between items-center">
            <span className="flex gap-3 items-center">
              <Box size={16} /> Items Subtotal
            </span>
            <span className="text-base text-primary-text-100">
              ₦ {subTotal.toLocaleString()}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="flex gap-3 items-center">
              <FileText size={16} /> Service fee
            </span>
            <span className="text-base text-primary-text-100">
              ₦ {SERVICE_FEE.toLocaleString()}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span>VAT (7.5%)</span>
            <span className="text-base text-primary-text-100">
              ₦ {vat.toLocaleString()}
            </span>
          </li>
        </ul>

        <div className="flex justify-between items-center text-xl border-t border-border py-6">
          <p>Total Amount</p>
          <span className="text-primary">₦ {total.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-primary/10  flex flex-col md:flex-row gap-4 md:items-center mt-6">
        <Stars fill="#FFC814" stroke="0" size={20} />
        <span className="text-sm">
          Your order will be handled with care by our premium delivery partners
        </span>
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-around gap-8">
        <Button
          href={`/user/delivery/${id}/${slug}/delivery-location`}
          variant="outline"
          size="lg"
          leftIcon={<ChevronLeft size={16} />}
          className="px-12"
        >
          Back
        </Button>

        <Button
          onClick={handleContinue}
          variant="primary"
          size="lg"
          rightIcon={isCreatingOrder ? undefined : <ChevronRight size={16} />}
          className="px-12"
          disabled={isCreatingOrder}
        >
          {isCreatingOrder ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Creating Order...
            </span>
          ) : (
            'Continue'
          )}
        </Button>
      </div>

      <PaymentModal
        isModalOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        setIsPaymentSuccessModalOpen={() => {
          setIsPaymentModalOpen(false);
          setIsPaymentSuccessModalOpen(true);
        }}
        totalAmount={total}
      />

      <PaymentSuccessModal
        isModalOpen={isPaymentSuccessModalOpen}
        onClose={() => setIsPaymentSuccessModalOpen(false)}
      />
    </>
  );
}
