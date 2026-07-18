'use client';

import { useState } from 'react';
import { Store, LoaderCircle, UserRound } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/buttons/button';
import { statusStyles } from '../data';
import { Driver } from '../types';
import { formatStatus, REVIEWABLE_STATUSES } from '../helpers';
import DriverActionModal from './driver-action';

type Props = {
  driver: Driver;
  onView: (driver: Driver) => void;
 
};

export default function DriverRow({ driver, onView}: Props) {
  const [submitAction, setSubmitAction] = useState<
    'ACTIVE' | 'REJECTED' | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPending = REVIEWABLE_STATUSES.includes(driver.status);

  const name = driver?.name ?? '—';

   const handleAction = async (action: 'ACTIVE' | 'REJECTED') => {
    setIsModalOpen(true);
    setSubmitAction(action);

  };

  const handleSuccess = () => {
    setSubmitAction(null);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setSubmitAction(null);
    setIsModalOpen(false);
  };

  return (

   <>
    <tr className="border-b border-border hover:bg-neutral-50 text-sm">
      {/* Driver */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <UserRound size={18} className="text-white" />
          </div>
          <div>
            <p className="font-medium capitalize">{name}</p>
            <p className="text-neutral-400 text-xs">
              {driver.id.slice(0, 10)}...
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
          
              <>
                <Button
                  onClick={() => handleAction('ACTIVE')}
              
                  variant="green-secondary"
                  size="icon"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleAction('REJECTED')}
                  variant="red-secondary"
                  size="icon"
                >
                  Reject
                </Button>
              </>
            }
          <Button onClick={() => onView(driver)} variant="white" size="icon">
            View
          </Button>
        </div>
      </td>
    </tr>

    <DriverActionModal
            driverId={driver.id}
            driverName={name}
            isModalOpen={isModalOpen}
            onClose={handleCloseModal}
            actionStatus={submitAction}
            onSuccess={handleSuccess}
          />
   </>
   
  );
}
