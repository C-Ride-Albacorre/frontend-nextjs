import OrderCard from './order-card';
import { getVendorOrderAction } from '../action';
import { Package } from 'lucide-react';

import EmptyState from '@/components/layout/empty-state';
import ErrorState from '@/components/layout/error-state';
import OrderList from './order-list';

export default async function OrdersWrapper({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    status?: string;
  };
}) {
  const { page, limit } = searchParams;

  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : 10;
  const status = searchParams?.status || '';

  try {
    const response = await getVendorOrderAction({
      page: pageNum,
      limit: limitNum,
      status,
    });

    const orders = response.orders || [];

    const totalPages = response.totalPages;

    // if (orders.length === 0) {
    //   return (
    //     <EmptyState
    //       icon={<Package size={48} className="text-neutral-400" />}
    //       title="No Orders Available"
    //       message="There are currently no incoming orders. Once customers place orders, they will appear here for you to manage and fulfill."
    //     />
    //   );
    // }

    return (
      <>
        <OrderList
          page={pageNum}
          limit={limitNum}
          status={status}
          initialData={{
            orders,
            total: response.total,
            totalPages,
          }}
        />
      </>
    );
  } catch (error) {
    console.error('Error fetching orders:', error);

    return (
      <ErrorState
        icon={<Package size={48} className="text-orange-400" />}
        title="Something went wrong"
        message={
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while fetching orders.'
        }
      />
    );
  }
}
