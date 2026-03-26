import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';

export async function fetchCategoriesService() {
  const res = await authFetch(`${BASE_URL}/customer/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch categories',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function fetchCategoryStoresService(
  categoryId: string,
  latitude?: number,
  longitude?: number,
) {
  const params = new URLSearchParams();

  if (latitude !== undefined) {
    params.set('latitude', String(latitude));
  }

  if (longitude !== undefined) {
    params.set('longitude', String(longitude));
  }

  const queryString = params.toString();
  const url = `${BASE_URL}/customer/stores/category/${categoryId}${
    queryString ? `?${queryString}` : ''
  }`;

  const res = await authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch stores for category',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}


export async function fetchSubcategoriesService(categoryId: string) {

  const res = await authFetch(`${BASE_URL}/customer/subcategories/category/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch subcategories',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
