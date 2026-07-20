import StoreSearch from '@/features/public/stores/components/store-search';

import LocationChips from '@/features/user/delivery/components/location-chips';
import { Suspense } from 'react';
import CategoryIconsSkeleton from '@/features/user/delivery/components/category-icon-skeleton';
import SubCategoriesWrapper from '@/features/public/stores/components/subcategories-wrapper';
import StoreSkeleton from '@/features/public/stores/components/stores-skeleton';
import StoresWrapper from '@/features/public/stores/components/stores-wrapper';

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
  const resolvedSearchParams = await searchParams;

  const { categoryId, name, search } = resolvedSearchParams;

  const query = new URLSearchParams(
    resolvedSearchParams as Record<string, string>,
  ).toString();

  const currentUrl = query ? `/stores?${query}` : '/stores';

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
    // <section>
    //   <div className="space-y-4 md:space-y-10">
    //     <div className="space-y-4">
    //       <h2 className="text-2xl font-semibold">{title}</h2>
    //       <p className="text-sm text-neutral-500">{subtitle}</p>
    //     </div>

    //     <StoreSearch initialSearch={search ?? ''} />

    //     <Suspense fallback={<CategoryIconsSkeleton />}>
    //       <SubCategoriesWrapper categoryId={categoryId} />
    //     </Suspense>

    //     <LocationChips />

    //     <Suspense fallback={<StoreSkeleton />}>
    //       <StoresWrapper
    //         searchParams={resolvedSearchParams}
    //         returnUrl={currentUrl}
    //       />
    //     </Suspense>
    //   </div>
    // </section>

    <section>
      <div className="space-y-4 md:space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-neutral-500">{subtitle}</p>
        </div>

        <StoreSearch initialSearch={search ?? ''} />

        <SubCategoriesWrapper categoryId={categoryId} />

        <LocationChips />

        <StoresWrapper
          searchParams={resolvedSearchParams}
          returnUrl={currentUrl}
        />
      </div>
    </section>
  );
}
