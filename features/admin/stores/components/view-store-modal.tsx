'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import {
  Store as StoreIcon,
  LoaderCircle,
  Package,
  Mail,
  Phone,
  MapPin,
  ListOrdered,
  CreditCard,
  Timer,
  Store,
  User,
  Landmark,
} from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { StoreDetail, StoreListItem } from '../types';
import { getStoreByIdAction } from '../action';
import Textarea from '@/components/ui/inputs/textarea';
import Card from '@/components/layout/card';
import StoreActionModal from './store-action';

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
  store: StoreDetail | null;

};

export default function ViewStoreModal({
  isModalOpen,
  setIsModalOpen,
  store,
}: Props) {
  const [storeDetail, setStoreDetail] = useState<StoreListItem | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [submitAction, setSubmitAction] = useState<
    'ACTIVE' | 'REJECTED' | null
  >(null);
  const [isModalActionOpen, setIsModalActionOpen] = useState(false);

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

  const handleClose = () => {
    setIsModalOpen(false);
    setStoreDetail(null);
  };

  const handleAction = async (action: 'ACTIVE' | 'REJECTED') => {
    setIsModalActionOpen(true);
    setSubmitAction(action);

    // await onAction(store.id, action);
  };

  const handleSuccess = () => {
    setSubmitAction(null);
    setIsModalActionOpen(false);
    setIsModalOpen(false);
    setStoreDetail(null);
  };

  const handleCloseModal = () => {
    setSubmitAction(null);
    setIsModalActionOpen(false);
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={handleClose}>
        {isLoadingDetail ? (
          <div className="flex justify-center py-20">
            <LoaderCircle className="animate-spin text-primary" size={32} />
          </div>
        ) : storeDetail ? (
          <div className="space-y-8 py-4">
            {/* Store Logo */}
            <div className="relative w-full h-64 md:w-64 rounded-xl overflow-hidden bg-neutral-100">
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
                <h2 className="text-xl font-semibold text-neutral-900 flex-wrap capitalize">
                  {storeDetail.storeName}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5 flex-wrap">
                  {storeDetail.categoryId}
                </p>
              </div>
              <h6
                className={clsx(
                  'rounded-full px-3 py-1 text-[10px] font-medium',
                  statusStyles[storeDetail.status] ??
                    'bg-neutral-100 text-neutral-600',
                )}
              >
                {formatStatus(storeDetail.status)}
              </h6>
            </div>

            {/* Store Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <Mail size={18} className="text-green-100" />

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Email</p>
                  <p className="font-medium text-neutral-900 text-sm ">
                    {storeDetail.email}
                  </p>
                </div>
              </Card>

              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <Phone size={18} className="text-green-100" />
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Phone</p>
                  <p className="font-medium text-neutral-900 text-sm ">
                    {storeDetail.phoneNumber}
                  </p>
                </div>
              </Card>

              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <MapPin size={18} className="text-green-100 shrink-0" />
                <div>
                  {' '}
                  <p className="text-xs text-neutral-500 mb-1">Address</p>
                  <p className="font-medium text-neutral-900 text-sm">
                    {storeDetail.storeAddress}
                  </p>
                </div>
              </Card>

              {storeDetail.deliveryFee && (
                <Card
                  gap="md"
                  border="none"
                  className="flex items-start gap-3  bg-neutral-50"
                >
                  <CreditCard size={18} className="text-green-100" />

                  <div>
                    {' '}
                    <p className="text-xs text-neutral-500 mb-1">
                      Delivery Fee
                    </p>
                    <h6 className="font-medium text-primary text-sm ">
                      NGN {storeDetail.deliveryFee?.toLocaleString()}
                    </h6>
                  </div>
                </Card>
              )}

              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <ListOrdered size={18} className="text-green-100" />

                <div>
                  <p className="text-xs text-neutral-500 mb-1">
                    Daily Limit Order
                  </p>
                  <p className="font-medium text-neutral-900 text-sm ">
                    {storeDetail.dailyOrderLimit}
                  </p>
                </div>
              </Card>

              <Card
                gap="md"
                border="none"
                className="flex items-start gap-3  bg-neutral-50"
              >
                <Timer size={18} className="text-green-100" />

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Prep Time</p>
                  <p className="font-medium text-neutral-900 text-sm ">
                    {storeDetail.preparationTime} min
                  </p>
                </div>
              </Card>

              {storeDetail.storeDescription && (
                <div className="p-4 bg-neutral-50 rounded-xl md:col-span-2">
                  <p className="text-xs text-neutral-500 mb-1">Description</p>
                  <p className="font-medium text-neutral-900 text-sm ">
                    {storeDetail.storeDescription}
                  </p>
                </div>
              )}
            </div>

            {/* Vendor Info */}
            {storeDetail.user.businessInfo && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Vendor Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <User size={18} className="text-green-100" />
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Vendor</p>
                      <p className="font-medium text-neutral-900 text-sm ">
                        {storeDetail.user.firstName} {storeDetail.user.lastName}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <StoreIcon size={18} className="text-green-100" />

                    <div>
                      {' '}
                      <p className="text-xs text-neutral-500 mb-1">
                        Business Name
                      </p>
                      <p className="font-medium text-neutral-900 text-sm ">
                        {storeDetail.user.businessInfo.businessName}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <Landmark size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Bank</p>
                      <p className="font-medium text-neutral-900 text-sm capitalize">
                        {storeDetail.user.businessInfo.bankName}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <CreditCard size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        Account No.
                      </p>
                      <p className="font-medium text-neutral-900 text-sm ">
                        {storeDetail.user.businessInfo.accountNumber}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <User size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        Account Name.
                      </p>
                      <p className="font-medium text-neutral-900 text-sm capitalize">
                        {storeDetail.user.businessInfo.accountName}
                      </p>
                    </div>
                  </Card>

                  <Card
                    gap="md"
                    border="none"
                    className="flex items-start gap-3  bg-neutral-50"
                  >
                    <MapPin size={18} className="text-green-100" />

                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Location</p>
                      <p className="font-medium text-neutral-900 text-sm">
                        {storeDetail.user.businessInfo.address},{' '}
                        {storeDetail.user.businessInfo.city},{' '}
                        {storeDetail.user.businessInfo.state}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Products */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">
                Products ({storeDetail.products.length})
              </h4>
              {storeDetail.products.length > 0 ? (
                <div className="space-y-2">
                  {storeDetail.products.map((product) => (
                    <Card
                      border="none"
                      gap="md"
                      key={product.id}
                      className=" bg-neutral-50 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3 mb-0">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package size={14} className="text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">
                            {product.productName}
                          </p>
                          <div className="flex items-center gap-4">
                            <p className="text-xs text-neutral-400">
                              {product.subcategoryId}
                            </p>
                            <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
                            <p className="text-xs text-neutral-400">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <h6 className="font-medium text-sm">
                          NGN {product.basePrice?.toLocaleString()}
                        </h6>
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
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">No products yet</p>
              )}
            </div>

            {/* Actions */}
            {isPending && (
              <div className="pt-4 space-y-4">
                <div className="flex justify-around gap-4">
                  <Button
                    variant="red-secondary"
                    size="icon"
                    onClick={() => handleAction('REJECTED')}
                  >
                  Reject
                  </Button>
                  <Button
                    variant="green-secondary"
                    size="icon"
                    onClick={() => handleAction('ACTIVE')}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-400">
            Failed to load store details
          </div>
        )}
      </Modal>

      <StoreActionModal
        storeId={storeDetail?.id}
        storeName={storeDetail?.storeName}
        isModalOpen={isModalActionOpen}
        onClose={handleCloseModal}
        actionStatus={submitAction}
        onSuccess={handleSuccess}
      />
    </>
  );
}
