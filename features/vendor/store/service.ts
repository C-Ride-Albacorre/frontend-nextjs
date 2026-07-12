'use server';

import { BASE_URL } from '@/config/api';
import { GetStoreApiResponse, StoreResponse } from './types';
import { authRequest } from '@/libs/api/auth-request';

export async function getStoreService() {
  return await authRequest<GetStoreApiResponse>(`${BASE_URL}/vendor/stores`, {
    method: 'GET',
    nextTags: ['vendor-store'],
  });
}

export async function createStoreService(
  formData: FormData,
): Promise<StoreResponse> {
  return await authRequest<StoreResponse>(`${BASE_URL}/vendor/stores`, {
    method: 'POST',
    body: formData,
    nextTags: ['create-store'],
  });
}

export async function updateStoreService(storeId: string, formData: FormData) {
  return await authRequest<StoreResponse>(
    `${BASE_URL}/vendor/stores/${storeId}`,
    {
      method: 'PUT',
      body: formData,
      nextTags: [`update-store-${storeId}`],
    },

    
  );

  
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
  return await authRequest<StoreResponse>(
    `${BASE_URL}/vendor/stores/${storeId}/operating-hours`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operatingHours),
      nextTags: [`update-operating-hours-${storeId}`],
    },
  );
}

export async function deleteStoreService(storeIds: string[]): Promise<void> {
  return await authRequest<void>(`${BASE_URL}/vendor/stores/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ storeIds }),
    nextTags: ['delete-store'],
  });
}
