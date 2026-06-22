'use client';

import { useState } from 'react';
import AddressModal from '../../../address/components/address-modal';
import { AddressItem } from '@/features/user/address/service';

export default function DeliveryAddressModal({
  savedAddresses,
  shouldShowModal,
}: {
  savedAddresses: AddressItem[];
  shouldShowModal: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(shouldShowModal);

  return (
    <AddressModal
      isModalOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      shouldShowModal={shouldShowModal}
      onSuccess={() => setIsModalOpen(false)}
      savedAddresses={savedAddresses}
    />
  );
}
