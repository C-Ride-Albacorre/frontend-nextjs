'use client';

import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Store, Loader2 } from 'lucide-react';
import { Vendor } from './types';
import clsx from 'clsx';
import { Button } from '@/components/ui/buttons/button';

const REVIEWABLE_STATUSES = ['UNDER_REVIEW', 'READY_FOR_REVIEW'];

type Props = {
  vendor: Vendor;
  onView: (vendor: Vendor) => void;
  onAction: (
    vendorId: string,
    action: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

const statusStyles: Record<string, string> = {
  APPROVED: 'bg-emerald-100 text-emerald-600',
  ACTIVE: 'bg-emerald-100 text-emerald-600',
  UNDER_REVIEW: 'bg-blue-100 text-blue-600',
  READY_FOR_REVIEW: 'bg-blue-100 text-blue-600',
  PENDING_VERIFICATION: 'bg-orange-100 text-orange-600',
  PENDING_ONBOARDING: 'bg-orange-100 text-orange-600',
  PENDING_DOCUMENTS: 'bg-orange-100 text-orange-600',
  PENDING_EMAIL_VERIFICATION: 'bg-orange-100 text-orange-600',
  PENDING_PHONE_VERIFICATION: 'bg-orange-100 text-orange-600',
  REJECTED: 'bg-red-100 text-red-600',
  SUSPENDED: 'bg-red-100 text-red-600',
};

function formatStatus(status: string) {
  return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function VendorRow({ vendor, onView, onAction }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPending = REVIEWABLE_STATUSES.includes(vendor.status);

  const businessName = vendor.businessInfo?.businessName ?? '—';
  const businessType = vendor.businessInfo?.businessType ?? '—';
  const rc = vendor.businessInfo?.registrationNumber ?? '—';
  const location = vendor.businessInfo
    ? `${vendor.businessInfo.city}, ${vendor.businessInfo.state}`
    : '—';

  const handleAction = async (action: 'APPROVED' | 'REJECTED') => {
    setIsSubmitting(true);
    await onAction(vendor.id, action);
    setIsSubmitting(false);
  };

  return (
    <tr className="border-b border-border hover:bg-neutral-50">
      {/* Vendor */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Store size={18} className="text-white" />
          </div>

          <div>
            <p className="font-medium">{businessName}</p>
            <p className="text-neutral-400 text-xs">
              {vendor.id.slice(0, 8)}...
            </p>
          </div>
        </div>
      </td>

      {/* Owner */}
      <td className="px-6 py-5">
        <p className="font-medium">
          {vendor.firstName} {vendor.lastName}
        </p>
        <p className="text-neutral-400 text-xs">{location}</p>
      </td>

      {/* Contact */}
      <td className="px-6 py-5">
        <p className="font-medium">{vendor.email}</p>
        <p className="text-neutral-400 text-xs">{vendor.phoneNumber ?? '—'}</p>
      </td>

      {/* Business Type */}
      <td className="px-6 py-5">
        <p className="font-medium">{businessType}</p>
        <p className="text-neutral-400 text-xs">{rc}</p>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={clsx(
            'px-1 py-1 text-[10px] rounded-full',
            statusStyles[vendor.status] ?? 'bg-neutral-100 text-neutral-600',
          )}
        >
          {formatStatus(vendor.status)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-end gap-1.5">
          {isPending &&
            (isSubmitting ? (
              <Loader2 size={18} className="animate-spin text-neutral-400" />
            ) : (
              <>
                <Button
                  title="Approve"
                  onClick={() => handleAction('APPROVED')}
                  disabled={isSubmitting}
                  variant="green-secondary"
                  size="icon"
                >
                  Approve
                </Button>
                <Button
                  title="Decline"
                  onClick={() => onView(vendor)}
                  disabled={isSubmitting}
                  variant="red-secondary"
                  size="icon"
                >
                  Reject
                </Button>
              </>
            ))}
          <Button onClick={() => onView(vendor)} variant="outline" size="icon">
            View
          </Button>
        </div>
      </td>
    </tr>
  );
}
