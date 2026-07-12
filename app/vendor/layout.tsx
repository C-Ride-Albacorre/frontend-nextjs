import VendorLayoutClient from '@/features/vendor/layout-client';
import VendorStoreCard from '@/features/vendor/store-card';
import VendorStoreCardSkeleton from '@/features/vendor/store-card-skeleton';
import { Suspense } from 'react';

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VendorLayoutClient
      sideBarCard={
        <Suspense fallback={<VendorStoreCardSkeleton />}>
          <VendorStoreCard />
        </Suspense>
      }
    >
      {children}
    </VendorLayoutClient>
  );
}
