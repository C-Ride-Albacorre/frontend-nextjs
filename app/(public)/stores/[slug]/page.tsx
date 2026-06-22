import StoreProductsWrapper from '@/features/public/stores/components/store-products-wrapper';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export default async function StoreVendorsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-8 flex items-center justify-center gap-2 text-primary min-h-full  ">
          <Loader className="animate-spin text-primary" />{' '}
          <span> Loading store details...</span>
        </div>
      }
    >
      <StoreProductsWrapper params={params} />
    </Suspense>
  );
}
