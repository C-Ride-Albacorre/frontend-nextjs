'use client';

import RetryButton from '@/components/ui/buttons/retry-button';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Store } from 'lucide-react';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import { useStoresQuery } from '../fetch';
import StoreSkeleton from './stores-skeleton';
import StoreGrid from './store-grid';

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

export default function StoresWrapper({
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

  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;

  let stores: any[] = [];
  let totalPages: number = 1;

  const { data, isLoading, isError } = useStoresQuery({
    categoryId,
    latitude,
    longitude,
    page: String(pageNum),
    limit: String(limitNum),
    search,
    radiusKm,
    subcategoryId,
  });

  stores = data?.stores || [];
  const total = data?.total || 0;
  totalPages = Math.max(1, Math.ceil(total / limitNum));

  console.log('Stores:', stores);

  if (isLoading) {
    return <StoreSkeleton />;
  }

  if (isError) {
    return (
      <Card
        gap="md"
        border="none"
        spacing="lg"
        className="flex flex-col items-center py-12"
      >
        <Store size={48} className="text-neutral-400" />
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold">Failed to load stores.</h2>
          <p className="text-center text-sm text-neutral-500">
            Please try again later.
          </p>
        </div>

        <RetryButton />
      </Card>
    );
  }

  if (!stores.length) {
    return (
      <Card
        gap="md"
        border="none"
        spacing="lg"
        className="flex flex-col items-center py-12"
      >
        <Store size={48} className="text-neutral-400" />

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold">No stores found.</h2>
          <p className="text-center text-sm text-neutral-500">
            Try adjusting your search or browse all stores.
          </p>
        </div>
        <Button href="/stores">Browse all stores</Button>
      </Card>
    );
  }

  return (
    <>
      <StoreGrid stores={stores} returnUrl={returnUrl} />
      <PaginationControls currentPage={pageNum} totalPages={totalPages} />
    </>
  );
}
