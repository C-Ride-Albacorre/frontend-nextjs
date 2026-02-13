import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import { Download, Link, Star } from 'lucide-react';
import Image from 'next/image';
import { RouteItem } from '../../track-order/components/section';
import { orders } from '../data';
import { Button } from '@/components/ui/buttons/button';

export default function ReorderConfirmation({
  isModalOpen,
  onClose,
  order,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  order: (typeof orders)[0];
}) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <section className="space-y-12">
        <header className="text-center w-full flex flex-col justify-center items-center space-y-3">
          <Image
            src="/assets/svg/logo-main.svg"
            alt="C-ride logo"
            width={120}
            height={48}
            priority
            className="select-none"
          />

          <p className="text-sm text-neutral-600">Beyond Delivery, It's Care</p>
        </header>

        <section className="space-y-3">
          <p className="font-medium text-sm">Order Details</p>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between items-center">
              <p className="text-neutral-500">Order ID</p>
              <p className="font-medium text-right">{order.id}</p>
            </li>

            <li className="flex justify-between items-center">
              <p className="text-neutral-500">Service Type</p>
              <p className="font-medium text-right">{order.service}</p>
            </li>

            <li className="flex justify-between items-center">
              <p className="text-neutral-500">Date</p>
              <p className="font-medium text-right">
                Tuesday, November 12, 2024
              </p>
            </li>

            <li className="flex justify-between items-center">
              <p className="text-neutral-500">Time</p>
              <p className="font-medium text-right">6:30 PM</p>
            </li>

            <li className="flex justify-between items-center">
              <p className="text-neutral-500">Fulfilment Partner</p>
              <p className="font-medium text-right">Aisha Mohammed</p>
            </li>

            <li className="flex justify-between items-center">
              <p className="text-neutral-500">Your Rating</p>
              <div className="flex items-center gap-1">
                <Star stroke="0" fill="#D4AF37" size={14} />
                <Star stroke="0" fill="#D4AF37" size={14} />
                <Star stroke="0" fill="#D4AF37" size={14} />
                <Star stroke="0" fill="#D4AF37" size={14} />
                <Star size={12} className="text-neutral-400" />
              </div>
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <p className="font-medium text-sm">Journey Details</p>
          <Card border="none" spacing="none" gap="md">
            <div className="flex flex-col  gap-8">
              <RouteItem
                title="Pickup"
                address={order.pickup.address}
                time={order.pickup.time}
              />

              <RouteItem
                title="Drop-off"
                address={order.dropoff.address}
                time={order.dropoff.time}
                highlight
              />
            </div>
          </Card>
        </section>

        <section className="space-y-3">
          <p className="font-medium text-sm">Payment Summary</p>

          <Card
            border="none"
            spacing="sm"
            className="bg-primary-text-100 text-primary font-medium flex items-center justify-between"
          >
            <p className="mb-0">Total Amount</p>

            <p>₦ 18,325</p>
          </Card>
        </section>

        <section className="flex flex-col justify-center items-center text-xs md:text-sm space-y-4 text-center">
          <p className="font-medium">Thank you for choosing C-Ride</p>

          <p className="text-[#10B981]">
            Your premium delivery experience matters to us
          </p>

          <p className="text-neutral-500">
            For support: support@c-ride.co | +234 (0) 123 456 7890
          </p>

          <p className="text-neutral-500">Lagos, Nigeria | www.c-ride.co</p>
        </section>

        <section className='flex justify-around md:justify-center items-center gap-8'>
          <Button
            leftIcon={<Download size={16} />}
            variant="primary"
            size="lg"
            onClick={onClose}
          >
            Download Receipt
          </Button>

          <Button variant="outline" size="lg" onClick={onClose}>
            Close
          </Button>
        </section>
      </section>
    </Modal>
  );
}
