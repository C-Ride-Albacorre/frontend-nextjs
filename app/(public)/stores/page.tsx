import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import RetryButton from '@/components/ui/buttons/retry-button';
import CategoryIcons from '@/features/public/homepage/components/category-icons';
import Location from '@/features/public/homepage/components/location';
import StoreSearch from '@/features/public/homepage/components/store-search';
import {
  fetchCategoriesAction,
  fetchCategoryStoresAction,
} from '@/features/user/delivery/action';
import LocationChips from '@/features/user/delivery/components/location-chips';
import StoreGrid from '@/features/user/delivery/components/store-grid';
import { Store } from 'lucide-react';

interface StoresPageProps {
  searchParams: Promise<{
    id?: string;
    latitude?: string;
    longitude?: string;
    page?: string;
    limit?: string;
    search?: string;
    radiusKm?: string;
  }>;
}

export default async function StoresPage({ searchParams }: StoresPageProps) {
  const { id, latitude, longitude, page, limit, search, radiusKm } =
    await searchParams;

  let categories: any[] = [];
  let stores: any[] = [];
  let total = 0;
  let isCategoryError = false;
  let isStoreError = false;

  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;
  const lat = latitude ? parseFloat(latitude) : undefined;
  const lng = longitude ? parseFloat(longitude) : undefined;
  const radius = radiusKm ? parseFloat(radiusKm) : undefined;

  try {
    categories = await fetchCategoriesAction();
  } catch {
    isCategoryError = true;
  }

  try {
    // ✅ One call handles everything — id optional, search optional, location optional
    const result = await fetchCategoryStoresAction(
      id ?? '',
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

  const selectedCategory = categories.find((c) => c.id === id);

  const title = search
    ? `Results for "${search}"`
    : id
      ? selectedCategory?.name || 'Stores'
      : 'All Stores';

  const subtitle = search
    ? id
      ? `Searching in ${selectedCategory?.name || 'category'} and nearby`
      : 'Showing stores matching your search'
    : id
      ? 'Browse stores in this category'
      : 'Stores available near you';

  const totalPages = Math.ceil(total / limitNum);

  return (
    <section>
      <div className="px-4 xl:px-0 py-24 md:py-28 mx-auto max-w-6xl space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-neutral-500">{subtitle}</p>
        </div>

        <StoreSearch />

        {isCategoryError ? (
          <RetryButton />
        ) : (
          <CategoryIcons categories={categories} />
        )}

        <LocationChips />

        {isStoreError ? (
          <RetryButton />
        ) : stores.length === 0 ? (
          <Card className="flex flex-col items-center gap-4 py-12">
            <Store size={48} className="text-neutral-400" />
            <p className="text-neutral-500">No stores found.</p>
            <Button href="/stores">Browse all stores</Button>
          </Card>
        ) : (
          <StoreGrid stores={stores} />
        )}

        {stores.length > 0 && (
          <PaginationControls currentPage={pageNum} totalPages={totalPages} />
        )}
      </div>

      <Location />
    </section>
  );
}
