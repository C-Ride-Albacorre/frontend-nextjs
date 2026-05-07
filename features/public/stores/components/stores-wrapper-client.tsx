'use client';

import StoreGrid from '@/features/user/delivery/components/store-grid';
import RetryButton from '@/components/ui/buttons/retry-button';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Store } from 'lucide-react';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import { useStoresQuery } from '../fetch';
import StoreSkeleton from './stores-skeleton';

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
    subcategoryId?: string;
  };
}

export default function StoresWrapper({ searchParams }: StoresPageProps) {
  const {
    id,
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

  const { data, isLoading, isError, refetch } = useStoresQuery({
    id,
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

  if (isLoading) {
    return <StoreSkeleton />;
  }

  if (isError) {
    return (
      <Card className="flex flex-col items-center py-12">
        <Store size={48} className="text-neutral-400" />
        <p>Failed to load stores.</p>
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
}
