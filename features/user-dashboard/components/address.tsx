'use client';

import { useState } from 'react';

import { MapPin, Plus } from 'lucide-react';
import AddressModal from '@/features/address/components/address-modal';

export default function Address() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-border p-6">
        <div className="md:flex items-center justify-between">
          <h3 className="font-semibold">Quick Delivery Locations</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm text-primary-text-100 cursor-pointer"
          >
            <MapPin size={16} /> Add Location
          </button>
        </div>

        <div className="mt-6 flex justify-center items-center md:justify-start w-full">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 rounded-xl bg-foreground-100 px-4 py-4 text-xs cursor-pointer"
          >
            <span className="bg-white rounded-full p-1">
              <Plus size={16} />
            </span>
            Add a new location
          </button>
        </div>
      </div>

      <AddressModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
