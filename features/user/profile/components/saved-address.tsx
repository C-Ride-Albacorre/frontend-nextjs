'use client';
import { useState } from 'react';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import {
  Briefcase,
  Edit,
  Home,
  Loader2,
  MapPin,
  MapPinHouse,
  Trash2,
} from 'lucide-react';
import AddressModal from '../../address/components/address-modal';
import { useAddresses } from '../../address/fetch';

// const addressOptions = [
//   {
//     label: 'Home',
//     default: true,
//     icon: <Home size={20} className="text-primary" />,
//     address: '1234 Elm Street, Mainland ',
//     location: 'Lagos, Nigeria',
//   },
//   {
//     label: 'Work',
//     icon: <Briefcase size={20} className="text-primary" />,
//     address: '5678 Oak Avenue, Victoria Island',
//     location: 'Lagos, Nigeria',
//   },
//   {
//     label: 'Parents',
//     icon: <MapPin size={20} className="text-primary" />,
//     address: '9101 Pine Road, Lekki Phase 1',
//     location: 'Lagos, Nigeria',
//   },
// ];

export default function SavedAddress() {
  const [addLocation, setAddLocation] = useState(false);

  const { data, isLoading, error } = useAddresses();

  return (
    <>
      <Card gap="lg">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Saved Address</p>

          <Button
            onClick={() => setAddLocation(true)}
            variant="primary"
            size="icon"
            leftIcon={<MapPin size={16} />}
          >
            Add Location
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : error ? (
          <p className="flex flex-col justify-center items-center text-center text-sm py-20 text-red-500 gap-3">
            <MapPinHouse size={24} className="text-red-500" />
            <p>{error.message || 'Failed to load addresses'}</p>
          </p>
        ) : data && data.length > 0 ? (
          <ul className="space-y-6">
            {data?.map((option: any, index: number) => (
              <li key={index}>
                <Card
                  gap="none"
                  className="bg-foreground-100 flex flex-col md:flex-row gap-8 items-start justify-between"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex justify-center items-center">
                      {option.icon}
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{option.label}</p>

                        {option.default && (
                          <span className="bg-[#10B981] px-2 py-1.5 text-white rounded-full text-[10px]">
                            default
                          </span>
                        )}
                      </div>

                      <p className="text-neutral-600">{option.address}</p>

                      <p className="text-neutral-600">{option.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    {!option.default && (
                      <Button
                        variant="green-outline"
                        className="text-xs"
                        size="xs"
                      >
                        Set Default
                      </Button>
                    )}
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
          <p className="flex flex-col justify-center items-center text-center text-sm py-20 text-neutral-500 gap-3">
            <MapPinHouse size={24} className="text-neutral-500" />
            <span>No saved addresses found.</span>
          </p>
        )}
      </Card>

      <AddressModal
        isModalOpen={addLocation}
        onClose={() => setAddLocation(false)}
      />
    </>
  );
}
