import OrderCard from './order-card';
import { getVendorOrderAction } from '../action';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import Card from '@/components/layout/card';
import { Package } from 'lucide-react';

import RetryButton from '@/components/ui/buttons/retry-button';
import EmptyState from '@/components/layout/empty-state';
import ErrorState from '@/components/layout/error-state';
import OrderList from './order-list';

const CATEGORIES = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Declined', value: 'DECLINED' },
];

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

  try {
    const response = await getVendorOrderAction({
      page: pageNum,
      limit: limitNum,
    });

    const orders = response.orders || [];

    const totalPages = response.totalPages;

    if (orders.length === 0) {
      return (
        <EmptyState
          icon={<Package size={48} className="text-neutral-400" />}
          title="No Orders Available"
          message="There are currently no incoming orders. Once customers place orders, they will appear here for you to manage and fulfill."
        />
      );
    }

    return <OrderList
      page={pageNum}
      limit={limitNum}
      initialData={{
        orders,
        total: response.total,
        totalPages,
      }}
    />;
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
