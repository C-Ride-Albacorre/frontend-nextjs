import Location from '@/features/public/homepage/components/location';
import StoreSearch from '@/features/public/stores/components/store-search';

import LocationChips from '@/features/user/delivery/components/location-chips';
import { Suspense } from 'react';
import StoresWrapper from '@/features/public/stores/components/stores-wrapper';
import CategoriesWrapper from '@/features/public/stores/components/categories-wrapper';
import FoodMarqueeSkeleton from '@/features/public/homepage/components/food-marquee-skeleton';
import CategoryIconsSkeleton from '@/features/user/delivery/components/category-icon-skeleton';

interface StoresPageProps {
  searchParams: {
    id: string;
    name?: string;
    latitude?: string;
    longitude?: string;
    page?: string;
    limit?: string;
    search?: string;
    radiusKm?: string;
  };
}

export default function StoresPage({ searchParams }: StoresPageProps) {
  const { id, name, search } = searchParams;

  const title =
    id && search
      ? `${name || 'Stores'} - "${search}"`
      : search
        ? `Results for "${search}"`
        : id
          ? name || 'Stores'
          : 'All Stores';

  const subtitle =
    id && search
      ? `Searching in ${name || 'category'} and nearby`
      : search
        ? 'Showing stores matching your search'
        : id
          ? `Browse stores in ${name || 'this category'}`
          : 'Stores available near you';

  return (
    <section>
      <div className="px-4 xl:px-0 py-24 md:py-28 mx-auto max-w-6xl space-y-4 md:space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-neutral-500">{subtitle}</p>
        </div>

        <StoreSearch initialSearch={search ?? ''} />

        <Suspense fallback={<CategoryIconsSkeleton />}>
          <CategoriesWrapper />
        </Suspense>

        <LocationChips />

        <Suspense fallback={<FoodMarqueeSkeleton />}>
          <StoresWrapper searchParams={searchParams} />
        </Suspense>
      </div>

      <Location />
    </section>
  );
}
