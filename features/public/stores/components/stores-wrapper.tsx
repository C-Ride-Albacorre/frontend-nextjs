import { Store } from 'lucide-react';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import StoreGrid from './store-grid';
import { fetchCategoryStoresService } from '@/features/user/delivery/service';
import EmptyState from '@/components/layout/empty-state';
import ErrorState from '@/components/layout/error-state';

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
    subcategoryId?: string;
  };

  returnUrl: string;
}

export default async function StoresWrapper({
  searchParams,
  returnUrl,
}: StoresPageProps) {
  const {
    categoryId,
    latitude,
    longitude,
    page,
    limit,
    search,
    radiusKm,
    subcategoryId,
  } = searchParams;

  const pageNum = Number(page ?? 1);
  const limitNum = Number(limit ?? 10);

  try {
    const { data, meta } = await fetchCategoryStoresService({
      categoryId,
      lat: latitude,
      lng: longitude,
      page: String(pageNum),
      limit: String(limitNum),
      search,
      radiusKm,
      subcategoryId,
    });

    const totalPages = meta?.totalPages;

    const stores = data.data;

    console.log('Stores:', stores);
    console.log('Meta:', meta);

    if (!stores?.length) {
      return (
        <EmptyState
          icon={<Store size={36} className="text-neutral-400" />}
          title="No stores found"
          message="Try adjusting your search or browse all stores."
        />
      );
    }

    return (
      <>
        <StoreGrid stores={stores} returnUrl={returnUrl} />

        {totalPages > 0 && (
          <PaginationControls currentPage={pageNum} totalPages={totalPages} />
        )}
      </>
    );
  } catch (error) {
    console.error('Failed to load stores:', error);

    return (
      <ErrorState
        icon={<Store size={36} className="text-orange-500" />}
        title="Failed to load stores"
        message="Please try again later."
      />
    );
  }
}
