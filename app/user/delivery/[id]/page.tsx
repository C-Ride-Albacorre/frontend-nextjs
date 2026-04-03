import DashboardHeader from '@/components/ui/headers/user-dashboard-header';
import CategoryIcons from '@/features/user/delivery/components/category-icons';
import LocationChips from '@/features/user/delivery/components/location-chips';
import StoreGrid from '@/features/user/delivery/components/store-grid';
import Location from '@/features/public/homepage/components/location';
import {
  fetchCategoryStoresAction,
  fetchSubcategoriesAction,
} from '@/features/user/delivery/action';
import { Store } from 'lucide-react';
import Card from '@/components/layout/card';
import RetryButton from '@/components/ui/buttons/retry-button';
import { Button } from '@/components/ui/buttons/button';

export default async function CategoryDeliveryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    name?: string;
    subcategoryId?: string;
    latitude?: string;
    longitude?: string;
  }>;
}) {
  const { id } = await params;
  const { latitude, longitude } = await searchParams;

  let stores = [];
  let subCategory = [];
  let isStoreError = false;
  let isSubCategoryError = false;

  try {
    const lat = latitude ? parseFloat(latitude) : undefined;
    const lng = longitude ? parseFloat(longitude) : undefined;

    stores = await fetchCategoryStoresAction(id, lat, lng);
  } catch (error) {
    isStoreError = true;
  }

  try {
    subCategory = await fetchSubcategoriesAction(id);
  } catch (error) {
    isSubCategoryError = true;
  }

  const title =
    stores?.length > 0 ? `${stores[0].storeName} / Stores` : 'Stores';

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

        {/* <form action="">
          <ActionInput
            ariaLabel="Search items"
            placeholder="Find what you want today"
            leftIcon={<Search className="h-6 w-6 text-neutral-500" />}
            buttonText="Search"
          />
        </form> */}

        {subCategory.length === 0 && !isSubCategoryError ? (
          <p className="text-neutral-500 text-center">
            No subcategories available.
          </p>
        ) : isSubCategoryError ? (
          <div className="flex md:flex-row flex-col justify-between gap-3 items-center">
            <p className="text-red-500 text-center">Failed to load subcategories.</p>

            <RetryButton />
          </div>
        ) : (
          <CategoryIcons subcategories={subCategory} />
        )}

        {/* <Filters /> */}

        <LocationChips />
        {!isStoreError && stores.length === 0 ? (
          <Card
            gap="md"
            spacing="lg"
            className="flex  flex-col  items-center"
          >
            <Store size={48} className="text-neutral-400" />
            <p className="text-neutral-500 text-center">No stores available.</p>

            <Button variant="primary" size="icon" href="/user/delivery">
              Go to Categories
            </Button>
          </Card>
        ) : isStoreError ? (
          <Card
            gap="md"
            spacing="lg"
            className="flex  flex-col gap-4 items-center"
          >
           
            <p className="text-red-500 text-center">Failed to load stores.</p>

            <RetryButton />
          </Card>
        ) : (
          <StoreGrid stores={stores} />
        )}
      </div>

      <div>
        <Location />
      </div>
    </section>
  );
}
