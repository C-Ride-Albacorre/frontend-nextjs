'use client';

import { useState } from 'react';
import { Store as StoreIcon, LoaderCircle } from 'lucide-react';
import clsx from 'clsx';
import { StoreRowProps } from '../types';
import { Button } from '@/components/ui/buttons/button';
import { statusStyles } from '../data';
import { formatStatus } from '../helpers';
import StoreActionModal from './store-action';


export default function StoreRow({ store, onView, onAction }: StoreRowProps) {
  const [submitAction, setSubmitAction] = useState<
    'ACTIVE' | 'REJECTED' | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPending = store.status === 'PENDING_APPROVAL';

  console.log('store', store);

  const handleAction = async (action: 'ACTIVE' | 'REJECTED') => {
    setIsModalOpen(true);
    setSubmitAction(action);

    // await onAction(store.id, action);
  };

  const handleSuccess = () => {
    setSubmitAction(null);
    setIsModalOpen(false);
  }


  const handleCloseModal = () => {
    setSubmitAction(null);
    setIsModalOpen(false);
  }

  return (
    <>
      <tr className="border-b border-border hover:bg-neutral-50 text-sm">
        {/* Store */}
        <td className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-b from-primary to-primary-hover flex items-center justify-center">
              <StoreIcon size={18} className="text-white" />
            </div>
            <div>
              <p className="font-medium capitalize">{store.name}</p>
              <p className="text-neutral-400 text-xs">
                {store.id.slice(0, 8)}...
              </p>
            </div>
          </div>
        </td>

        {/* Vendor */}
        {/* <td className="px-6 py-5">
        <p className="font-medium">{store.user.name}</p>
        <p className="text-neutral-400 text-xs">{store.user.businessName}</p>
      </td> */}

        {/* Contact */}
        <td className="px-6 py-5">
          <p className="font-medium">{store.email}</p>
          <p className="text-neutral-400 text-xs">{store.phoneNumber}</p>
        </td>

        {/* Products */}
        <td className="px-6 py-5">
          <p className="font-medium">{store.totalProducts}</p>
        </td>

        {/* Status */}
        <td className="px-6 py-5">
          <span
            className={clsx(
              'px-2 py-1 text-[10px] rounded-full',
              statusStyles[store.status] ?? 'bg-neutral-100 text-neutral-600',
            )}
          >
            {formatStatus(store.status)}
          </span>
        </td>

        {/* Actions */}
        <td className="px-6 py-5">
          <div className="flex justify-end gap-1.5">
            {isPending && (
              <>
                <Button
                  onClick={() => handleAction('ACTIVE')}
                  disabled={submitAction !== null}
                  variant="green-secondary"
                  size="icon"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleAction('REJECTED')}
                  disabled={submitAction !== null}
                  variant="red-secondary"
                  size="icon"
                >
                  Reject
                </Button>
              </>
            )}
            <Button onClick={() => onView(store)} variant="white" size="icon">
              View
            </Button>
          </div>
        </td>
      </tr>

      <StoreActionModal
        storeId={store.id}
        storeName={store.name}
        isModalOpen={isModalOpen}
        onClose={handleCloseModal}
        actionStatus={submitAction}
        onSuccess={handleSuccess}
      />
    </>
  );
}
