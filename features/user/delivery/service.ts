import { BASE_URL } from '@/config/api';
import {
  CategoriesApiResponse,
  CategoryStoresApiResponse,
  StoreDetailsResponse,
  SubCategoriesResponse,
  VendorAddressDetailsApiResponse,
} from './types';
import { request } from '@/libs/api/request';
import { authRequest } from '@/libs/api/auth-request';

// ═══════════════════════════════════════
// CATEGORIES & STORES
// ═══════════════════════════════════════

export async function fetchCategoriesService() {
  return request<CategoriesApiResponse>(`${BASE_URL}/customer/categories`, {
    cacheStrategy: { revalidate: 3600 },
    nextTags: ['categories'],
  });
}

export async function fetchCategoryStoresService({
  categoryId,
  lat,
  lng,
  subcategoryId,
  page,
  limit,
  search,
  radiusKm,
}: {
  categoryId?: string;
  lat?: string;
  lng?: string;
  subcategoryId?: string;
  page?: string;
  limit?: string;
  search?: string;
  radiusKm?: string;
}) {
  const params = new URLSearchParams();
  if (categoryId) params.set('categoryId', categoryId);
  if (lat !== undefined) params.set('lat', String(lat));
  if (lng !== undefined) params.set('lng', String(lng));
  if (subcategoryId) params.set('subcategoryId', subcategoryId);
  if (page) params.set('page', String(page));
  if (limit) params.set('limit', String(limit));
  if (search) params.set('search', search);
  if (radiusKm) params.set('radiusKm', String(radiusKm));

  const cacheTag = categoryId ? `stores-category-${categoryId}` : 'stores-all';
  const subcatTag = subcategoryId ? `-subcat-${subcategoryId}` : '';

  return request<CategoryStoresApiResponse>(
    `${BASE_URL}/customer/stores?${params.toString()}`,
    {
      cacheStrategy: { revalidate: 3600 },
      nextTags: [`${cacheTag}${subcatTag}`],
    },
  );
}

export async function fetchSubcategoriesService(categoryId: string) {
  return request<SubCategoriesResponse>(
    `${BASE_URL}/customer/subcategories/category/${categoryId}`,
    {
      cacheStrategy: { revalidate: 3600 },
      nextTags: [`subcategories-category-${categoryId}`],
    },
  );
}

export async function fetchStoreDetailsService(storeId: string) {
  return authRequest<StoreDetailsResponse>(
    `${BASE_URL}/customer/stores/${storeId}`,
    {
      cacheStrategy: { revalidate: 3600 },
      nextTags: [`store-details-${storeId}`],
    },
  );
}

export async function fetchVendorAddressService(storeId: string) {
  return authRequest<VendorAddressDetailsApiResponse>(
    `${BASE_URL}/customer/vendor-address/${storeId}`,
    {
      cacheStrategy: { revalidate: 3600 },
      nextTags: [`vendor-address-${storeId}`],
    },
  );
}
