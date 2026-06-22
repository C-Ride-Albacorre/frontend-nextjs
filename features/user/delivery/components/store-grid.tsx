import StoreCard from './store-card';
import CategoriesSkeleton from './categories-skeleton';
import { Store as StoreIcon } from 'lucide-react';
import Card from '@/components/layout/card';

type ApiStore = {
  id: string;
  storeName: string;
  categoryId: string;
  storeCategory: string;
  storeDescription: string;
  storeAddress: string;
  phoneNumber: string;
  dailyOrderLimit: number | null;
  preparationTime: number;
  storeLogo: string | null;
  isOpen: boolean;
  distance: number | null;
  subcategories: string[];
  products: any[];
};

export default function StoreGrid({
  stores,
}: {
  stores: ApiStore[];
}) {
  return (
    <div className="my-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          delivery={`${Math.round(store.distance ?? 0)} km`}
          time={`${store.preparationTime} mins`}
        />
      ))}
    </div>
  );
}
