'use client';

import { useState } from 'react';
import { Store, LoaderCircle, UserRound } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/buttons/button';
import { statusStyles } from '../data';
import { Driver } from '../types';
import { formatStatus, REVIEWABLE_STATUSES } from '../helpers';

type Props = {
  driver: Driver;
  onView: (driver: Driver) => void;
  onAction: (
    driverId: string,
    action: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

export default function DriverRow({ driver, onView, onAction }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPending = REVIEWABLE_STATUSES.includes(driver.status);

  const name = driver?.name ?? '—';

  const handleAction = async (action: 'APPROVED' | 'REJECTED') => {
    setIsSubmitting(true);
    await onAction(driver.id, action);
    setIsSubmitting(false);
  };

  return (
    <tr className="border-b border-border hover:bg-neutral-50 text-sm">
      {/* Driver */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <UserRound size={18} className="text-white" />
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-neutral-400 text-xs">
              {driver.id.slice(0, 8)}...
            </p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-6 py-5">
        <p className="font-medium">{driver.email}</p>
        <p className="text-neutral-400 text-xs">{driver.phoneNumber ?? '—'}</p>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={clsx(
            'px-2 py-1 text-[10px] rounded-full',
            statusStyles[driver.status] ?? 'bg-neutral-100 text-neutral-600',
          )}
        >
          {formatStatus(driver.status)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-end gap-1.5">
          {isPending &&
            (isSubmitting ? (
              <LoaderCircle
                size={18}
                className="animate-spin text-neutral-400"
              />
            ) : (
              <>
                <Button
                  onClick={() => handleAction('APPROVED')}
                  disabled={isSubmitting}
                  variant="green-secondary"
                  size="icon"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => onView(driver)}
                  disabled={isSubmitting}
                  variant="red-secondary"
                  size="icon"
                >
                  Reject
                </Button>
              </>
            ))}
          <Button onClick={() => onView(driver)} variant="outline" size="icon">
            View
          </Button>
        </div>
      </td>
    </tr>
  );
}
