import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';

import VendorDashboardHeader from '@/components/ui/headers/vendor-header';

import OrdersWrapper from '@/features/vendor/orders/components/orders-wrapper';
import OrderSkeleton from '@/features/vendor/orders/components/order-skeleton';
import { Suspense } from 'react';

export default async function OrderManagementPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <Suspense
            key={`${params.page}-${params.limit}`}
            fallback={<OrderSkeleton />}
          >
            <OrdersWrapper searchParams={params} />
          </Suspense>
        </SectionLayout>
      </MainLayout>
    </>
  );
}
