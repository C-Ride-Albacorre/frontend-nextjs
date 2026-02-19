'use client'


import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import Input from '@/components/ui/inputs/input';
import { ArrowRight, Wallet } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './payment';

interface AddFundsProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export default function AddFunds({ isModalOpen, onClose }: AddFundsProps) {
  const [isPaymentModal, setIsPaymentModal] = useState(false);

  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <section className="space-y-12">
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

          <div className="text-sm space-y-6">
            <p>How much would you like to add?</p>

            <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
              <Button variant="primary-black-outline">₦ 5,000</Button>

              <Button variant="primary-black-outline">₦ 10,000</Button>

              <Button variant="primary-black-outline">₦ 20,000</Button>

              <Button variant="primary-black-outline">₦ 50,000</Button>

              <Button variant="primary-black-outline">₦ 100,000</Button>

              <Button variant="primary-black-outline">₦ 200,000</Button>
            </div>
          </div>

          <form className="space-y-8">
            <Input
              label="Or enter custom amount"
              placeholder="₦ 200,000 - ₦ 1,000,000"
            />

            <ul className="space-y-6 text-sm">
              <li className="flex justify-between items-center">
                <p className="text-neutral-400">Amount to add</p>

                <p>₦ 20,000</p>
              </li>

              <li className="flex justify-between items-center">
                <p className="text-neutral-400">Processing fee</p>

                <p>₦ 20,000</p>
              </li>

              <li className="flex justify-between items-center pt-6 border-t border-border">
                <p className="text-neutral-400">New Balance</p>

                <p className="text-base font-medium text-primary">₦ 20,000</p>
              </li>
            </ul>

            <div className="text-center">
              <Button
                onClick={() => {
                  setIsPaymentModal(true);
                  onClose();
                }}
                size="2xl"
                rightIcon={<ArrowRight size={20} />}
              >
                Continue to Payment
              </Button>
            </div>
          </form>
        </section>
      </Modal>

      {isPaymentModal && (
        <PaymentModal
          isModalOpen={isPaymentModal}
          onClose={() => setIsPaymentModal(false)}
        />
      )}
    </>
  );
}
