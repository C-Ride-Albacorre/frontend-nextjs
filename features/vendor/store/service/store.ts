'use server';

import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { getCookie } from '@/utils/cookies';
import { StoreResponse } from '../types';

export async function createStoreService(
  formData: FormData,
): Promise<StoreResponse> {
  const accessToken = await getCookie('accessToken');

  const res = await fetch(`${BASE_URL}/vendor/stores`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to create store',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}

export async function getStoreService(): Promise<StoreResponse> {
  const accessToken = await getCookie('accessToken');

  const res = await fetch(`${BASE_URL}/vendor/stores`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to fetch store',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}
