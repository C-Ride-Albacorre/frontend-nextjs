'use client';

import { useState } from 'react';
import { Store, Loader2 } from 'lucide-react';
import { AdminStore } from './types';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';

type Props = {
  store: AdminStore;
  onView: (store: AdminStore) => void;
  onAction: (
    storeId: string,
    action: 'ACTIVE' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-600',
  PENDING_APPROVAL: 'bg-orange-100 text-orange-600',
  SUSPENDED: 'bg-red-100 text-red-600',
  REJECTED: 'bg-red-100 text-red-600',
  CLOSED: 'bg-neutral-100 text-neutral-600',
};

function formatStatus(status: string) {
  return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function StoreRow({ store, onView, onAction }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isReviewable = store.status === 'PENDING_APPROVAL';

  const handleAction = async (action: 'ACTIVE' | 'REJECTED') => {
    setIsSubmitting(true);
    await onAction(store.id, action);
    setIsSubmitting(false);
  };

  return (
    <tr className="border-b border-border hover:bg-neutral-50">
      {/* Store */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Store size={18} className="text-white" />
          </div>
          <div>
            <p className="font-medium">{store.name}</p>
            <p className="text-neutral-400 text-xs">
              {store.id.slice(0, 8)}...
            </p>
          </div>
        </div>
      </td>

      {/* Owner */}
      <td className="px-6 py-5">
        <p className="font-medium">{store.user.name}</p>
        <p className="text-neutral-400 text-xs">{store.user.businessName}</p>
      </td>

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
            'px-1 py-1 text-[10px] rounded-full',
            statusStyles[store.status] ?? 'bg-neutral-100 text-neutral-600',
          )}
        >
          {formatStatus(store.status)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-end gap-1.5">
          {isReviewable &&
            (isSubmitting ? (
              <Loader2 size={18} className="animate-spin text-neutral-400" />
            ) : (
              <>
                <Button
                  title="Approve"
                  onClick={() => handleAction('ACTIVE')}
                  disabled={isSubmitting}
                  variant="green-secondary"
                  size="icon"
                >
                  Approve
                </Button>
                <Button
                  title="Decline"
                  onClick={() => onView(store)}
                  disabled={isSubmitting}
                  variant="red-secondary"
                  size="icon"
                >
                  Reject
                </Button>
              </>
            ))}
          <Button onClick={() => onView(store)} variant="outline" size="icon">
            View
          </Button>
        </div>
      </td>
    </tr>
  );
}
