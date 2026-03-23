import Input from '@/components/ui/inputs/input';
import {
  Loader2,
  MapPinHouse,
  MapPinned,
  Search,
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { fetchSavedAddressesAction } from '../action';
import Card from '@/components/layout/card';


export default function SavedAddresses() {
  const [isPending, startTransition] = useTransition();
  const [addressDetails, setAddressDetails] = useState<any[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const data = await fetchSavedAddressesAction();

      if (data) {
        setAddressDetails(data.data);
      }
    });
  }, []);

  console.log('data', addressDetails);
  return (
    <div className="space-y-4">
      <Input
        type="text"
        aria-label="Search address"
        placeholder="Search saved locations..."
        leftIcon={<Search className="h-6 w-6 text-neutral-500" />}
      />

      {isPending ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        addressDetails?.map((data, index) => (
          <Card key={index} className="flex items-start">
            <div className="flex-1 flex items-center gap-4 mb-0">
              {
                <div
                  className="w-8 h-8 
  sm:w-9 sm:h-9 
  md:w-10 md:h-10 
  rounded-full 
  bg-primary/10 
  text-primary 
  flex items-center justify-center 
  shrink-0
"
                >
                  {data.isDefault ? (
                    <MapPinHouse size={16} className="md:w-4.5 md:h-4.5" />
                  ) : (
                    <MapPinned size={16} className="md:w-4.5 md:h-4.5" />
                  )}
                </div>
              }

              <div className="space-y-1.5">
                <p className="font-medium text-sm capitalize">
                  {data.label.toLocaleLowerCase()}
                </p>
                <p className="text-xs text-neutral-500 capitalize">
                  {data.address.toLocaleLowerCase()}
                </p>

                <div className="flex gap-2 text-neutral-500  text-xs">
                  <p>{data.state}</p>

                  <p>{data.country}</p>
                </div>
              </div>
            </div>

            {data.isDefault && (
              <span className="text-[10px] bg-[#10B981]/10 border border-[#10B981] text-[#10B981] px-2 py-0.5 rounded-full flex items-center justify-center shrink-0">
                Default
              </span>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
