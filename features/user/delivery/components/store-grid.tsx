'use client';

import StoreCard from './store-card';
import CategoriesSkeleton from './categories-skeleton';
import { Store as StoreIcon } from 'lucide-react';
import Card from '@/components/layout/card';

type ApiStore = {
  id: string;
  storeName: string;
  storeLogo: string | null;
  categoryId: string;
  storeAddress: string;
  storeDescription: string;
  preparationTime: number;
  distance: number;
};

export default function StoreGrid({
  stores,
  isLoading,
  isError,
}: {
  stores: ApiStore[];
  isLoading?: boolean;
  isError?: boolean;
}) {
  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  console.log('Stores in StoreGrid:', stores);

  if (isError) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load stores.
      </div>
    );
  }

  if (!stores?.length) {
    return (
      <Card className="mt-6 bg-white text-sm text-neutral-500 flex flex-col items-center justify-center gap-2 h-60">
        <StoreIcon size={32} className="text-neutral-400" />
        No stores found.
      </Card>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          id={store.id}
          image={store.storeLogo ?? ''}
          name={store.storeName}
          tag={store.categoryId}
          cuisine={store.storeDescription}
          rating={0}
          location={store.storeAddress}
          delivery={`${Math.round(store.distance)} km`}
          time={`${store.preparationTime} mins`}
        />
      ))}
    </div>
  );
}
