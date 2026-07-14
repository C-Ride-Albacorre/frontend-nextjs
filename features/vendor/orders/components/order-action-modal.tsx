'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import Textarea from '@/components/ui/inputs/textarea';

import { vendorOrderAction } from '../action';
import { LoaderCircle } from 'lucide-react';

interface OrderActionModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  orderId: string;
  customer: string;
  actionStatus: 'ACCEPT' | 'DECLINE';
  onSuccess?: () => void;
}

const DECLINE_REASONS = [
  'Out of stock',
  'Unable to fulfill order at this time',
  'Item no longer available',
  'Delivery constraints',
  'Other',
];

export default function OrderActionModal({
  orderId,
  customer,
  isModalOpen,
  onClose,
  actionStatus,
  onSuccess,
}: OrderActionModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setSelectedReason('');
    setCustomReason('');
    setError('');
    onClose();
  };

  const isDecline = actionStatus === 'DECLINE';

  const handleAction = () => {
    let actionReason = 'Vendor accepted order';

    if (isDecline) {
      if (!selectedReason) {
        toast.error('Please select a reason');
        return;
      }

      actionReason =
        selectedReason === 'Other'
          ? customReason.trim() || 'Other'
          : selectedReason;
    }

    startTransition(async () => {
      const result = await vendorOrderAction({
        orderId,
        payload: {
          action: actionStatus,
          reason: actionReason,
        },
      });

      if (result.success) {
        toast.success(result.message);

        setSelectedReason('');
        setCustomReason('');
        handleClose();

        // Trigger immediate refresh
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={handleClose}
      wrapperClassName={isDecline ? 'max-w-md' : 'max-w-sm'}
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="space-y-3 text-center">
          <h4 className="text-lg font-semibold">
            {isDecline ? 'Decline Order' : 'Accept Order'}
          </h4>

          <p className="text-sm leading-6 text-neutral-500">
            Are you sure you want to{' '}
            <span className="font-medium">
              {isDecline ? 'decline' : 'accept'}
            </span>{' '}
            the order from{' '}
            <span className="font-medium text-neutral-800 capitalize font-heading">
              {customer}
            </span>
            ?
          </p>
        </div>

        {isDecline && (
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <h6 className="mb-3 text-sm font-medium text-neutral-800">
                Why are you declining this order?
              </h6>

              <div className="space-y-2">
                {DECLINE_REASONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSelectedReason(item);
                      setError('');
                    }}
                    className={`
              w-full rounded-lg border px-4 py-3 text-left text-sm transition
              ${
                selectedReason === item
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-border hover:border-red-200'
              }
            `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {selectedReason === 'Other' && (
              <Textarea
                name="customReason"
                placeholder="Additional details (optional)"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                errorMessage={error}
              />
            )}
          </div>
        )}

        <div className="flex w-full gap-3">
          <Button
            variant="white"
            size="icon"
            onClick={handleClose}
            disabled={isPending}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            variant={isDecline ? 'red' : 'green'}
            size="icon"
            onClick={handleAction}
            loading={isPending}
            disabled={isPending}
            className="flex-1"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle size={18} className="animate-spin" />{' '}
                <span>{isDecline ? 'Declining...' : 'Accepting...'}</span>
              </div>
            ) : isDecline ? (
              'Decline Order'
            ) : (
              'Accept Order'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
