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
