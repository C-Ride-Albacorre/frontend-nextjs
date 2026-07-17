import ProductIdWrapper from '@/features/vendor/products/components/product-id-wrapper';



export default async function ProductViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(' ProductViewPage params:', { id });

  return <ProductIdWrapper productId={id} />;
}
