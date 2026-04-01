import { useQuery } from '@tanstack/react-query';
import { getSubcategoriesAction } from './action';

export function useSubcategories() {
  return useQuery({
    queryKey: ['subCategoriesTypes'],
    queryFn: getSubcategoriesAction,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
}
