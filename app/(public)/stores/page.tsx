import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import RetryButton from '@/components/ui/buttons/retry-button';
import CategoryIcons from '@/features/public/homepage/components/category-icons';
import Location from '@/features/public/homepage/components/location';
import {
  fetchCategoriesAction,
  fetchCategoryStoresAction,
} from '@/features/user/delivery/action';
import LocationChips from '@/features/user/delivery/components/location-chips';
import StoreGrid from '@/features/user/delivery/components/store-grid';
import StoreSearch from '@/features/user/delivery/components/store-search';
import { Store } from 'lucide-react';

export default async function StoresPage({
  searchParams,
}: {
  searchParams: {
    id?: string;
    latitude?: string;
    longitude?: string;
    page?: string;
    limit?: string;
    search?: string;
    radiusKm?: string;
  };
}) {
  // ✅ FIXED (no await)
  const { id, latitude, longitude, page, limit, search, radiusKm } =
    await searchParams;

  let categories: any[] = [];
  let stores: any[] = [];
  let total = 0;
  let isCategoryError = false;
  let isStoreError = false;

  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;

  // ✅ Fetch categories first
  try {
    categories = await fetchCategoriesAction();
  } catch {
    isCategoryError = true;
  }

  // ✅ Fetch stores if id exists
  if (id) {
    try {
      const lat = latitude ? parseFloat(latitude) : undefined;
      const lng = longitude ? parseFloat(longitude) : undefined;
      const radius = radiusKm ? parseFloat(radiusKm) : undefined;

      const result = await fetchCategoryStoresAction(
        id,
        lat,
        lng,
        undefined,
        pageNum,
        limitNum,
        search,
        radius,
      );

      stores = result.stores;
      total = result.total;
    } catch {
      isStoreError = true;
    }
  }

  const title = id
    ? categories.find((c) => c.id === id)?.name || 'Stores'
    : 'All Categories';

  const totalPages = Math.ceil(total / limitNum);

  return (
    <section>
      <div className="px-4 xl:px-0 py-24 md:py-28 mx-auto max-w-6xl space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-neutral-500">
            {id
              ? 'Browse stores in this category'
              : 'Select a category to view stores'}
          </p>
        </div>

        <StoreSearch categoryId={id} />

        {/* Categories */}
        {isCategoryError ? (
          <RetryButton />
        ) : (
          <CategoryIcons categories={categories} />
        )}

        {/* Stores */}
        {id && (
          <>
            <LocationChips />

            {!isStoreError && stores.length === 0 ? (
              <Card className="flex flex-col items-center">
                <Store size={48} className="text-neutral-400" />
                <p>No stores available.</p>
                <Button href="/stores">Go to Categories</Button>
              </Card>
            ) : isStoreError ? (
              <RetryButton />
            ) : (
              <StoreGrid stores={stores} />
            )}

            {stores.length > 0 && (
              <PaginationControls
                currentPage={pageNum}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </div>

      <Location />
    </section>
  );
}
