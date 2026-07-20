'use client';
import { useState } from 'react';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import {
  Briefcase,
  Edit,
  Home,
  MapPin,
  MapPinHouse,
  Trash2,
} from 'lucide-react';
import AddressModal from '../../address/components/address-modal';
import { AddressItem } from '../../address/service';
import EmptyState from '@/components/layout/empty-state';

export default function ProfileSavedAddress({
  savedAddresses,
}: {
  savedAddresses: AddressItem[];
}) {
  const [addLocation, setAddLocation] = useState(false);

  // console.log(' [SavedAddress] savedAddresses:', savedAddresses);

  return (
    <>
      <Card gap="lg">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold">Your Address</h2>

          <Button
            onClick={() => setAddLocation(true)}
            variant="primary"
            size="icon"
            leftIcon={<MapPin size={16} />}
          >
            Add Location
          </Button>
        </div>

        {savedAddresses && savedAddresses.length > 0 ? (
          <ul className="space-y-6">
            {savedAddresses.map((option: AddressItem, index: number) => (
              <li key={index}>
                <Card
                  border="none"
                  gap="none"
                  className="bg-foreground-200 flex flex-col md:flex-row gap-8 items-start justify-between"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex justify-center items-center">
                      {option.isDefault ? (
                        <MapPinHouse size={20} className="text-primary" />
                      ) : (
                        <MapPin size={20} className="text-primary" />
                      )}
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <h4 className=" text-base capitalize">{option.label}</h4>

                        {option.isDefault && (
                          <span className="bg-[#10B981] px-2 py-1.5 text-white rounded-full text-[10px]">
                            default
                          </span>
                        )}
                      </div>

                      <p className="text-neutral-600">{option.address}</p>

                      {/* <p className="text-neutral-600">{option?.location}</p> */}
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    {/* {!option.isDefault && (
                      <Button
                        variant="green-outline"
                        className="text-xs"
                        size="xs"
                      >
                        Set Default
                      </Button>
                    )} */}
                    <IconButton
                      variant="default"
                      size="sm"
                      rounded="md"
                      className="bg-white"
                      aria-label="Edit Address"
                    >
                      <Edit size={16} />
                    </IconButton>

                    <IconButton
                      size="sm"
                      rounded="md"
                      variant="red"
                      aria-label="Delete Address"
                    >
                      <Trash2 size={14} />
                    </IconButton>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={<MapPinHouse size={36} className="text-orange-500" />}
            title="No saved addresses"
            message="You have not added any addresses yet."
          />
        )}
      </Card>

      <AddressModal
        isModalOpen={addLocation}
        onClose={() => setAddLocation(false)}
        savedAddresses={savedAddresses}
              onSuccess={() => setAddLocation(false)}
      />
    </>
  );
}
