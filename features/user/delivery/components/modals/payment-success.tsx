import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentSuccessModal({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <div className="space-y-6 p-4 md:p-8">
          <div className="bg-[#10B981]/20 w-28 h-28 shrink-0 aspect-square flex items-center justify-center rounded-full border-8 border-foreground-100 text-center mx-auto">
            <CheckCircle2 size={54} className="text-[#10B981] mx-auto" />
          </div>
          <div className="space-y-2">
            <p className=" text-lg md:text-xl font-medium  text-center">
              Payment Successful!
            </p>

            <p className=" text-neutral-500 text-center ">
              Your order is now in care
            </p>
          </div>

          <Card className="p-4">
            <ul className="space-y-6 text-sm md:text-base">
              <li className="flex justify-between">
                <p className="text-neutral-500">Amount Paid</p>{' '}
                <p className="text-primary text-right font-medium">₦21,769</p>
              </li>

              <li className="flex justify-between">
                <p className="text-neutral-500">Payment Method</p>{' '}
                <p className="text-right font-medium">Credit Card</p>
              </li>

              <li className="flex justify-between">
                <p className="text-neutral-500">Transaction ID</p>{' '}
                <p className="text-right font-medium">1234567890</p>
              </li>

              <li className="flex justify-between border-t border-border pt-4">
                <p className="text-neutral-500">Status</p>{' '}
                <p className="text-right text-xs rounded-full bg-[#10B981] text-white px-2 py-1">
                  Confirmed
                </p>
              </li>
            </ul>
          </Card>

          <Card gap='sm' className="bg-[#10B981]/10 border border-[#10B981] p-4 rounded-xl text-sm">
            <p>Beyond Delivery, It's Care</p>

            <p className="text-neutral-500">
              Your order will be handled with premium care by our dedicated
              delivery partners
            </p>
          </Card>

          <div className="text-center">
            <Button variant="primary" size="2xl" onClick={onClose}>
              Track Your Order
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
