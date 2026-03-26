'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchCategoriesAction,
  fetchCategoryDetailsAction,
  fetchSubcategoriesAction,
} from './action';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategoriesAction,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
}


export function useSubcategories(categoryId: string) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => fetchSubcategoriesAction(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
}
