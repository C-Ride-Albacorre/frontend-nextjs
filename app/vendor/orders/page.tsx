import OrdersWrapper from '@/features/vendor/orders/components/orders-wrapper';

export default async function OrderManagementPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <>
      <OrdersWrapper searchParams={params} />
    </>
  );
}
