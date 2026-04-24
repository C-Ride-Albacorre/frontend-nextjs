'use client';

import { useState } from 'react';

import { Loader2, MapPin, MapPinHouse, MapPinned, Plus } from 'lucide-react';
import AddressModal from '@/features/user/address/components/address-modal';
import { Button } from '@/components/ui/buttons/button';
import { useAddresses } from '../../address/fetch';
import Card from '@/components/layout/card';

export default function Address() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data , isLoading, error } = useAddresses();

  console.log('Address Data:', data);

  return (
    <>
      <Card className="bg-white ">
        <div className="md:flex items-center justify-between">
          <h3 className="font-semibold">Quick Delivery Locations</h3>

          <div className="hidden md:inline-flex">
            <Button
              onClick={() => setIsModalOpen(true)}
              leftIcon={<MapPin size={16} />}
              size="icon"
            >
              Add Location
            </Button>
          </div>
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
        ) : data ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-72 overflow-y-scroll">
            {data?.map((item: any) => (
              <li key={item.id}>
                <Card spacing="sm" className="flex items-start h-full">
                  <div className="flex-1 flex flex-col md:flex-row gap-2 mb-0">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {item.isDefault ? (
                        <MapPinHouse size={14} />
                      ) : (
                        <MapPinned size={14} />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <p className="font-medium text-xs capitalize">
                        {item.label.toLocaleLowerCase()}
                      </p>
                      <p className="text-xs text-neutral-500 capitalize">
                        {item.address
                          ? item.address.toLocaleLowerCase()
                          : 'No address provided'}
                      </p>

                      <div className="flex gap-2 text-neutral-500  text-xs">
                        {item.state && <p>{item.state}</p>}
                        <p>
                          {item.country ? item.country : 'No country provided'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {item.isDefault && (
                    <span className="text-[10px] bg-[#10B981]/10 border border-[#10B981] text-[#10B981] px-2 py-0.5 rounded-full flex items-center justify-center shrink-0">
                      Default
                    </span>
                  )}
                </Card>
              </li>
            ))}

            <li className="flex  h-full">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="w-full"
                size="icon"
              >
                <span className="bg-white rounded-full p-1">
                  <Plus size={16} />
                </span>
                Add a new location
              </Button>
            </li>
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              className="w-full"
              size="icon"
            >
              <span className="bg-white rounded-full p-1">
                <Plus size={16} />
              </span>
              Add a new location
            </Button>
          </div>
        )}
      </Card>

      <AddressModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </>
  );
}
