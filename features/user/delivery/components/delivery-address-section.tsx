'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import AddressSelector from './address-selector';
import { LoaderCircle, MapPinPlus } from 'lucide-react';
import AddressModal from '../../address/components/address-modal';
import { useState } from 'react';
import { AddressItem } from '../../address/service';
interface Props {
  defaultAddress: any;
  otherAddresses: any[];
  selected: any;
  onSelect: (addr: any) => void;
  savedAddresses: AddressItem[];
}
export default function DeliveryAddressSection({
  defaultAddress,
  otherAddresses,
  selected,
  onSelect,
  savedAddresses,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card border="none" className="bg-foreground-200 rounded-2xl p-5">
        <div className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-base">Delivery Location</h2>
              <p className="text-sm text-neutral-500">
                Where should we deliver your order?
              </p>
            </div>
            <Button
              variant="white"
              leftIcon={<MapPinPlus size={16} />}
              onClick={() => setIsModalOpen(true)}
            >
              Add Address
            </Button>
          </div>
          <AddressSelector
            defaultAddress={defaultAddress}
            otherAddresses={otherAddresses}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
      </Card>

      <AddressModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
        savedAddresses={savedAddresses}
      />
    </>
  );
}
