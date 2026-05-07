import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchStores } from './service';

export function useStoresQuery(params: {
  id?: string;
  latitude?: string;
  longitude?: string;
  page?: string;
  limit?: string;
  search?: string;
  radiusKm?: string;
  subcategoryId?: string;
}) {
  return useQuery({
    queryKey: ['stores', params],
    queryFn: () => fetchStores(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}
