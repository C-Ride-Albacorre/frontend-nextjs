'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';
import {
  Edit,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Truck,
  Timer,
  ShoppingBag,
} from 'lucide-react';
import Image from 'next/image';
import { ViewStoreModalProps } from '../types';
import Card from '@/components/layout/card';
import { formatDate } from '@/helpers/date-formatter';

export default function ViewStoreModal({
  isModalOpen,
  setIsModalOpen,
  store,
  onEdit,
}: ViewStoreModalProps) {
  if (!store) return null;

  console.log(' store', store);

  const {
    storeName,
    categoryId,
    storeAddress,
    phoneNumber,
    email,
    storeDescription,
    dailyOrderLimit,
    deliveryFee,
    preparationTime,
    operatingHours,
    storeLogo,
    status,
    createdAt,
    updatedAt,
  } = store;

  const statusMap = {
    ACTIVE: {
      label: 'Active',
      className: 'bg-emerald-500/10 text-emerald-600',
    },
    PENDING_APPROVAL: {
      label: 'Pending',
      className: 'bg-amber-100 text-amber-600',
    },
    DRAFT: {
      label: 'Draft',
      className: 'bg-amber-500/10 text-amber-600',
    },
    INACTIVE: {
      label: 'Inactive',
      className: 'bg-neutral-100 text-neutral-600',
    },
  };

  const currentStatus =
    statusMap[(status || 'INACTIVE') as keyof typeof statusMap] ??
    statusMap.INACTIVE;

  // Format currency
  const formatCurrency = (amount?: number) =>
    amount != null ? `₦${amount.toLocaleString()}` : 'N/A';

  const handleEdit = () => {
    setIsModalOpen(false);
    onEdit?.();
  };

  return (
    <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="space-y-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold capitalize text-neutral-900">
              {storeName}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">{categoryId}</p>
          </div>

          <span
            className={clsx(
              'rounded-full px-3 py-1 text-xs font-medium',
              currentStatus.className,
            )}
          >
            {currentStatus.label}
          </span>
        </div>

        {/* Store Logo */}
        
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden">
            <Image
              src={storeLogo ??'/assets/image/store-placeholder.png'}
              alt={storeName ?? 'Store logo'}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        

        {/* Contact & Location Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            gap="md"
            border="none"
            className="flex items-start gap-3  bg-neutral-50"
          >
            <MapPin size={16} className="text-green-100 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-neutral-500 mb-1 ">Address</p>
              <p className="font-medium text-neutral-900 text-sm capitalize leading-6">
                {storeAddress}
              </p>
            </div>
          </Card>

          <Card
            gap="md"
            border="none"
            className="flex items-start gap-3  bg-neutral-50"
          >
            <Phone size={16} className="text-green-100 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-neutral-500 mb-1">Phone</p>
              <p className="font-medium text-neutral-900 text-sm">
                {phoneNumber}
              </p>
            </div>
          </Card>

          <Card
            gap="md"
            border="none"
            className="flex items-start gap-3  bg-neutral-50"
          >
            <Mail size={16} className="text-green-100 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-neutral-500 mb-1">Email</p>
              <p className="font-medium text-neutral-900 text-sm">{email}</p>
            </div>
          </Card>
        </div>

        {/* Pricing & Delivery Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card gap="md" border="none" className=" bg-neutral-50">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag size={16} className="text-green-100" />
              <p className="text-xs text-neutral-500">Daily Order Limit</p>
            </div>
            <p className="font-medium text-neutral-900 text-sm">{dailyOrderLimit}</p>
          </Card>

          <Card gap="md" border="none" className=" bg-neutral-50">
            <div className="flex items-center gap-2 mb-1">
              <Truck size={16} className="text-green-100" />
              <p className="text-xs text-neutral-500">Delivery Fee</p>
            </div>
            <p className="font-medium text-neutral-900 text-sm">
              {formatCurrency(deliveryFee)}
            </p>
          </Card>

          <Card gap="md" border="none" className=" bg-neutral-50">
            <div className="flex items-center gap-2 mb-1">
              <Timer size={16} className="text-green-100" />
              <p className="text-xs text-neutral-500">Prep. Time</p>
            </div>
            <p className="font-medium text-neutral-900 text-sm">
              {preparationTime ? `${preparationTime} min` : 'N/A'}
            </p>
          </Card>
        </div>

        {/* Description */}
        {storeDescription && (
          <Card gap="md" border="none" className=" bg-neutral-50">
            <p className="text-xs text-neutral-500 mb-2">Description</p>
            <p className="text-neutral-900 text-sm leading-relaxed">
              {storeDescription}
            </p>
          </Card>
        )}

        {/* Operating Hours */}
        {operatingHours && operatingHours.length > 0 && (
          <Card gap="md" border="none" className=" bg-neutral-50 ">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-green-100" />
              <p className="text-xs text-neutral-500">Operating Hours</p>
            </div>
            <div className="space-y-6">
              {operatingHours.map((hour) => (
                <div
                  key={hour.dayOfWeek}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-neutral-900 text-sm capitalize">
                    {hour.dayOfWeek.charAt(0) +
                      hour.dayOfWeek.slice(1).toLowerCase()}
                  </span>
                  {hour.isOpen ? (
                    <span className="text-neutral-900 text-sm font-medium">
                      {hour.openingTime} - {hour.closingTime}
                    </span>
                  ) : (
                    <span className="text-neutral-400">Closed</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Timestamps */}
        <div className="flex justify-between text-xs text-neutral-400 pt-6 border-t border-neutral-100">
          <span>Created: {formatDate(createdAt)}</span>
          <span>Updated: {formatDate(updatedAt)}</span>
        </div>

        {/* Actions */}
     <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
          <Button
            variant="white"
            size="icon"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>

          {onEdit && (
            <Button variant="primary" size="icon" onClick={handleEdit}>
              <Edit size={16} />
              Edit Store
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
