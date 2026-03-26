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

export function useCategoryStores(
  categoryId: string,
  latitude?: number,
  longitude?: number,
) {

  
  return useQuery({
    queryKey: ['category-stores', categoryId, latitude, longitude],
    queryFn: () => fetchCategoryDetailsAction(categoryId, latitude, longitude),
    enabled: !!categoryId && latitude !== undefined && longitude !== undefined,

    staleTime: 1000 * 60 * 5,

    
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
