'use client';

import { useQuery } from '@tanstack/react-query';
import { getVendorOrderAction } from './action';
import { VendorOrderApiResponse } from './types';

export function useVendorOrders(
  page: number,
  limit: number,
  initialData?: {
    orders: VendorOrderApiResponse['data']['data'][];
    total: number;
    totalPages: number;
  },
) {
  const queryOptions = {
    queryKey: ['vendor-orders', page, limit],
    queryFn: async () => {
      const response = await getVendorOrderAction({ page, limit });
      return {
        orders: response.orders,
        total: response.total,
        totalPages: response.totalPages,
      };
    },
    refetchInterval: 30000, // 10 seconds
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 60000, // 60 seconds
  } as const;

  const query = initialData
    ? useQuery({
        ...queryOptions,
        initialData,
      })
    : useQuery(queryOptions);

  return {
    ...query,
    isLoading: query.isPending && !initialData,
    isFetching: query.isFetching,
  };
}
