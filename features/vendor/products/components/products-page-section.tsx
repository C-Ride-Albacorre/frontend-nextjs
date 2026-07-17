import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';

import { StoreData } from '@/features/vendor/store/types';
import Image from 'next/image';
import { formatDate } from '@/helpers/date-formatter';

type Props = {
  stores: StoreData[];
};

export default function ProductsPageSection({ stores }: Props) {
  return (
    <>
      {/* SHOW STORES FIRST */}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <li key={store.id}>
            <Card
              className={
                store.status === 'PENDING_APPROVAL'
                  ? 'opacity-50 pointer-events-none grayscale'
                  : '   overflow-hidden rounded-2xl bg-white shadow-sm  transition-all duration-300  hover:-translate-y-1  hover:shadow-xl'
              }
            >
              <div className="space-y-5">
                {/* Store Header */}
                <div className="flex flex-col gap-4">
                  <div className="relative h-56 w-full overflow-hidden rounded-xl bg-neutral-100">
                    <Image
                      src={
                        store.storeLogo ?? '/assets/image/store-placeholder.png'
                      }
                      alt={store.storeName ?? 'Store logo'}
                      fill
                      priority
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1 flex justify-between items-center">
                    <h2 className="font-semibold text-neutral-900 capitalize text-lg wrap-break-word truncate block flex-wrap overflow-hidden whitespace-normal">
                      {store.storeName}
                    </h2>
                    <div>
                      {store.status === 'PENDING_APPROVAL' && (
                        <span className="text-primary bg-primary-text-100 px-2 py-1 rounded-2xl text-[10px]">
                          Pending
                        </span>
                      )}
                      {store.status === 'ACTIVE' && (
                        <span className="text-[#10B981] bg-[#108981]/10 px-2 py-1 rounded-2xl text-[10px]">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Store Info */}
                <div className="text-sm  space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-neutral-500">Address</p>
                    <p className="text-sm line-clamp-1">{store.storeAddress}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-neutral-500">Email</p>{' '}
                    <p className="text-sm">{store.email}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-neutral-500">Phone Number</p>{' '}
                    <p className="text-sm">{store.phoneNumber}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-neutral-500">Created on</p>
                    <p className="text-sm">{formatDate(store.createdAt)}</p>
                  </div>
                </div>

                {/* Action */}
                <Button
                  size="icon"
                  className="w-full"
                  href={`/vendor/products/${store.id}`}
                  disabled={store.status === 'PENDING_APPROVAL'}
                >
                  {store.status === 'PENDING_APPROVAL'
                    ? 'Awaiting Approval'
                    : 'Customize & Add Products'}
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
