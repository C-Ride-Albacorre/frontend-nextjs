
'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { Store as StoreIcon, Loader2, Package } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { Store, StoreDetail } from '../types';
import { getStoreByIdAction } from '../action';
import Textarea from '@/components/ui/inputs/textarea';

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-600',
  APPROVED: 'bg-emerald-100 text-emerald-600',
  PENDING_APPROVAL: 'bg-orange-100 text-orange-600',
  REJECTED: 'bg-red-100 text-red-600',
  SUSPENDED: 'bg-red-100 text-red-600',
  INACTIVE: 'bg-neutral-100 text-neutral-500',
};

function formatStatus(status: string) {
  return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  store: Store | null;
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
  onAction,
}: Props) {
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  useEffect(() => {
    if (!isModalOpen || !store) return;

    let cancelled = false;

    const fetchDetail = async () => {
      setIsLoadingDetail(true);
      setStoreDetail(null);
      try {
        const detail = await getStoreByIdAction(store.id);
        if (!cancelled) setStoreDetail(detail);
      } catch {
        if (!cancelled) setStoreDetail(null);
      } finally {
        if (!cancelled) setIsLoadingDetail(false);
      }
    };

    fetchDetail();

    return () => {
      cancelled = true; // prevent state update if modal closes mid-fetch
    };
  }, [isModalOpen, store?.id]);

  const isPending = store?.status === 'PENDING_APPROVAL';

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
    setStoreDetail(null);
    setShowRejectForm(false);
    setRejectionReason('');
    setReasonError('');
  };

  return (
    <Modal isModalOpen={isModalOpen} onClose={handleClose}>
      {isLoadingDetail ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : storeDetail ? (
        <div className="space-y-6 py-4">
          {/* Store Logo */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-100">
            {storeDetail.storeLogo ? (
              <Image
                src={storeDetail.storeLogo}
                alt={storeDetail.storeName}
                fill
                className="object-contain"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <StoreIcon size={40} className="text-neutral-300" />
              </div>
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {storeDetail.storeName}
              </h2>
              <p className="text-sm text-neutral-500 mt-0.5">
                {storeDetail.storeCategory}
              </p>
            </div>
            <span
              className={clsx(
                'rounded-full px-3 py-1 text-[10px] font-medium',
                statusStyles[storeDetail.status] ??
                  'bg-neutral-100 text-neutral-600',
              )}
            >
              {formatStatus(storeDetail.status)}
            </span>
          </div>

          {/* Store Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Email</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {storeDetail.email}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Phone</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {storeDetail.phoneNumber}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Address</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {storeDetail.storeAddress}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Delivery Fee</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                ₦{storeDetail.deliveryFee?.toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Min. Order</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {storeDetail.minimumOrder}
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-500 mb-1">Prep Time</p>
              <p className="font-medium text-neutral-900 text-sm md:text-base">
                {storeDetail.preparationTime} min
              </p>
            </div>

            {storeDetail.storeDescription && (
              <div className="p-4 bg-neutral-50 rounded-xl md:col-span-2">
                <p className="text-xs text-neutral-500 mb-1">Description</p>
                <p className="font-medium text-neutral-900 text-sm md:text-base">
                  {storeDetail.storeDescription}
                </p>
              </div>
            )}
          </div>

          {/* Vendor Info */}
          {storeDetail.user.businessInfo && (
            <div className="space-y-3">
              <p className="text-sm font-semibold">Vendor Information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Vendor</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {storeDetail.user.firstName} {storeDetail.user.lastName}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Business</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {storeDetail.user.businessInfo.businessName}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Bank</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {storeDetail.user.businessInfo.bankName}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Account No.</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {storeDetail.user.businessInfo.accountNumber}
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl md:col-span-2">
                  <p className="text-xs text-neutral-500 mb-1">Location</p>
                  <p className="font-medium text-neutral-900 text-sm md:text-base">
                    {storeDetail.user.businessInfo.address},{' '}
                    {storeDetail.user.businessInfo.city},{' '}
                    {storeDetail.user.businessInfo.state}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">
              Products ({storeDetail.products.length})
            </p>
            {storeDetail.products.length > 0 ? (
              <div className="space-y-2">
                {storeDetail.products.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 rounded-lg bg-neutral-50 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {product.productName}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {product.productCategory} · SKU: {product.sku}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        ₦{product.basePrice?.toLocaleString()}
                      </p>
                      <span
                        className={clsx(
                          'text-[10px] rounded-full px-2 py-0.5',
                          product.stockStatus === 'IN_STOCK'
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-red-100 text-red-600',
                        )}
                      >
                        {formatStatus(product.stockStatus)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400">No products yet</p>
            )}
          </div>

          {/* Actions */}
          {isPending && (
            <div className="pt-4 space-y-4">
              {showRejectForm ? (
                <div className="space-y-3">
                  <Textarea
                    id="reason"
                    label="Reason for rejection"
                    placeholder="Explain why this store is being declined..."
                    value={rejectionReason}
                    onChange={(e) => {
                      setRejectionReason(e.target.value);
                      if (reasonError) setReasonError('');
                    }}
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
          Failed to load store details
        </div>
      )}
    </Modal>
  );
}
