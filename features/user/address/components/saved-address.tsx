import Input from '@/components/ui/inputs/input';
import { Loader2, MapPinHouse, MapPinned, Search } from 'lucide-react';
import { useAddresses } from '../fetch';
import Card from '@/components/layout/card';

// type Address = {
//   id: string;
//   userId: string;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   postalCode: string;
//   latitude: number;
//   longitude: number;
//   isDefault: boolean;
//   label: string;
//   createdAt: string;
//   updatedAt: string;
// };

// interface UseAddressesResult {
//   status: string;
//   data?: Address[];
//   message?: string;
// }

export default function SavedAddresses() {
  const { data = [], isLoading } = useAddresses();

  return (
    <div className="space-y-4">
      <Input
        type="text"
        aria-label="Search address"
        placeholder="Search saved locations..."
        leftIcon={<Search className="h-6 w-6 text-neutral-500" />}
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        data.map((item: any) => (
          <Card key={item.id} className="flex items-start">
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 mb-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {item.isDefault ? (
                  <MapPinHouse size={16} className="md:w-4.5 md:h-4.5" />
                ) : (
                  <MapPinned size={16} className="md:w-4.5 md:h-4.5" />
                )}
              </div>

              <div className="space-y-1.5">
                <p className="font-medium text-sm capitalize">
                  {item.label.toLocaleLowerCase()}
                </p>
                <p className="text-xs text-neutral-500 capitalize">
                  {item.address.toLocaleLowerCase()}
                </p>

                <div className="flex gap-2 text-neutral-500  text-xs">
                  {item.state && <p>{item.state}</p>}
                  <p>{item.country}</p>
                </div>
              </div>
            </div>

            {item.isDefault && (
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
