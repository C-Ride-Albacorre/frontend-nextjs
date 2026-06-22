'use client';
import { useEffect, useState } from 'react';

import AddressTabs from './address-tabs';
import SavedAddresses from './saved-address';
import MapLocations from './map-location';
import ManualAddressForm from './manual-address';
import { AddressItem } from '../service';

export default function AddressWrapper({
  savedAddresses,
  shouldShowModal,
  onSuccess,
}: {
  savedAddresses?: AddressItem[];
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
    <>
      <AddressTabs active={active} setActive={setActive} />

      {active === 'saved' && <SavedAddresses savedAddresses={savedAddresses} />}
      {active === 'map' && <MapLocations onSuccess={onSuccess} />}
      {active === 'manual' && (
        <ManualAddressForm isDefault={shouldShowModal} onSuccess={onSuccess} />
      )}
    </>
  );
}
