import StoreCard from './store-card';
import { Store as StoreIcon } from 'lucide-react';
import Card from '@/components/layout/card';

type ApiStore = {
  id: string;
  storeName: string;
  storeLogo: string | null;
  categoryId: string;
  storeCategory: string;
  storeAddress: string;
  storeDescription: string;
  preparationTime: number;
  distance: number;
};

export default function StoreGrid({
  stores,
  returnUrl,
}: {
  stores: ApiStore[];
  returnUrl: string;
}) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          id={store.id}
          image={store.storeLogo ?? ''}
          name={store.storeName}
          tag={store.storeCategory}
          cuisine={store.storeDescription}
          rating={0}
          location={store.storeAddress}
          delivery={`${Math.round(store.distance)} km`}
          time={`${store.preparationTime} mins`}
          returnUrl={returnUrl}
        />
      ))}
    </div>
  );
}
