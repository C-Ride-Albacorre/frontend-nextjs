'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import Textarea from '@/components/ui/inputs/textarea';

import { vendorOrderAction } from '../action';

interface OrderActionModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  orderId: string;
  customer: string;
  actionStatus: 'ACCEPT' | 'REJECT';
}

export default function OrderActionModal({
  orderId,
  customer,
  isModalOpen,
  onClose,
  actionStatus,
}: OrderActionModalProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const isReject = actionStatus === 'REJECT';

  const handleAction = () => {
    const actionReason = isReject
      ? reason.trim()
      : 'Vendor accepted order';

    if (isReject && !actionReason) {
      toast.error('Please provide a reason for rejection');

      setError('Reason is required for rejecting an order');
      return;
    }

    startTransition(async () => {
      const result = await vendorOrderAction({
        orderId,

        payload: {
          action: actionStatus,
          reason: actionReason,
        },
      });


      console.log('Action Result:', result);

      if (result.success) {
        toast.success(result.message);

        setReason('');

        onClose();

      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={onClose}
      wrapperClassName={isReject ? 'max-w-md' : 'max-w-sm'}
    >
      <div className="flex flex-col items-center space-y-5">
        <div className="space-y-3 text-center">
          <h4 className="text-lg font-semibold">
            {isReject ? 'Reject Order' : 'Accept Order'}
          </h4>

          <p className="text-sm leading-6 text-neutral-500">
            Are you sure you want to{' '}
            <span className="font-medium">
              {isReject ? 'reject' : 'accept'}
            </span>{' '}
            the order from{' '}
            <span className="font-medium text-neutral-800 capitalize">
              {customer}
            </span>
            ?
          </p>
        </div>

        {isReject && (
          <div className="w-full">
            <Textarea
              name="reason"
              placeholder="Reason for rejection"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              errorMessage={error}
            />
          </div>
        )}

        <div className="flex w-full gap-3">
          <Button
            variant="outline"
            size="full"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant={isReject ? 'red' : 'green'}
            size="full"
            onClick={handleAction}
            loading={isPending}
            disabled={isPending}
          >
            {isReject ? 'Reject Order' : 'Accept Order'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}