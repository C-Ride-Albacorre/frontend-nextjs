'use client';

import { useState } from 'react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { Store, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { StoreDetail } from './types';
import clsx from 'clsx';

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

type ViewStoreModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  store: StoreDetail | null;
  isLoading: boolean;
  onAction: (
    storeId: string,
    action: 'ACTIVE' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

export default function ViewStoreModal({
  isModalOpen,
  setIsModalOpen,
  store,
  isLoading,
  onAction,
}: ViewStoreModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  const isReviewable = store?.status === 'PENDING_APPROVAL';

  const handleApprove = async () => {
    if (!store) return;
    setIsSubmitting(true);
    await onAction(store.id, 'ACTIVE');
    setIsSubmitting(false);
  };

  const handleReject = async () => {
    if (!store) return;
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
    await onAction(store.id, 'REJECTED', trimmed);
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
      ) : store ? (
        <div className="space-y-6 py-4">
          {/* Logo */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-100">
            {store.storeLogo ? (
              <Image
                src={store.storeLogo}
                alt={store.storeName}
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
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {store.storeName}
              </h2>
              <p className="text-sm text-neutral-500 mt-0.5">
                {store.storeCategory}
              </p>
            </div>

            <span
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-medium',
                statusStyles[store.status] ?? 'bg-neutral-100 text-neutral-600',
              )}
            >
              {formatStatus(store.status)}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Owner</p>
              <p className="font-medium text-neutral-900">
                {store.user.firstName} {store.user.lastName}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Address</p>
              <p className="font-medium text-neutral-900">
                {store.storeAddress}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Email</p>
              <p className="font-medium text-neutral-900">{store.email}</p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Phone</p>
              <p className="font-medium text-neutral-900">
                {store.phoneNumber}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Min. Order</p>
              <p className="font-medium text-neutral-900">
                {store.minimumOrder}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Prep Time</p>
              <p className="font-medium text-neutral-900">
                {store.preparationTime} mins
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Delivery Fee</p>
              <p className="font-medium text-neutral-900">
                ₦{(store.deliveryFee ?? 0).toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Products</p>
              <p className="font-medium text-neutral-900">
                {store.products?.length ?? 0}
              </p>
            </div>

            {store.storeDescription && (
              <div className="p-4 bg-neutral-50 rounded-xl col-span-2">
                <p className="text-xs text-neutral-500 mb-1">Description</p>
                <p className="font-medium text-neutral-900">
                  {store.storeDescription}
                </p>
              </div>
            )}
          </div>

          {/* Products list */}
          {store.products && store.products.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold">
                Products ({store.products.length})
              </p>
              <div className="space-y-2">
                {store.products.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 rounded-lg bg-neutral-50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{product.productName}</p>
                      <p className="text-xs text-neutral-400">
                        {product.productCategory} · ₦
                        {(product.basePrice ?? 0).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-[10px] font-medium',
                        product.productStatus === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-neutral-100 text-neutral-600',
                      )}
                    >
                      {formatStatus(product.productStatus)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions – only for pending approval */}
          {isReviewable && (
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
                    placeholder="Explain why this store is being declined..."
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
                      {isSubmitting ? 'Processing...' : 'Confirm Decline'}
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
          Failed to load store details
        </div>
      )}
    </Modal>
  );
}
