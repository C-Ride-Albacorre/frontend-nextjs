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

export default function ViewStoreModal({
  isModalOpen,
  setIsModalOpen,
  store,
  onEdit,
}: ViewStoreModalProps) {
  if (!store) return null;

  const {
    storeName,
    categoryId,
    storeAddress,
    phoneNumber,
    email,
    storeDescription,
    minimumOrder,
    deliveryFee,
    preparationTime,
    operatingHours,
    storeLogo,
    status,
    createdAt,
    updatedAt,
  } = store;

  // Format status display
  const statusDisplay =
    status === 'ACTIVE'
      ? 'Active'
      : status === 'PENDING_APPROVAL'
        ? 'Pending'
        : status === 'DRAFT'
          ? 'Draft'
          : (status?.toLowerCase() ?? 'Active');

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
            <h2 className="text-2xl font-semibold text-neutral-900">
              {storeName}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">{categoryId}</p>
          </div>

          <span
            className={clsx(
              'rounded-full px-3 py-1 text-xs font-medium capitalize',
              {
                'bg-emerald-500/10 text-emerald-600': status === 'ACTIVE',
                'bg-amber-100 text-amber-600': status === 'PENDING_APPROVAL',
                'bg-amber-500/10 text-amber-600': status === 'DRAFT',
                'bg-neutral-100 text-neutral-600':
                  !status || status === 'INACTIVE',
              },
            )}
          >
            {statusDisplay}
          </span>
        </div>

        {/* Store Logo */}
        {storeLogo ? (
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <Image
              src={storeLogo}
              alt={storeName}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <Card
            border="none"
            className="w-full h-48  bg-neutral-100 flex items-center justify-center"
          >
            <span className="text-neutral-400">No store logo</span>
          </Card>
        )}

        {/* Contact & Location Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            gap="md"
            border="none"
            className="flex items-start gap-3  bg-neutral-50"
          >
            <MapPin size={16} className="text-neutral-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-neutral-500 mb-1">Address</p>
              <p className="font-medium text-neutral-900 text-sm">
                {storeAddress}
              </p>
            </div>
          </Card>

          <Card
            gap="md"
            border="none"
            className="flex items-start gap-3  bg-neutral-50"
          >
            <Phone size={16} className="text-neutral-500 mt-0.5 shrink-0" />
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
            <Mail size={16} className="text-neutral-500 mt-0.5 shrink-0" />
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
              <ShoppingBag size={16} className="text-neutral-500" />
              <p className="text-xs text-neutral-500">Min. Order</p>
            </div>
            <p className="font-medium text-primary ">{minimumOrder}</p>
          </Card>

          <Card gap="md" border="none" className=" bg-neutral-50">
            <div className="flex items-center gap-2 mb-1">
              <Truck size={16} className="text-neutral-500" />
              <p className="text-xs text-neutral-500">Delivery Fee</p>
            </div>
            <p className="font-medium text-primary ">
              {formatCurrency(deliveryFee)}
            </p>
          </Card>

          <Card gap="md" border="none" className=" bg-neutral-50">
            <div className="flex items-center gap-2 mb-1">
              <Timer size={16} className="text-neutral-500" />
              <p className="text-xs text-neutral-500">Prep. Time</p>
            </div>
            <p className="font-medium text-neutral-900">
              {preparationTime ? `${preparationTime} min` : 'N/A'}
            </p>
          </Card>
        </div>

        {/* Description */}
        {storeDescription && (
          <Card gap="md" border="none" className=" bg-neutral-50">
            <p className="text-xs text-neutral-500 mb-2">Description</p>
            <p className="text-neutral-700 text-sm leading-relaxed">
              {storeDescription}
            </p>
          </Card>
        )}

        {/* Operating Hours */}
        {operatingHours && operatingHours.length > 0 && (
          <Card gap="md" border="none" className=" bg-neutral-50 ">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-neutral-500" />
              <p className="text-xs text-neutral-500">Operating Hours</p>
            </div>
            <div className="space-y-6">
              {operatingHours.map((hour) => (
                <div
                  key={hour.dayOfWeek}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-neutral-600 capitalize">
                    {hour.dayOfWeek.charAt(0) +
                      hour.dayOfWeek.slice(1).toLowerCase()}
                  </span>
                  {hour.isOpen ? (
                    <span className="text-neutral-900 font-medium">
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
        <div className="flex justify-between gap-4 pt-4">
          <Button
            variant="white"
            size="lg"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>

          {onEdit && (
            <Button variant="primary" size="lg" onClick={handleEdit}>
              <Edit size={16} />
              Edit Store
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
