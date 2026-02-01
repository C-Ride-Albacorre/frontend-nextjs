'use client';

import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/buttons/button';

import Input from '@/components/ui/inputs/input';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  House,
  MapPin,
  Plus,
} from 'lucide-react';

export default function DeliveryLocation() {
  const params = useParams();

  const id = params.name;

  return (
    <>
      <div className="my-12 p-8 bg-foreground-200 rounded-2xl space-y-12">
        <div className="space-y-2">
          <p
            className="font-medium
          "
          >
            Delivery Locations
          </p>
          <span className="text-neutral-500 text-sm">
            Where should we pick up and deliver?
          </span>
        </div>

        <div className="flex items-start gap-4">
          <MapPin size={16} className="text-red-600" />

          <div className="space-y-4">
            <p className="font-medium text-sm">Pickup Address</p>
            <span className="text-sm text-neutral-500">
              13 Alhaji Kosoko Street
            </span>

            <div className="flex items-center gap-4 mt-4">
              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <MapPin size={16} />
                Current Location
              </span>

              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <Plus size={16} />
                Add Address
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin size={16} className="text-red-600" />

          <div className="space-y-4">
            <p className="font-medium text-sm">Drop Address</p>
            <span className="text-sm text-neutral-500">
              45 Adeola Odeku, Victoria Island
            </span>

            <div className="flex items-center gap-4 mt-4">
              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <House size={16} />
                Home
              </span>

              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <Building2 size={16} />
                Office
              </span>

              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <MapPin size={16} />
                Current Location
              </span>

              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <Plus size={16} />
                Add Address
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-foreground-200 rounded-2xl ">
        <div className="grid grid-cols-2 gap-8">
          <Input
            label="Recipient Name"
            type="text"
            placeholder="Joseph Adebayo"
            spacing="sm"
          />

          <Input
            label="Recipient Phone"
            type="tel"
            placeholder="+234 800 000 0000"
            spacing="sm"
          />
        </div>
      </div>

      <div className="mt-12  flex items-center justify-around gap-8">
        <Button
          href={`/user/delivery/food/${id}/delivery-type`}
          size="lg"
          variant="outline"
          leftIcon={<ChevronLeft size={16} />}
        >
          Back
        </Button>

        <Button
          href={`/user/delivery/food/${id}/delivery-confirmation`}
          size="lg"
          variant="primary"
          rightIcon={<ChevronRight size={16} />}
        >
          Proceed
        </Button>
      </div>
    </>
  );
}
