'use server';

import { fetchCategoriesService } from './service';

export async function fetchCategoriesAction() {
  const result = await fetchCategoriesService();
  return result.data;
}
