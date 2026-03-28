// features/user/delivery/components/address-selector.tsx
'use client';

import { useState } from 'react';
import { Building2, House, MapPin } from 'lucide-react';

type Address = {
  id: string;
  address: string;
  city?: string;
  state?: string;
  label?: string;
  isDefault?: boolean;
};

export default function AddressSelector({
  defaultAddress,
  otherAddresses,
  selected,
  onSelect,
}: {
  defaultAddress?: Address;
  otherAddresses: Address[];
  selected?: Address;
  onSelect?: (addr: Address) => void;
}) {
  const [internalSelected, setInternalSelected] = useState<Address | undefined>(
    defaultAddress,
  );

  // Controlled if parent passes `selected`, otherwise use internal state
  const activeSelected = selected ?? internalSelected;

  const handleSelect = (addr: Address) => {
    setInternalSelected(addr);
    onSelect?.(addr);
  };

  const allAddresses = [defaultAddress, ...otherAddresses].filter(
    Boolean,
  ) as Address[];

  return (
    <div className="flex items-start gap-4">
      <MapPin size={16} className="text-red-600 mt-1" />

      <div className="space-y-4">
        <p className="font-medium text-sm">Drop Address</p>

        <span className="text-sm text-neutral-500">
          {activeSelected?.address || 'No address selected'}
        </span>

        <div className="flex items-center gap-3 mt-4 flex-wrap">
          {allAddresses.map((addr) => {
            const isActive = activeSelected?.id === addr.id;

            return (
              <button
                key={addr.id}
                onClick={() => handleSelect(addr)}
                className={`border px-4 py-3 text-xs rounded-xl flex items-center gap-2 transition cursor-pointer ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-neutral-500 hover:bg-white'
                }`}
              >
                {addr.label === 'GYM' ? (
                  <Building2 size={16} />
                ) : addr.label === 'HOME' ? (
                  <House size={16} />
                ) : (
                  <MapPin size={16} />
                )}
                {addr.label || 'Address'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
