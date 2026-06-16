import Card from '@/components/layout/card';
import Header from '@/components/ui/headers/user-route-header';
import { getOrdersAction } from '@/features/user/delivery/action';

import OrderList from '@/features/user/order-history/components/order-list';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export default async function OrderHistoryPage() {
  const response = await getOrdersAction();

  const orders = response.success ? response.data : [];

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <Header />

      {/* <div className="flex items-center gap-4 w-full">
        <Input
          placeholder="Search by order ID, type, or location..."
          leftIcon={<Search size={12} className="text-primary-text-100" />}
          className="w-full flex-1"
          variant="fill"
          spacing="none"
        />

        <div
          className="
        w-48"
        >
          <Select
            id="orders"
            spacing="none"
            options={orderOptions}
            onChange={(value) => setFilter(value)}
            value={filter}
            leftIcon={<Funnel size={12} className="text-primary-text-100" />}
            variant="fill"
            className="w-48"
          />
        </div>
      </div> */}

      {/* <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Spent" value="₦21,000.00" />
        <StatCard title="Orders Placed" value="15" />
        <StatCard title="Cancelled Orders" value="2" />
      </section> */}

      <Suspense
        fallback={
          <Card className="flex items-center justify-center py-16 gap-4">
            <Loader size={20} className="animate-spin text-primary" />
          </Card>
        }
      >
        <OrderList orders={orders} />
      </Suspense>
    </main>
  );
}
