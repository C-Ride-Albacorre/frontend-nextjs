import Location from '@/features/public/homepage/components/location';
import StoreSearch from '@/features/public/stores/components/store-search';

import LocationChips from '@/features/user/delivery/components/location-chips';
import { Suspense } from 'react';
import CategoryIconsSkeleton from '@/features/user/delivery/components/category-icon-skeleton';
import SubCategoriesWrapper from '@/features/public/stores/components/subcategories-wrapper';
import StoreSkeleton from '@/features/public/stores/components/stores-skeleton';
import StoresWrapper from '@/features/public/stores/components/stores-wrapper-client';

interface StoresPageProps {
  searchParams: {
    categoryId?: string;
    name?: string;
    latitude?: string;
    longitude?: string;
    page?: string;
    limit?: string;
    search?: string;
    radiusKm?: string;
  };
}

export default async function StoresPage({
  searchParams,
}: {
  searchParams: Promise<StoresPageProps['searchParams']>;
}) {
  const { categoryId, name, search } = await searchParams;

  const title =
    categoryId && search
      ? `${name || 'Stores'} - "${search}"`
      : search
        ? `Results for "${search}"`
        : categoryId
          ? name || 'Stores'
          : 'All Stores';

  const subtitle =
    categoryId && search
      ? `Searching in ${name || 'category'} and nearby`
      : search
        ? 'Showing stores matching your search'
        : categoryId
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
          <SubCategoriesWrapper categoryId={categoryId} />
        </Suspense>

        <LocationChips />

        <Suspense fallback={<StoreSkeleton />}>
          <StoresWrapper searchParams={await searchParams} />
        </Suspense>
      </div>

      <Location />
    </section>
  );
}
