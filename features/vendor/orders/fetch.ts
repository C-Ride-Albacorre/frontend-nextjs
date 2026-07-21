'use client';

import { useQuery } from '@tanstack/react-query';
import { getVendorOrderAction } from './action';
import { VendorOrderApiResponse } from './types';

export function useVendorOrders(
  page: number,
  limit: number,
  statusFilter: string,
  initialData?: {
    orders: VendorOrderApiResponse['data']['data'][];
    total: number;
    totalPages: number;
  },
) {
  const queryOptions = {
    queryKey: ['vendor-orders', page, limit, statusFilter],
    queryFn: async () => {
      const response = await getVendorOrderAction({
        page,
        limit,
        status: statusFilter,
      });
      return {
        orders: response.orders,
        total: response.total,
        totalPages: response.totalPages,
      };
    },
    refetchInterval: 300000, 
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 60000,
  } as const;

  // Only use initialData if statusFilter is empty (initial load with 'All' filter)
  const shouldUseInitialData = initialData && statusFilter === '';

  const query = shouldUseInitialData
    ? useQuery({
        ...queryOptions,
        initialData,
      })
    : useQuery(queryOptions);

  return {
    ...query,
    isLoading: query.isPending && !shouldUseInitialData,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
