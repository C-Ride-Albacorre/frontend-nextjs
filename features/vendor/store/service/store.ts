'use server';

import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { getCookie } from '@/utils/cookies';
import { StoreApiResponse, StoreResponse } from '../types';

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

export async function getStoreService(): Promise<StoreApiResponse | null> {
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
  const accessToken = await getCookie('accessToken');

  const res = await fetch(`${BASE_URL}/vendor/stores/${storeId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
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
  const accessToken = await getCookie('accessToken');

  const res = await fetch(
    `${BASE_URL}/vendor/stores/${storeId}/operating-hours`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
  const accessToken = await getCookie('accessToken');

  const res = await fetch(`${BASE_URL}/vendor/stores/${storeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const result = await res.json().catch(() => null);
    throw new ApiError(
      result?.message || 'Failed to delete store',
      result?.statusCode ?? res.status,
    );
  }
}
