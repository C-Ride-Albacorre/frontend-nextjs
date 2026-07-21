import ErrorState from '@/components/layout/error-state';
import { Package } from 'lucide-react';
import { getOrdersService } from '@/features/user/delivery/order-service';

import OrderList from '@/features/user/order-history/components/order-list';
import EmptyState from '@/components/layout/empty-state';

export default async function OrderHistoryPage() {
  try {
    const response = await getOrdersService();

    // console.log(' [OrderHistoryPage] Response:', response);

    const orders = response.data;


    if (!orders || orders.length === 0) {

      return <EmptyState icon={<Package size={48} className="text-neutral-500" />} title="No Orders" message="You have not placed any orders yet." />
    }

    return (
      <>
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

        <>
          <OrderList orders={orders as any} />
        </>
      </>
    );
  } catch (error) {
    console.error('Error fetching orders:', error);

    return (
      <ErrorState
        icon={<Package size={48} className="text-orange-500" />}
        title="Something went wrong!"
        message={
          error instanceof Error
            ? error.message
            : 'Unable to load order history. Please try again later.'
        }
      />
    );
  }
}
