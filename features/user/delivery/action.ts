'use server';

import { fetchCategoriesService, fetchCategoryStoresService } from './service';

export async function fetchCategoriesAction() {
  const result = await fetchCategoriesService();
  return result.data;
}

export async function fetchCategoryDetailsAction(
  categoryId: string,
  latitude?: number,
  longitude?: number,
) {
  const result = await fetchCategoryStoresService(
    categoryId,
    latitude,
    longitude,
  );

  return result.data;
}
