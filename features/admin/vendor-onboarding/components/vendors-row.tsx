'use client';

import { useState } from 'react';
import { Store, LoaderCircle, UserRound } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/buttons/button';
import { Vendor } from '../types';
import { statusStyles } from '../data';
import { formatStatus, REVIEWABLE_STATUSES } from '../helpers';
import VendorActionModal from './vendor-action';

type Props = {
  vendor: Vendor;
  onView: (vendor: Vendor) => void;
};

export default function VendorRow({ vendor, onView }: Props) {
  const [submitAction, setSubmitAction] = useState<
    'ACTIVE' | 'REJECTED' | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPending = REVIEWABLE_STATUSES.includes(vendor.status);

  const businessName = vendor.businessInfo?.businessName ?? '—';
  const businessType = vendor.businessInfo?.businessType ?? '—';
  const rc = vendor.businessInfo?.registrationNumber ?? '—';
  // const location = vendor.businessInfo
  //   ? `${vendor.businessInfo.city}, ${vendor.businessInfo.state}`
  //   : '—';

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
        {/* Vendor */}
        <td className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <UserRound size={18} className="text-white" />
            </div>
            <div>
              <p className="font-medium capitalize">{businessName}</p>
              <p className="text-neutral-400 text-xs">
                {vendor.id.slice(0, 8)}...
              </p>
            </div>
          </div>
        </td>

        {/* Owner */}
        {/* <td className="px-6 py-5">
        <p className="font-medium">
          {vendor.firstName} {vendor.lastName}
        </p>
        <p className="text-neutral-400 text-xs">{location}</p>
      </td> */}

        {/* Contact */}
        <td className="px-6 py-5">
          <p className="font-medium">{vendor.email}</p>
          <p className="text-neutral-400 text-xs">
            {vendor.phoneNumber ?? '—'}
          </p>
        </td>

        {/* Business Type */}
        <td className="px-6 py-5">
          <p className="font-medium capitalize">{businessType}</p>
          <p className="text-neutral-400 text-xs">{rc}</p>
        </td>

        {/* Status */}
        <td className="px-6 py-5">
          <span
            className={clsx(
              'px-2 py-1 text-[10px] rounded-full',
              statusStyles[vendor.status] ?? 'bg-neutral-100 text-neutral-600',
            )}
          >
            {formatStatus(vendor.status)}
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
            <Button onClick={() => onView(vendor)} variant="white" size="icon">
              View
            </Button>
          </div>
        </td>
      </tr>

      <VendorActionModal
        vendorId={vendor.id}
        vendorName={businessName}
        isModalOpen={isModalOpen}
        onClose={handleCloseModal}
        actionStatus={submitAction}
        onSuccess={handleSuccess}
      />
    </>
  );
}
