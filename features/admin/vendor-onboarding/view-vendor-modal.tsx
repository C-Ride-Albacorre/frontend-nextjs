'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { Store } from 'lucide-react';
import Image from 'next/image';

type Vendor = {
  name: string;
  code: string;
  owner: string;
  location: string;
  email: string;
  business: string;
  rc: string;
  status: string;
  logo: string;
};

type ViewVendorModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  vendor: Vendor;
};

export default function ViewVendorModal({
  isModalOpen,
  setIsModalOpen,
  vendor,
}: ViewVendorModalProps) {
  const { name, code, owner, location, email, business, rc, status, logo } =
    vendor;

  return (
    <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="space-y-6 py-4">
        {/* Logo */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-100">
          {logo ? (
            <Image
              src={logo}
              alt={name}
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
            <h2 className="text-xl font-semibold text-neutral-900">{name}</h2>
            <p className="text-sm text-neutral-500 mt-0.5">{code}</p>
          </div>

          <span className="rounded-full px-3 py-1 text-xs font-medium bg-orange-100 text-orange-600">
            {status}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Owner</p>
            <p className="font-medium text-neutral-900">{owner}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Location</p>
            <p className="font-medium text-neutral-900">{location}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Email</p>
            <p className="font-medium text-neutral-900">{email}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Business Type</p>
            <p className="font-medium text-neutral-900">{business}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl col-span-2">
            <p className="text-xs text-neutral-500 mb-1">RC Number</p>
            <p className="font-medium text-neutral-900">{rc}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-around gap-4 pt-4">
          <Button
            variant="red"
            size="lg"
            onClick={() => setIsModalOpen(false)}
          >
            Decline
          </Button>

          <Button
            variant="green"
            size="lg"
            onClick={() => setIsModalOpen(false)}
          >
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
}
