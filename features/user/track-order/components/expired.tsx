'use client';

import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';
import Textarea from '@/components/ui/inputs/textarea';
import { CheckCircle, CheckCircle2, Loader, Star, StarsIcon } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitRatingAction } from '../action';
import { toast } from 'sonner';

export default function ExpiredModal({
  isOpen,
  onClose,
  driver,
}: {
  isOpen: boolean;
  onClose?: () => void;
  driver?: any;
}) {
  const router = useRouter();

  return (
    <Modal wrapperClassName='max-w-xl' isModalOpen={isOpen} onClose={onClose}>
      <div className="space-y-8">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100/10">
          <CheckCircle className="h-10 w-10 text-green-100" />
        </div>

        {/* Title */}
        <div className=" text-center">
          <h2 className="text-2xl font-bold">Order Delivered 🎉</h2>

          <p className=" text-sm text-neutral-500">
            Your order has been delivered. Thank you for using our service! We
            hope you had a great experience.
          </p>
        </div>

        {/* Driver */}
        <Card border="none" className="bg-primary/10 ">
          <div className="flex items-center gap-6">
            <Avatar  size={64} name={driver?.fullName ?? 'Assigned Driver'} />

            <div className="flex-1">
              <h3 className="font-semibold capitalize">
                {driver?.fullName ?? 'Assigned Driver'}
              </h3>
              <p className="text-xs text-neutral-500">Delivery Partner</p>

              <div className='flex items-center gap-6'>
           
               <div className='flex gap-1 items-center'>

                <span className="text-xs text-neutral-500">Rating: </span>
               <div className='flex items-center gap-1'>
                <Star fill="#D4AF37" stroke="0" size={16} />
                 <span className="text-xs text-neutral-700">
                  {driver?.rating ?? 'N/A'}
                </span>
               </div>
              </div>


               <p>

                <span className="text-xs text-neutral-500">Total Deliveries: </span>
                <span className="text-xs text-neutral-700">
                  {driver?.totalTrips ?? 'N/A'}
                </span>
              </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex gap-3">
          <Button
        
            size="icon"
            className="flex-1"
            href="/user/delivery"
          >
            Go to Delivery
          </Button>
        </div>
      </div>
    </Modal>
  );
}
