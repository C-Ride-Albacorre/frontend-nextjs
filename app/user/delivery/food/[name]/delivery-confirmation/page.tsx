'use client';

import { useState } from 'react';

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
} from 'lucide-react';
import PaymentModal from '@/features/user/delivery/components/modals/payment';
import PaymentSuccessModal from '@/features/user/delivery/components/modals/payment-success';

export default function DeliveryConfirmationPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <div className="space-y-12 my-12">
        <div className="space-y-2">
          <p className="text-sm font-medium">Final Details</p>
          <span className="text-neutral-400 text-sm">
            Review and confirm your order
          </span>
        </div>

        <div className="space-y-2">
          <p className=" text-shadow-amber-50 font-medium">
            Special Instructions (Optional)
          </p>
          <span className="text-neutral-400 text-sm">
            Any special handling or delivery instructions
          </span>
        </div>

        <div>
          <label className="text-sm font-medium block">Promo Code</label>

          <div className="flex justify-center items-center gap-6 mt-2">
            <Input type="text" placeholder="Enter promo code" spacing="none" />

            <Button variant="primary-outline" type="submit" size="sm">
              Apply
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-green-100/10 flex gap-6 items-start p-8 rounded-2xl">
        <Shield size={24} className="text-green-100" />

        <div className="space-y-6">
          <h5 className="font-semibold text-lg">C-Ride Guarantee</h5>

          <ul className="space-y-4 ">
            <li className="flex items-center gap-2 text-neutral-400 text-sm">
              <Dot size={16} /> On-time delivery or full refund
            </li>

            <li className="flex items-center gap-2 text-neutral-400 text-sm">
              <Dot size={16} /> Package protection up to ₦50,000
            </li>

            <li className="flex items-center gap-2 text-neutral-400 text-sm">
              <Dot size={16} /> 24/7 customer support
            </li>

            <li className="flex items-center gap-2 text-neutral-400 text-sm">
              <Dot size={16} /> Real-time tracking included
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-12 mt-12">
        <div className="flex justify-between items-center">
          <p className="font-medium ">Pricing Breakdown</p>

          <span className="flex items-center gap-1 text-primary text-sm">
            <Info size={16} /> Transparent pricing
          </span>
        </div>

        <ul className="space-y-6 text-sm text-neutral-500">
          <li className="flex justify-between items-center">
            <span className="flex gap-3 items-center">
              <Box size={16} /> Standard Delivery
            </span>
            <span className=" text-base text-primary-text-100">₦ 6,500</span>
          </li>

          <li className="flex justify-between items-center">
            <span className="flex gap-3 items-center">
              <FileText size={16} /> Service fee
            </span>
            <span className=" text-base text-primary-text-100">₦ 6,500</span>
          </li>

          <li className="flex justify-between items-center text-primary-text-100">
            <span className="">Sub Total</span>
            <span className=" text-base text-primary-text-100">₦ 6,500</span>
          </li>

          <li className="flex justify-between items-center">
            <span>VAT (7.5%)</span>
            <span className=" text-base text-primary-text-100">₦ 500</span>
          </li>
        </ul>

        <div className="flex justify-between items-center text-xl border-t border-border py-6">
          <p>Total Amount</p>

          <span className=" text-primary">₦ 18,325</span>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-primary/10 flex gap-4 items-center mt-6">
        <Stars fill="#FFC814" stroke="0" size={20} />

        <span className="text-sm">
          Your order will be handled with care by our premium delivery partners
        </span>
      </div>

      <div className="mt-12  flex items-center justify-around gap-8">
        <Button
          href=""
          variant="outline"
          size="lg"
          leftIcon={<ChevronLeft size={16} />}
          className="px-12"
        >
          Back
        </Button>

        <Button
          onClick={() => setIsPaymentModalOpen(true)}
          variant="primary"
          size="lg"
          rightIcon={<ChevronRight size={16} />}
          className="px-12"
        >
          Continue
        </Button>
      </div>

      <PaymentModal
        isModalOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        setIsPaymentSuccessModalOpen={() => setIsPaymentSuccessModalOpen(true)}
      />

      <PaymentSuccessModal
        isModalOpen={isPaymentSuccessModalOpen}
        onClose={() => setIsPaymentSuccessModalOpen(false)}
      />
    </>
  );
}
