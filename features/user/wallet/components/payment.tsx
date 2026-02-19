import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { Wallet } from 'lucide-react';
import Image from 'next/image';

export default function PaymentModal({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <section className="space-y-8">
          <Card className="bg-foreground-100 flex items-center gap-6">
            <div
              className=" bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center aspect-square shrink-0
                mb-0"
            >
              <Wallet size={20} className="text-primary" />
            </div>

            <div
              className="
            space-y-3"
            >
              <h2 className="text-lg md:text-2xl font-medium">
                Add Funds to Wallet
              </h2>

              <p className="text-neutral-500 text-sm">
                Current Balance:{' '}
                <span className="text-primary-text-100 font-medium">
                  15,750
                </span>
              </p>
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

          <div className="flex justify-between md:justify-center gap-8 items-center mt-8">
            <Button variant="outline" size="2xl" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="primary"
              size="2xl"
              onClick={() => {
                onClose();
              }}
            >
              Pay ₦15,500
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
}
