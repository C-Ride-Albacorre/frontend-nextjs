import AddStore from '@/features/vendor/store/components/add-store';
import StoreCatalogueData from '@/features/vendor/store/components/store-catalogue-data';
import StoreCatalogueSkeleton from '@/features/vendor/store/components/store-catalogue-skeleton';
import { Suspense } from 'react';

export default async function StorePage() {
  return (
    <>
      <AddStore />

      <Suspense fallback={<StoreCatalogueSkeleton />}>
        <StoreCatalogueData />
      </Suspense>
    </>
  );
}
