import { useQuery } from '@tanstack/react-query';
import { getStoreAction } from './action';
import { StoreData } from './types';

export function useStores() {
  return useQuery<StoreData | null>({
    queryKey: ['store'],
    queryFn: getStoreAction,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
}
