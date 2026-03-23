import { useEffect, useState } from 'react';

import Modal from '@/components/layout/modal';
import AddressTabs from './address-tabs';
import SavedAddresses from './saved-address';
import MapLocations from './map-location';
import ManualAddressForm from './manual-address';

export default function AddressModal({
  isModalOpen,
  onClose,
  shouldShowModal,
  onSuccess,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  shouldShowModal?: boolean;
  onSuccess?: () => void;
}) {
  const [active, setActive] = useState<'saved' | 'map' | 'manual'>('saved');

  useEffect(() => {
    if (shouldShowModal) {
      setActive('manual');
    } else {
      setActive('saved');
    }
  }, [shouldShowModal]);

  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="py-8">
        <h2 className="text-xl font-semibold">Select Delivery Location</h2>
        <p className="text-sm text-gray-500">
          Choose from saved locations or add a new one
        </p>

        <AddressTabs active={active} setActive={setActive} />

        {active === 'saved' && <SavedAddresses />}
        {active === 'map' && <MapLocations />}
        {active === 'manual' && (
          <ManualAddressForm
            isDefault={shouldShowModal}
            onSuccess={onSuccess}
          />
        )}
      </div>
    </Modal>
  );
}
