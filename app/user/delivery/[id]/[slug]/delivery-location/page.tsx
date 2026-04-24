'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import Input from '@/components/ui/inputs/input';
import { fetchSavedAddressesAction } from '@/features/user/address/action';
import AddressSelector from '@/features/user/delivery/components/address-selector';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPinPlus,
  Plus,
} from 'lucide-react';
import { useOrderStore } from '@/features/user/delivery/order-store';
import { toast } from 'sonner';
import AddressModal from '@/features/user/address/components/address-modal';

type Address = {
  id: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  label?: string;
  isDefault?: boolean;
};

export default function DeliveryLocation() {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    recipientName,
    recipientPhone,
    dropoffLocation,
    setRecipientName,
    setRecipientPhone,
    setDropoffLocation,
  } = useOrderStore();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>();
  const [name, setName] = useState(recipientName);
  const [phone, setPhone] = useState(recipientPhone);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchSavedAddressesAction()
      .then((data) => {
        const list: Address[] = data ?? [];
        setAddresses(list);

        // If the user previously selected an address (stored in order store),
        // try to match it with one of the fetched addresses so it stays selected
        if (dropoffLocation) {
          const match = list.find((a) => a.address === dropoffLocation.address);
          if (match) {
            setSelectedAddress(match);
            return;
          }
        }

        // Otherwise fall back to the default address
        const def = list.find((a) => a.isDefault);
        if (def) setSelectedAddress(def);
      })
      .finally(() => setIsFetching(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toDropoff = (addr: Address) => ({
    address: addr.address,
    city: addr.city || 'N/A',
    state: addr.state || 'N/A',
    country: addr.country || 'Nigeria',
    postalCode: addr.postalCode,
  });

  const handleAddressSelect = (addr: Address) => {
    setSelectedAddress(addr);
    // Sync to order store immediately so it's never stale
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

    // Persist to order store
    setRecipientName(name.trim());
    setRecipientPhone(phone.trim());
    setDropoffLocation(toDropoff(selectedAddress));

    router.push(`/user/delivery/${id}/${slug}/delivery-confirmation`);
  };

  const defaultAddress = addresses.find((a) => a.isDefault);
  const otherAddresses = addresses.filter((a) => !a.isDefault);

  return (
    <>
      <Card className="bg-foreground-200">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <p className="font-medium">Delivery Location</p>
            <span className="text-neutral-500 text-sm">
              Where should we deliver?
            </span>
          </div>

          <Button
            variant="white"
            size="icon"
            leftIcon={<MapPinPlus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Add address
          </Button>
        </div>

        {isFetching ? (
          <Loader2 size={24} className="animate-spin text-primary mx-auto" />
        ) : (
          <AddressSelector
            defaultAddress={defaultAddress}
            otherAddresses={otherAddresses}
            selected={selectedAddress}
            onSelect={handleAddressSelect}
          />
        )}
      </Card>

      <Card className="bg-foreground-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Recipient Name"
            type="text"
            placeholder="Joseph Adebayo"
            spacing="sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Recipient Phone"
            type="tel"
            placeholder="+234 800 000 0000"
            spacing="sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </Card>

      <div className="mt-12 flex items-center justify-around gap-8">
        <Button
          href={`/user/delivery/${id}/${slug}/delivery-type`}
          size="lg"
          variant="outline"
          leftIcon={<ChevronLeft size={16} />}
        >
          Back
        </Button>

        <Button
          onClick={handleProceed}
          size="lg"
          variant="primary"
          rightIcon={<ChevronRight size={16} />}
        >
          Proceed
        </Button>
      </div>

      <AddressModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </>
  );
}
