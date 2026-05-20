'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import Input from '@/components/ui/inputs/input';
import { fetchSavedAddressesAction } from '@/features/user/address/action';
import AddressSelector from '@/features/user/delivery/components/address-selector';
import {
  ChevronLeft,
  ChevronRight,
  Loader,
  Mail,
  MapPinPlus,
  PhoneCall,
  Plus,
  Store,
} from 'lucide-react';
import { useOrderStore } from '@/features/user/delivery/hooks/order-store';
import { toast } from 'sonner';
import AddressModal from '@/features/user/address/components/address-modal';
import { fetchVendorAddressAction } from '@/features/user/delivery/action';

interface Address {
  id: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  label?: string;
  isDefault?: boolean;
}

interface VendorContact {
  phone?: string;
  email?: string;
}

interface VendorAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface VendorAddressDetails {
  storeId?: string;
  storeName?: string;
  vendorId?: string;
  businessName?: string;
  address?: VendorAddress;
  contact?: VendorContact;
}

export default function DeliveryLocation() {
  const { id, slug } = useParams<{
    id: string;
    slug: string;
  }>();

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFetching, setIsFetching] = useState(true);

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

  const [vendorAddressDetails, setVendorAddressDetails] =
    useState<VendorAddressDetails | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([]);

  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    undefined,
  );

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  /* ---------------- Sync Existing Store Values ---------------- */

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
    postalCode: addr.postalCode,
  });

  /* ---------------- Fetch Data ---------------- */

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsFetching(true);

        const [vendorRes, addressRes] = await Promise.all([
          fetchVendorAddressAction(slug),
          fetchSavedAddressesAction(),
        ]);

        /* ---------------- Vendor Data ---------------- */

        if (vendorRes?.success && vendorRes.data) {
          // Ensure correct typing and fallback
          const vendor: VendorAddressDetails = vendorRes.data || {};
          setVendorAddressDetails(vendor);

          const address = vendor.address || {};
          const formattedAddress = [address.street, address.city, address.state]
            .filter(Boolean)
            .join(', ');

          setVendorDeliveryLocation(formattedAddress);
        }

        /* ---------------- Address Data ---------------- */

        const addressList: Address[] = addressRes ?? [];

        setAddresses(addressList);

        // Restore selected address if available
        if (dropoffLocation?.address) {
          const existingAddress = addressList.find(
            (addr) => addr.address === dropoffLocation.address,
          );
          if (existingAddress) {
            setSelectedAddress(existingAddress);
            return;
          }
        }

        // Fallback to default address
        const defaultAddr = addressList.find((addr) => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr);
          setDropoffLocation(toDropoff(defaultAddr));
        } else {
          setSelectedAddress(undefined);
        }
      } catch (error) {
        console.error('[Delivery Page Error]', error);

        toast.error('Failed to load delivery information');
      } finally {
        setIsFetching(false);
      }
    };

    loadData();

    console.log('Pick up Location:', vendorDeliveryLocation);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- Derived Addresses ---------------- */

  const defaultAddress = addresses.find((a) => a.isDefault);

  const otherAddresses = addresses.filter((a) => !a.isDefault);

  /* ---------------- Handlers ---------------- */

  const handleAddressSelect = (addr: Address) => {
    setSelectedAddress(addr ?? undefined);
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

    // Persist data
    setRecipientName(name.trim());

    setRecipientPhone(phone.trim());

    setDropoffLocation(toDropoff(selectedAddress));

    // Save vendor details
    if (vendorAddressDetails) {
      window.sessionStorage.setItem(
        'vendorAddressDetails',
        JSON.stringify(vendorAddressDetails),
      );
    }

    router.push(`/user/delivery/${id}/${slug}/delivery-confirmation`);
  };

  return (
    <>
      <div className="space-y-5">
        {/* ---------------- Vendor Details ---------------- */}

        <Card className="bg-primary/10 p-5 rounded-2xl">
          <div className="space-y-5">
            <h2 className="font-semibold text-base">Vendor Details</h2>

            <div className="flex items-start gap-4">
              <div className="bg-primary/15 p-2 rounded-full">
                <Store size={18} className="text-primary" />
              </div>

              <div className="flex-1 space-y-4">
                {/* Store Info */}

                <div className="space-y-2">
                  <p className="capitalize font-medium text-sm text-neutral-900">
                    {vendorAddressDetails?.storeName || 'Loading store...'}
                  </p>

                  <p className="text-sm text-neutral-500">
                    {vendorDeliveryLocation || 'Fetching vendor location...'}
                  </p>
                </div>

                {/* Contact Info */}

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <PhoneCall
                      size={16}
                      className="text-neutral-500 shrink-0"
                    />

                    <p className="text-sm text-neutral-600 break-all">
                      {vendorAddressDetails?.contact?.phone ||
                        'No contact info available'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-neutral-500 shrink-0" />

                    <p className="text-sm text-neutral-600 break-all">
                      {vendorAddressDetails?.contact?.email ||
                        'No contact info available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ---------------- Delivery Location ---------------- */}

        <Card className="bg-foreground-200 rounded-2xl p-5">
          <div className="space-y-5">
            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-semibold text-base text-neutral-900">
                  Delivery Location
                </h2>

                <p className="text-sm text-neutral-500">
                  Where should we deliver your order?
                </p>
              </div>

              <Button
                variant="white"
                leftIcon={<MapPinPlus size={16} />}
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto"
              >
                Add Address
              </Button>
            </div>

            {/* Address Content */}

            <Card className="bg-white p-4">
              {isFetching ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Loader size={28} className="animate-spin text-primary" />

                  <p className="text-sm text-neutral-500">
                    Loading delivery information...
                  </p>
                </div>
              ) : (
                <AddressSelector
                  defaultAddress={defaultAddress}
                  otherAddresses={otherAddresses}
                  selected={selectedAddress}
                  onSelect={handleAddressSelect}
                />
              )}
            </Card>
          </div>
        </Card>

        {/* ---------------- Recipient Details ---------------- */}

        <Card className="bg-foreground-200 rounded-2xl p-5">
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold text-base text-neutral-900">
                Recipient Details
              </h2>

              <p className="text-sm text-neutral-500 mt-1">
                Who will receive this order?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Recipient Name"
                type="text"
                placeholder="Joseph Adebayo"
                spacing="sm"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Recipient Phone"
                type="tel"
                placeholder="+234 800 000 0000"
                spacing="sm"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* ---------------- Footer Buttons ---------------- */}

      <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <Button
          href={`/user/delivery/${id}/${slug}/delivery-type`}
          size="lg"
          variant="outline"
          leftIcon={<ChevronLeft size={16} />}
          className="w-full sm:w-auto"
        >
          Back
        </Button>

        <Button
          onClick={handleProceed}
          size="lg"
          variant="primary"
          rightIcon={<ChevronRight size={16} />}
          className="w-full sm:w-auto"
        >
          Proceed
        </Button>
      </div>

      {/* ---------------- Address Modal ---------------- */}

      <AddressModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </>
  );
}
