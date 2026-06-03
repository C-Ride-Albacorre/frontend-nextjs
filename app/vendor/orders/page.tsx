import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorToolbar from '@/components/layout/tool-bar';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import OrderCard from '@/features/vendor/orders/components/order-card';
import StatCard from '@/components/layout/stat-card';
import { Clock, ShoppingBag, Star, TrendingUp } from 'lucide-react';
import { getVendorOrderAction } from '@/features/vendor/orders/action';
import OrdersWrapper from '@/features/vendor/orders/components/orders-wrapper';
import OrderSkeleton from '@/features/vendor/orders/components/order-skeleton';
import { Suspense } from 'react';

const CATEGORIES = [
  { label: 'All', value: 'All' },
  { label: 'Nigerian', value: 'Nigerian' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Snacks', value: 'Snacks' },
];

export default async function OrderManagementPage() {

  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <Suspense fallback={<OrderSkeleton />}>
            <OrdersWrapper />
          </Suspense>
        </SectionLayout>
      </MainLayout>
    </>
  );
}
