'use client';

import ErrorState from '@/components/layout/error-state';
import { useVendorOrders } from '../fetch';
import { Package, Loader, LoaderCircle } from 'lucide-react';
import EmptyState from '@/components/layout/empty-state';
import OrderCard from './order-card';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import Toolbar from '@/components/layout/tool-bar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { label: 'All', value: '' },

  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'Accepted', value: 'ORDER_ACCEPTED' },
  { label: 'Declined', value: 'ORDER_DECLINED' },
  { label: 'Assigned', value: 'ORDER_ASSIGNED' },

  { label: 'Picked Up', value: 'PICKED_UP' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Delivered', value: 'DELIVERED' },
];

export default function OrderList({
  page,
  limit,
  status,
  initialData,
}: {
  page: number;
  limit: number;
  status: string;
  initialData: {
    orders: any[];
    total: number;
    totalPages: number;
  };
}) {
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [now, setNow] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState<string>(status);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { data, error, isFetching } = useVendorOrders(
    page,
    limit,
    statusFilter ?? '',
    initialData,
  );

  useEffect(() => {
    if (!isFetching && data) {
      setLastUpdateTime(new Date());
    }
  }, [isFetching, data]);

  const formatTime = () => {
    const diffInSeconds = Math.floor(
      (now.getTime() - lastUpdateTime.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} secs ago`;
    } else if (diffInSeconds < 3600) {
      const mins = Math.floor(diffInSeconds / 60);
      return `${mins} ${mins === 1 ? 'min' : 'mins'} ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    const params = new URLSearchParams();
    params.set('page', '1'); // Reset to page 1 when filtering
    params.set('limit', limit.toString());
    if (value) params.set('status', value);
    router.replace(`?${params.toString()}`);
  };

  if (error) {
    return (
      <>
        <Toolbar
          title={
            statusFilter === ''
              ? 'All Orders'
              : `${CATEGORIES.find((cat) => cat.value === statusFilter)?.label ?? statusFilter} Orders`
          }
          updatedAt={
            isFetching ? (
              <LoaderCircle className="animate-spin text-primary" size={12} />
            ) : (
              `${formatTime()}`
            )
          }
          filterOptions={CATEGORIES}
          filter={statusFilter}
          onFilterChange={handleStatusChange}
        />
        <ErrorState
          icon={<Package size={48} className="text-orange-500" />}
          title="Something went wrong"
          message={(error as Error).message}
        />
      </>
    );
  }

  console.log(' Vendor Orders Data:', data);

  return (
    <>
      <Toolbar
        title={
          statusFilter === ''
            ? 'All Orders'
            : `${CATEGORIES.find((cat) => cat.value === statusFilter)?.label ?? statusFilter} Orders`
        }
        updatedAt={isFetching ? 'Updating...' : `Updated ${formatTime()}`}
        filterOptions={CATEGORIES}
        filter={statusFilter}
        onFilterChange={handleStatusChange}
      />

      {!data?.orders.length ? (
        <EmptyState
          icon={<Package size={48} className="text-neutral-400" />}
          title="No Orders Available"
          message="There are currently no incoming orders."
        />
      ) : (
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
      )}
    </>
  );
}
