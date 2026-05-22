'use client';

import { useState } from 'react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import {  Loader, Car } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

import { statusStyles } from '../data';
import { formatStatus, REVIEWABLE_STATUSES } from '../helpers';
import { ViewDriverModalProps } from '../types';

export default function ViewDriverModal({
  isModalOpen,
  setIsModalOpen,
  driver,
  isLoading,
  onAction,
}: ViewDriverModalProps ) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  console.log(' Driver details in modal:', driver);

  const isPending = driver
    ? REVIEWABLE_STATUSES.includes(driver.status)
    : false;

  const handleApprove = async () => {
    if (!driver) return;
    setIsSubmitting(true);
    await onAction(driver.id, 'APPROVED');
    setIsSubmitting(false);
  };

  const handleReject = async () => {
    if (!driver) return;
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
    await onAction(driver.id, 'REJECTED', trimmed);
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
          <Loader className="animate-spin text-primary" size={32} />
        </div>
      ) : driver ? (
        <div className="space-y-6 py-4">
          {/* Profile Picture */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-100">
            {driver.profilePicture ? (
              <Image
                src={driver.profilePicture}
                alt={driver.firstName}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Car size={40} className="text-neutral-300" />
              </div>
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 flex-wrap">
                {driver.name ??
                  `${driver.firstName} ${driver.lastName}`}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5 flex-wrap">
                {driver.id}
              </p>
            </div>
            <span
              className={clsx(
                'rounded-full px-3 py-1 text-[10px] font-medium',
                statusStyles[driver.status] ??
                  'bg-neutral-100 text-neutral-600',
              )}
            >
              {formatStatus(driver.status)}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Driver</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base  flex-wrap">
                {driver.firstName} {driver.lastName}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Address Information</p>
              <div className="font-medium text-neutral-900 flex-wrap text-sm md:text-base">
                {driver.driverProfile ? (
                  <>
                    <p>{driver.driverProfile.address}</p>
                    <p>{driver.driverProfile.city}</p>
                    <p>{driver.driverProfile.state}</p>
                  </>
                ) : (
                  '—'
                )}
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl  ">
              <p className="text-xs text-neutral-500 mb-1">Email</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {driver.email}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Phone</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {driver.phoneNumber ?? '—'}
              </p>
            </div>

            {driver.driverProfile && (
              <>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Vehicle Type</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base capitalize">
                    {driver.driverProfile.vehicleType?.toLocaleLowerCase()
}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Vehicle Make</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {driver.driverProfile.vehicleMake}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Vehicle Model</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {driver.driverProfile.vehicleModel}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">License Plate</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {driver.driverProfile.licensePlate}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl col-span-2">
                  <p className="text-xs text-neutral-500 mb-1">Status</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base capitalize">
                    {driver.driverProfile.status?.toLocaleLowerCase()}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Documents */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Documents</p>

            {driver.documents && driver.documents.length > 0 ? (
              <ul className="space-y-2">
                {driver.documents.map((document) => {
                  const url = document.documentUrl;
                  const isImage = /\.(jpg|jpeg|png|webp|avif|gif)(\?|$)/i.test(
                    url,
                  );
                  const isPdf = /\.pdf(\?|$)/i.test(url);

                  return (
                    <li
                      key={document.id}
                      className="rounded-xl border border-neutral-100 overflow-hidden"
                    >
                      {/* Header row */}
                      <div className="p-3 bg-neutral-50 flex justify-between items-center">
                        <p className="text-sm font-medium text-neutral-800">
                          {document.documentType.replace(/_/g, ' ')}
                        </p>
                        <div className="flex items-center gap-2">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary font-medium hover:underline"
                          >
                            Open
                          </a>

                          <a
                            href={url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-500 hover:text-neutral-700 font-medium hover:underline"
                          >
                            Download
                          </a>
                        </div>
                      </div>

                      {/* Preview — images only */}
                      {isImage && (
                        <div className="relative w-full h-40 bg-neutral-100">
                          <Image
                            src={url}
                            alt={document.documentType}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}

                      {/* PDF indicator */}
                      {isPdf && (
                        <div className="px-3 py-2 bg-white flex items-center gap-2 text-xs text-neutral-400">
                          <span>📄</span>
                          <span>PDF document — click Open to view</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-neutral-400">No documents yet</p>
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
          Failed to load driver details
        </div>
      )}
    </Modal>
  );
}
