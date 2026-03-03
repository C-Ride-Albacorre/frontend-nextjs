'use server';

import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { StoreApiResponse, StoreResponse } from '../types';

export async function createStoreService(
  formData: FormData,
): Promise<StoreResponse> {
  const res = await authFetch(`${BASE_URL}/vendor/stores`, {
    method: 'POST',
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

export async function getStoreService(): Promise<StoreApiResponse | null> {
  const res = await authFetch(`${BASE_URL}/vendor/stores`, {
    method: 'GET',
    cache: 'no-store',
  });

  const result = await res.json();

  if (res.status === 404 || result?.statusCode === 404) {
    return null;
  }

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to fetch store',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}

export async function updateStoreService(
  storeId: string,
  formData: FormData,
): Promise<StoreResponse> {
  const res = await authFetch(`${BASE_URL}/vendor/stores/${storeId}`, {
    method: 'PUT',
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to update store',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}

export async function updateOperatingHoursService(
  storeId: string,
  operatingHours: Array<{
    dayOfWeek: string;
    isOpen: boolean;
    openingTime: string | null;
    closingTime: string | null;
  }>,
): Promise<StoreResponse> {
  const res = await authFetch(
    `${BASE_URL}/vendor/stores/${storeId}/operating-hours`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operatingHours),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to update operating hours',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}

export async function deleteStoreService(storeId: string): Promise<void> {
  const res = await authFetch(`${BASE_URL}/vendor/stores/${storeId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const result = await res.json().catch(() => null);
    throw new ApiError(
      result?.message || 'Failed to delete store',
      result?.statusCode ?? res.status,
    );
  }
}
