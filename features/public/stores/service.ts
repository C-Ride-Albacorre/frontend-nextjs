import { SubcategoriesResponse } from "../type";



export async function fetchSubcategories(
  categoryId: string,
): Promise<SubcategoriesResponse> {
  const res = await fetch(`/api/category-stores/${categoryId}/subcategories`);
  if (!res.ok) throw new Error('Failed to fetch subcategories');
  return res.json();
}
export interface StoresResponse {
  stores: any[];
  total: number;
}

export async function fetchStores({
  id,
  latitude,
  longitude,
  page,
  limit,
  search,
  radiusKm,
  subcategoryId,
}: {
  id?: string;
  latitude?: string;
  longitude?: string;
  page?: string;
  limit?: string;
  search?: string;
  radiusKm?: string;
  subcategoryId?: string;
}): Promise<StoresResponse> {
  const params = new URLSearchParams();
  if (latitude) params.set('lat', latitude);
  if (longitude) params.set('lng', longitude);
  if (page) params.set('page', page);
  if (limit) params.set('limit', limit);
  if (search) params.set('search', search);
  if (radiusKm) params.set('radiusKm', radiusKm);
  if (subcategoryId) params.set('subcategoryId', subcategoryId);

  const url = `/api/category-stores?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch stores');
  return res.json();
}
