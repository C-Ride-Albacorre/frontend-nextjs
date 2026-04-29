import StoreGrid from '@/features/user/delivery/components/store-grid';
import RetryButton from '@/components/ui/buttons/retry-button';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Store } from 'lucide-react';
import PaginationControls from '@/components/ui/buttons/pagination-control';

import { fetchCategoryStoresAction } from '@/features/user/delivery/action';

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

export default async function StoresWrapper({ searchParams }: StoresPageProps) {
  const params = await searchParams;

  const { id, name, latitude, longitude, page, limit, search, radiusKm } =
    params;

  console.log('searchParams in StoresWrapper:', params);

  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;

  const lat = latitude ? parseFloat(latitude) : undefined;
  const lng = longitude ? parseFloat(longitude) : undefined;
  const radius = radiusKm ? parseFloat(radiusKm) : undefined;

  try {
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

    const { stores, total } = result;
    const totalPages = Math.max(1, Math.ceil(total / limitNum));

    if (!stores.length) {
      return (
        <Card gap='md' border='none' spacing='lg' className="flex flex-col items-center py-12">
          <Store size={48} className="text-neutral-400" />
          <p>No stores found.</p>
          <Button href="/stores">Browse all stores</Button>
        </Card>
      );
    }

    return (
      <>
        <StoreGrid stores={stores} />
        <PaginationControls currentPage={pageNum} totalPages={totalPages} />
      </>
    );
  } catch (err) {
    console.error(err);
    return <RetryButton />;
  }
}
