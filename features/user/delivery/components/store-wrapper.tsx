import ErrorState from '@/components/layout/error-state';
import StoreGrid from './store-grid';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import EmptyState from '@/components/layout/empty-state';
import { Store } from 'lucide-react';
import { fetchCategoryStoresService } from '../service';

export default async function StoresPageWrapper({
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
  const { latitude, longitude, subcategoryId, page, limit, search, radiusKm } =
    await searchParams;

  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;

  try {
    const { data, meta } = await fetchCategoryStoresService({
      categoryId: id,
      lat: latitude,
      lng: longitude,
      subcategoryId,
      page: String(pageNum),
      limit: String(limitNum),
      search,
      radiusKm,
    });

    const totalPages = meta?.totalPages;

    const stores = data.data;

    console.log('Stores:', stores);
    console.log('Meta:', meta);

    if (!stores?.length)
      return (
        <EmptyState
          icon={<Store size={36} className="text-neutral-400" />}
          title="No stores found"
          message="Try adjusting your search or browse all stores."
          urlPath="/user/delivery"
          buttonText="Browse Categories"
        />
      );

    return (
      <>
        <StoreGrid stores={stores} />

        {totalPages > 0 && (
          <PaginationControls currentPage={pageNum} totalPages={totalPages} />
        )}
      </>
    );
  } catch (error) {
    console.error('Failed to load stores:', error);

    return (
      <ErrorState
        title="Failed to load stores"
        message="Please try again later."
        retry
      />
    );
  }
}
