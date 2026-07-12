import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';

import VendorDashboardHeader from '@/components/ui/headers/vendor-header';

import OrdersWrapper from '@/features/vendor/orders/components/orders-wrapper';
import OrderSkeleton from '@/features/vendor/orders/components/order-skeleton';
import { Suspense } from 'react';


const CATEGORIES = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Declined', value: 'DECLINED' },
];

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
          {/* <Toolbar
                  title="Orders"
                  searchPlaceholder="Search orders..."
                  filter={ CATEGORIES[1] }
                  onFilterChange={() => {}}
                  filterOptions={CATEGORIES}
                /> */}

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
