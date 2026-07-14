'use client';

import ErrorState from '@/components/layout/error-state';
import { useVendorOrders } from '../fetch';
import { LoaderCircle, Package } from 'lucide-react';
import EmptyState from '@/components/layout/empty-state';
import OrderCard from './order-card';
import PaginationControls from '@/components/ui/buttons/pagination-control';

export default function OrderList({
  page,
  limit,
  initialData,
}: {
  page: number;
  limit: number;
  initialData: {
    orders: any[];
    total: number;
    totalPages: number;
  };
}) {
  const { data, error, isFetching } = useVendorOrders(page, limit, initialData);

  if (error) {
    return (
      <ErrorState
        icon={<Package size={48} className="text-orange-500" />}
        title="Something went wrong"
        message={(error as Error).message}
      />
    );
  }

  if (!data?.orders.length) {
    return (
      <EmptyState
        icon={<Package size={48} className="text-neutral-400" />}
        title="No Orders Available"
        message="There are currently no incoming orders."
      />
    );
  }

  console.log(' Vendor Orders Data:', data);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.orders.map((order: any) => {
          const customer = `${order.user?.firstName ?? ''} ${order.user?.lastName ?? ''}`;

          const items =
            order.items?.map(
              (item: {
                product?: { productName?: string; image: string };
                quantity: number;
                totalPrice: number;
                variant: { variantName: string; attributes: string };
                addons: { name: string; price: number }[];
              }) => ({
                name: item.product?.productName ?? 'Unknown Product',
                quantity: item.quantity,
                variant: item.variant && {
                  variantName: item.variant.variantName,
                },
                attributes:
                  item.variant &&
                  item.variant.attributes &&
                  item.variant.attributes,
                addons: item.addons ?? [],

                totalPrice: item?.totalPrice ?? 0,
                image: item.product?.image ?? '',
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
              profilePicture={order.user?.profilePicture ?? ''}
              customer={customer}
              email={order.user?.email ?? 'N/A'}
              phoneNumber={order.user?.phoneNumber}
              items={items}
              subtotal={order.vendorSummary?.subtotal ?? 0}
            />
          );
        })}
      </div>


        {data?.totalPages > 1 && (
          <PaginationControls
            currentPage={page}
            totalPages={data?.totalPages ?? 0}
            isLoading={isFetching}
          />
        )}
    </>
  );
}
