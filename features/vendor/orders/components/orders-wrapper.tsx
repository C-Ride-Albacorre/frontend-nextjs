import OrderCard from './order-card';
import { getVendorOrderAction } from '../action';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import Card from '@/components/layout/card';
import { Package } from 'lucide-react';

import RetryButton from '@/components/ui/buttons/retry-button';
import { Suspense } from 'react';
import OrderSkeleton from './order-skeleton';

export default async function OrdersWrapper({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
  };
}) {
  const { page, limit } = searchParams;

  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;

  const response = await getVendorOrderAction({
    page: pageNum,
    limit: limitNum,
  });

  const Orders = response.orders || [];

  const totalPages = response.totalPages;

  console.log(Orders, 'orders baby');

  if (!response.success) {
    return (
      <Card
        gap="md"
        spacing="lg"
        className="flex  flex-col  items-center min-h-[85vh] justify-center"
      >
        <Package size={48} className="text-neutral-400" />
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold">No Orders Available</h2>
          <p className="text-center text-sm text-neutral-500 max-w-2xl mx-auto">
            {response.message ||
              'Failed to load orders. Please check your connection and try again.'}
          </p>
        </div>

        <RetryButton />
      </Card>
    );
  }

  return (
    <>
      {/* <Toolbar
        title="Incoming Orders"
        searchPlaceholder="Search orders..."
        filter={}
        onFilterChange={}
        filterOptions={CATEGORIES}
      /> */}

      <Suspense fallback={<OrderSkeleton />}>
        {!Orders.length ? (
          <Card
            gap="md"
            spacing="lg"
            className=" flex  flex-col  items-center min-h-[75vh] justify-center"
          >
            <Package size={48} className="text-neutral-400" />
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold">No Orders Available</h2>
              <p className="text-center text-sm text-neutral-500 max-w-2xl mx-auto">
                You currently have no incoming orders. Once customers place
                orders, they will appear here for you to manage and fulfill.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Orders.map((order) => {
              const customer = `${order.user?.firstName ?? ''} ${order.user?.lastName ?? ''}`;

              const items =
                order.items?.map(
                  (item: {
                    product?: { productName?: string; basePrice: number };
                    quantity: number;
                  }) => ({
                    name: item.product?.productName ?? 'Unknown Product',
                    quantity: item.quantity,

                    basePrice: item.product?.basePrice ?? 0,
                  }),
                ) ?? [];

              return (
                <OrderCard
                  id={order.id}
                  key={order.id}
                  orderCode={order.orderCode}
                  orderNumber={order.orderNumber}
                  orderStatus={order.orderStatus}
                  paymentStatus={order.paymentStatus}
                  createdAt={order.createdAt}
                  customer={customer}
                  email={order.user?.email ?? 'N/A'}
                  phoneNumber={order.user?.phoneNumber}
                  items={items}
                  subtotal={order.vendorSummary?.subtotal ?? 0}
                />
              );
            })}
          </div>
        )}
      </Suspense>

      {totalPages > 1 && (
        <PaginationControls currentPage={pageNum} totalPages={totalPages} />
      )}
    </>
  );
}
