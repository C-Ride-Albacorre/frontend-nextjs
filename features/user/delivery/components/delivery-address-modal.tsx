'use client';

import { useState } from 'react';
import AddressModal from '../../address/components/address-modal';

export default function DeliveryAddressModal({
  shouldShowModal,
}: {
  shouldShowModal: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(shouldShowModal);

  return (
    <AddressModal
      isModalOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      shouldShowModal={shouldShowModal}
      onSuccess={() => setIsModalOpen(false)}
    />
  );
}
