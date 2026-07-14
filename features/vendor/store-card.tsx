import Image from 'next/image';
import { Star, Store } from 'lucide-react';
import Card from '@/components/layout/card';
import { getStoreService } from './store/service';
export default async function VendorStoreCard() {
  const data = await getStoreService();

  console.log(' Store Data:', data);

  const store = data.data[0];

  if (!store) {
    return (
      <Card
        border="none"
        spacing="sm"
        gap="sm"
        className="bg-primary/10 shadow"
      >
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center shrink-0 aspect-square">
            <Store size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-primary-text-100 text-sm">
              No Store
            </h2>
            <span className="text-xs text-neutral-500 leading-1">
              You have not created a store yet.
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card border="none" spacing="sm" gap="sm" className="bg-primary/10 shadow">
      <div className="flex items-start gap-3">
        {/* Store Logo */}
        {store.storeLogo ? (
          <div className="relative h-10 w-10 rounded-md overflow-hidden shrink-0 bg-white shadow-md">
            <Image
              src={store.storeLogo ?? '/assets/image/store-placeholder.png'}
              alt={store.storeName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0">
            <Store size={20} className="text-neutral-400" />
          </div>
        )}

        <div className="w-full flex flex-col gap-y-1.5  min-w-0">
          <h2 className="font-semibold text-neutral-800 text-sm wrap-break-word capitalize truncate block flex-wrap overflow-hidden whitespace-normal">
            {store.storeName}
          </h2>

          <span className="text-[10px]  truncate block flex-wrap text-neutral-500 wrap-break-word capitalize">
            {store.storeAddress}
          </span>

          {/* <span className="text-[10px]  truncate block flex-wrap text-neutral-500 wrap-break-word">
            {store.categoryId}
          </span> */}
        </div>
      </div>

      <div className=" ">
        {/* Status Badge */}
        {store.status === 'ACTIVE' && (
          <div className="text-[8px] bg-primary-text-100 rounded-2xl  wrap-break-word capitalize w-fit px-2 py-1 text-primary flex gap-1 items-center shadow-2xl font-medium">
            <Store strokeWidth={0} size={12} fill="#D4AF37" />
            Active
          </div>
        )}

        {store.status === 'PENDING_APPROVAL' && (
          <span className="flex w-fit items-center gap-2 rounded-full  bg-primary-text-100  text-[8px] text-primary justify-center shadow-2xl px-2 py-1 font-medium">
            Pending
          </span>
        )}

        {store.status === 'REJECTED' && (
          <span className="flex w-fit items-center gap-2 rounded-full border border-red-500 bg-red-500/10 px-2  py-1 text-[8px] text-red-600">
            Requires Attention
          </span>
        )}
      </div>
    </Card>
  );
}
