import Card from '@/components/layout/card';
import { Mail, PhoneCall, Store } from 'lucide-react';
import Image from 'next/image';
interface Props {
  vendor: any;
  location: string;
}
export default function VendorDetailsCard({ vendor, location }: Props) {
  return (
    <Card border="none" className="bg-primary/10 p-5 rounded-2xl">
      <div className="space-y-5">
        <h2 className="font-semibold text-base"> Vendor Details </h2>
        <div className="flex flex-col sm:flex-row items-start gap-2">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
            <Image
              src="/assets/image/store-placeholder.png"
              alt={vendor?.storeName || 'Vendor'}
              fill
              className="rounded-full"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h2 className="capitalize font-semibold  sm:text-lg text-neutral-900">
                {vendor?.storeName}
              </h2>
              <p className="text-sm text-primary-text-100">{location}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <PhoneCall size={16} className="text-green-100" />
                <p className="text-sm text-primary-text-100">
                  {vendor?.contact?.phone || 'No contact info available'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-green-100" />
                <p className="text-sm text-primary-text-100">
                  {vendor?.contact?.email || 'No contact info available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
