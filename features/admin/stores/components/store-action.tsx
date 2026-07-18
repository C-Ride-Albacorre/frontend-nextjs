'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import Textarea from '@/components/ui/inputs/textarea';

import { LoaderCircle, Store } from 'lucide-react';
import { approveStoreAction } from '../action';

interface StoreActionModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  storeId?: string;
  storeName?: string;
  actionStatus: 'ACTIVE' | 'REJECTED' | null;
  onSuccess?: () => void;
}

const DECLINE_REASONS = [
  'Store is not compliant with our policies',
  'Store has received multiple complaints',
  'Store is not providing quality products or services',
  'Other',
];

export default function StoreActionModal({
  storeId,
  storeName,
  isModalOpen,
  onClose,
  actionStatus,
  onSuccess,
}: StoreActionModalProps) {
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



  const isDecline = actionStatus === 'REJECTED';

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

        if (!storeId ) {
            toast.error('Store ID is missing');
            return;
        }

        if (!storeName) {
            toast.error('Store name is missing');
            return;
        }

        if (!actionStatus) {
            toast.error('Action status is missing');
            return;
        }


      const result = await approveStoreAction(
        storeId,

        { action: actionStatus, rejectionReason: actionReason },
      );

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
            {isDecline ? 'Reject Store' : 'Accept Store'}
          </h4>

          <p className="text-sm leading-6 text-neutral-500">
            Are you sure you want to{' '}
            <span className="font-medium">
              {isDecline ? 'reject' : 'accept'}
            </span>{' '}
            the store from{' '}
            <span className="font-medium text-neutral-800 capitalize font-heading">
              {storeName}
            </span>
            ?
          </p>
        </div>

        {isDecline && (
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <h6 className="mb-3 text-sm font-medium text-neutral-800">
                Why are you declining this store?
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
              'Reject Store'
            ) : (
              'Accept Store'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
