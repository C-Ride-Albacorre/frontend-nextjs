// features/user/delivery/components/delivery-location-client.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useOrderStore } from '@/features/user/delivery/hooks/order-store';
import DeliveryAddressSection from './delivery-address-section';
import RecipientDetailsSection from './recipient-details-section';
import DeliveryFooter from './delivery-footer';
import VendorDetailsCard from './vendor-details-card';

export interface Address {
  id: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  label?: string;
  isDefault?: boolean;
}

export interface VendorContact {
  phone?: string;
  email?: string;
}

export interface VendorAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface VendorAddressDetails {
  storeId?: string;
  storeName?: string;
  vendorId?: string;
  businessName?: string;
  address?: VendorAddress;
  contact?: VendorContact;
}

interface Props {
  id: string;
  slug: string;
}

export default function DeliveryLocationClient({
  vendor,
  address,
  storeId,
  slug,
}: any) {
  const router = useRouter();

  const {
    recipientName,
    recipientPhone,
    dropoffLocation,
    vendorDeliveryLocation,

    setRecipientName,
    setRecipientPhone,
    setDropoffLocation,
    setVendorDeliveryLocation,
  } = useOrderStore();

  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    undefined,
  );

  const [name, setName] = useState('');

  const [phone, setPhone] = useState('');

  const vendorRes = vendor;

  const addressList = address.data ?? [];

  const vendorAddressDetails = vendor;

  const addresses = address.data ?? [];

  /* ---------------- Sync Store Values ---------------- */

  useEffect(() => {
    setName(recipientName || '');

    setPhone(recipientPhone || '');
  }, [recipientName, recipientPhone]);

  /* ---------------- Helpers ---------------- */

  const toDropoff = (addr: Address) => ({
    address: addr.address,
    city: addr.city || 'N/A',
    state: addr.state || 'N/A',
    country: addr.country || 'Nigeria',
    postalCode: addr.postalCode || '',
  });

  /* ---------------- Fetch Data ---------------- */

  console.log(
    ' [DeliveryLocationClient] vendorRes:',
    vendorRes,
    '; addressRes:',
    address,
  );

  /* ---------------- Vendor ---------------- */

  useEffect(() => {
    if (!vendorRes) return;

    const address = vendorRes.address || {};

    const formattedAddress = [address.street, address.city, address.state]
      .filter(Boolean)
      .join(', ');

    setVendorDeliveryLocation(formattedAddress);
  }, [vendorRes, setVendorDeliveryLocation]);

  /* ---------------- Addresses ---------------- */

  // Default address fallback
  useEffect(() => {
    if (!addressList.length) return;

    if (dropoffLocation?.address) {
      const existingAddress = addressList.find(
        (addr: Address) => addr.address === dropoffLocation.address,
      );

      if (existingAddress) {
        setSelectedAddress(existingAddress);
        return;
      }
    }
  }, [addressList, dropoffLocation?.address, setDropoffLocation]);

  useEffect(() => {
    if (!addressList.length || selectedAddress) return;

    const defaultAddr = addressList.find((addr: Address) => addr.isDefault);

    if (defaultAddr) {
      setSelectedAddress(defaultAddr);
      setDropoffLocation(toDropoff(defaultAddr));
    }
  }, [addressList, selectedAddress, setDropoffLocation]);

  const defaultAddress = useMemo(
    () => addresses.find((a: Address) => a.isDefault),
    [addresses],
  );

  const otherAddresses = useMemo(
    () => addresses.filter((a: Address) => !a.isDefault),
    [addresses],
  );

  /* ---------------- Handlers ---------------- */

  const handleAddressSelect = (addr: Address) => {
    setSelectedAddress(addr);

    setDropoffLocation(toDropoff(addr));
  };

  const handleProceed = () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');

      return;
    }

    if (!name.trim()) {
      toast.error('Please enter recipient name');

      return;
    }

    if (!phone.trim()) {
      toast.error('Please enter recipient phone number');

      return;
    }

    setRecipientName(name.trim());

    setRecipientPhone(phone.trim());

    setDropoffLocation(toDropoff(selectedAddress));

    if (vendorAddressDetails) {
      sessionStorage.setItem(
        'vendorAddressDetails',
        JSON.stringify(vendorAddressDetails),
      );
    }

    router.push(`/user/delivery/${storeId}/${slug}/delivery-confirmation`);
  };

  return (
    <>
      <div className="space-y-5">
        <VendorDetailsCard
          vendor={vendorAddressDetails}
          location={vendorDeliveryLocation}
        />

        <DeliveryAddressSection
          defaultAddress={defaultAddress}
          otherAddresses={otherAddresses}
          selected={selectedAddress}
          onSelect={handleAddressSelect}
          savedAddresses={addresses}
        />

        <RecipientDetailsSection
          name={name}
          phone={phone}
          onNameChange={setName}
          onPhoneChange={setPhone}
        />
      </div>

      <DeliveryFooter id={storeId} slug={slug} onProceed={handleProceed} />
    </>
  );
}
