import DashboardHeader from '@/components/ui/headers/user-dashboard-header';
import LocationChips from '@/features/user/delivery/components/location-chips';
import Location from '@/features/public/homepage/components/location';
('@/features/user/delivery/action');
import StoreSearch from '@/features/user/delivery/components/store-search';
import { Suspense } from 'react';
import CategoryIconsSkeleton from '@/features/user/delivery/components/category-icon-skeleton';
import SubCategoriesWrapper from '@/features/public/stores/components/subcategories-wrapper';
import StoreSkeleton from '@/features/public/stores/components/stores-skeleton';
import StoresPageWrapper from '@/features/user/delivery/components/store-wrapper';

export default async function StoresPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    name?: string;
    subcategoryId?: string;
    latitude?: string;
    longitude?: string;
    page?: string;
    limit?: string;
    search?: string;
    radiusKm?: string;
  }>;
}) {
  const { id } = await params;
  const { name } = await searchParams;

  const title = name ? `${name} / Stores` : 'Stores';

  return (
    <section>
      <DashboardHeader />

      <div className="px-4 py-8 xl:px-0 md:py-12 mx-auto max-w-6xl space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-neutral-500">
            Select from our premium vendors
          </p>
        </div>

        <StoreSearch categoryId={id} />

        <Suspense fallback={<CategoryIconsSkeleton />}>
          <SubCategoriesWrapper categoryId={id} />
        </Suspense>

        {/* {subCategory.length === 0 && !isSubCategoryError ? (
          <p className="text-neutral-500 text-center">
            No subcategories available.
          </p>
        ) : isSubCategoryError ? (
          <div className="flex md:flex-row flex-col justify-between gap-3 items-center">
            <p className="text-red-500 text-center">
              Failed to load subcategories.
            </p>

            <RetryButton />
          </div>
        ) : (
          <CategoryIcons subcategories={subCategory} />
        )} */}

        {/* <Filters /> */}

        <LocationChips />

        <Suspense fallback={<StoreSkeleton />}>
          <StoresPageWrapper searchParams={searchParams} params={params} />
        </Suspense>
      </div>

      <div>
        <Location />
      </div>
    </section>
  );
}
