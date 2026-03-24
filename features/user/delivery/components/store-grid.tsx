'use client';

import { useCategoryStores } from '../fetch';
import StoreCard from './store-card';
import CategoriesSkeleton from './categories-skeleton';
import { Store } from 'lucide-react';
import Card from '@/components/layout/card';

type Store = {
  id: string;
  image: string;
  tag: string;
  name: string;
  cuisine: string;
  rating: number;
  location: string;
  delivery: string;
  time: string;
};

export default function StoreGrid({
  id,
  latitude,
  longitude,
}: {
  id: string;
  latitude?: string;
  longitude?: string;
}) {
  const lat = latitude ? parseFloat(latitude) : undefined;
  const lng = longitude ? parseFloat(longitude) : undefined;


  console.log('StoreGrid Props:', { id, latitude, longitude, lat, lng });
  const {
    data: stores,
    isPending,
    isError,
    error,
  } = useCategoryStores(id, lat, lng);

  console.log('Stores Details:', stores);
  console.log('Stores Error:', error);

  if (isPending) {
    return <CategoriesSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load stores.
      </div>
    );
  }

  if (!Array.isArray(stores) || !stores.length) {
    return (
      <Card className="mt-6  bg-white text-sm text-neutral-500 flex flex-col items-center gap-2 h-60">
        <Store size={32} className="text-neutral-400" />

        No stores found.
      </Card>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stores.map((store: Store) => (
        <StoreCard
          key={store.id}
          id={store.id}
          image={store.image}
          tag={store.tag}
          name={store.name}
          cuisine={store.cuisine}
          rating={store.rating}
          location={store.location}
          delivery={store.delivery}
          time={store.time}
        />
      ))}
    </div>
  );
}
