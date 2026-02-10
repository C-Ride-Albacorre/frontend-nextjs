import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import FormHeader from '@/components/ui/headers/form-header';
import Input from '@/components/ui/inputs/input';
import { Lock } from 'lucide-react';
import Image from 'next/image';

export default function PaymentModal({
  isModalOpen,
  onClose,
  setIsPaymentSuccessModalOpen,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  setIsPaymentSuccessModalOpen: () => void;
}) {
  return (
    <>
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
                  <p className="font-medium md:text-lg">₦15,856.00</p>

                  <p className="text-sm text-neutral-400">
                    Including VAT & fees
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <label className="border border-border flex items-center justify-between  px-4 rounded-xl cursor-pointer">
                <div className="flex items-center gap-4 ">
                  <input
                    type="radio"
                    name="payment"
                    value="paystack"
                    className="accent-primary"
                    placeholder="Paystack"
                  />

                  <span>Pay with Paystack</span>
                </div>

                <div>
                  <Image
                    src="/assets/image/paystack.png"
                    alt="Paystack"
                    width={100}
                    height={50}
                  />
                </div>
              </label>

              <label className="border border-border flex items-center justify-between  p-4 rounded-xl cursor-pointer">
                <div className="flex items-center gap-4 ">
                  <input
                    type="radio"
                    name="payment"
                    value="flutterwave"
                    className="accent-primary"
                    placeholder="flutterwave"
                  />

                  <span>Pay with Flutterwave</span>
                </div>

                <div>
                  <Image
                    src="/assets/image/flutterwave.webp"
                    alt="Flutterwave"
                    width={100}
                    height={50}
                  />
                </div>
              </label>
            </div>

            <div className="border border-[#10B981] px-4 py-3 flex items-center gap-6 rounded-xl bg-[#10B981]/10">
              <Lock size={20} className="text-[#10B981]" />

              <div className="space-y-2">
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-neutral-400">
                  Your payment information is encrypted and secure. We never
                  store your CVV.
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
            <Button variant="outline" size="lg" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                onClose();
                setIsPaymentSuccessModalOpen();
              }}
            >
              Pay ₦15,500
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
