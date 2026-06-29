import ProductsSkeleton from '@/features/public/stores/components/products-skeleton';
import StoreProductsWrapper from '@/features/public/stores/components/store-products-wrapper';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export default async function StoreVendorsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <StoreProductsWrapper params={params} />
    </Suspense>
  );
}
