
'use client';

import { useState } from 'react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { Store, Loader2 } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { VendorDetail, ViewVendorModalProps } from '../types';
import { formatStatus, REVIEWABLE_STATUSES } from '../helpers';
import { statusStyles } from '../data';

export default function ViewVendorModal({
  isModalOpen,
  setIsModalOpen,
  vendor,
  isLoading,
  onAction,
}: ViewVendorModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  const isPending = vendor
    ? REVIEWABLE_STATUSES.includes(vendor.status)
    : false;

  const handleApprove = async () => {
    if (!vendor) return;
    setIsSubmitting(true);
    await onAction(vendor.id, 'APPROVED');
    setIsSubmitting(false);
  };

  const handleReject = async () => {
    if (!vendor) return;
    const trimmed = rejectionReason.trim();
    if (!trimmed) {
      setReasonError('Please provide a reason for rejection');
      return;
    }
    if (trimmed.length < 10) {
      setReasonError('Reason must be at least 10 characters');
      return;
    }
    setReasonError('');
    setIsSubmitting(true);
    await onAction(vendor.id, 'REJECTED', trimmed);
    setIsSubmitting(false);
    setShowRejectForm(false);
    setRejectionReason('');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowRejectForm(false);
    setRejectionReason('');
    setReasonError('');
  };

  return (
    <Modal isModalOpen={isModalOpen} onClose={handleClose}>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : vendor ? (
        <div className="space-y-6 py-4">
          {/* Profile Picture */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-100">
            {vendor.profilePicture ? (
              <Image
                src={vendor.profilePicture}
                alt={vendor.firstName}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Store size={40} className="text-neutral-300" />
              </div>
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 flex-wrap">
                {vendor.businessInfo?.businessName ??
                  `${vendor.firstName} ${vendor.lastName}`}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5 flex-wrap">
                {vendor.id}
              </p>
            </div>
            <span
              className={clsx(
                'rounded-full px-3 py-1 text-[10px] font-medium',
                statusStyles[vendor.status] ??
                  'bg-neutral-100 text-neutral-600',
              )}
            >
              {formatStatus(vendor.status)}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Owner</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base  flex-wrap">
                {vendor.firstName} {vendor.lastName}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Location</p>
              <p className="font-medium text-neutral-900 flex-wrap text-sm md:text-base">
                {vendor.businessInfo
                  ? `${vendor.businessInfo.city}, ${vendor.businessInfo.state}`
                  : '—'}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl  ">
              <p className="text-xs text-neutral-500 mb-1">Email</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {vendor.email}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Phone</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {vendor.phoneNumber ?? '—'}
              </p>
            </div>

            {vendor.businessInfo && (
              <>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Business Type</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {vendor.businessInfo.businessType}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">RC Number</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {vendor.businessInfo.registrationNumber}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Bank</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {vendor.businessInfo.bankName}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Account</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {vendor.businessInfo.accountNumber}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl col-span-2">
                  <p className="text-xs text-neutral-500 mb-1">Description</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {vendor.businessInfo.description}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Stores */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">
              Stores ({vendor.storeCount ?? 0})
            </p>
            {vendor.stores && vendor.stores.length > 0 ? (
              <div className="space-y-2">
                {vendor.stores.map((store) => (
                  <div
                    key={store.id}
                    className="p-3 rounded-lg bg-neutral-50 flex justify-between items-center"
                  >
                    <p className="font-medium">{store.storeName}</p>
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-[10px] font-medium',
                        statusStyles[store.status] ??
                          'bg-neutral-100 text-neutral-600',
                      )}
                    >
                      {formatStatus(store.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400">No stores yet</p>
            )}
          </div>

          {/* Actions */}
          {isPending && (
            <div className="pt-4 space-y-4">
              {showRejectForm ? (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">
                    Reason for rejection
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => {
                      setRejectionReason(e.target.value);
                      if (reasonError) setReasonError('');
                    }}
                    placeholder="Explain why this vendor is being declined..."
                    rows={4}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  {reasonError && (
                    <p className="text-xs text-red-500">{reasonError}</p>
                  )}
                  <div className="flex justify-around gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setShowRejectForm(false);
                        setRejectionReason('');
                        setReasonError('');
                      }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="red-secondary"
                      size="lg"
                      onClick={handleReject}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm Rejection'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-around gap-4">
                  <Button
                    variant="red-secondary"
                    size="lg"
                    onClick={() => setShowRejectForm(true)}
                    disabled={isSubmitting}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="green-secondary"
                    size="lg"
                    onClick={handleApprove}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Accept'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 text-center text-neutral-400">
          Failed to load vendor details
        </div>
      )}
    </Modal>
  );
}
