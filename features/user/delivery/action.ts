'use server';

import {
  fetchCategoriesService,
  fetchCategoryStoresService,
  fetchSubcategoriesService,
} from './service';

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

  console.log('Category Details:', result?.data);

  return result?.data ?? [];
}

export async function fetchSubcategoriesAction(categoryId: string) {
  const result = await fetchSubcategoriesService(categoryId);


  console.log('id', categoryId);
  return result?.data;
}
