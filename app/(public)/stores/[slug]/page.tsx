
import StoreProductsWrapper from '@/features/public/stores/components/store-products-wrapper';

export default async function StoreVendorsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <StoreProductsWrapper params={params} />;
}
