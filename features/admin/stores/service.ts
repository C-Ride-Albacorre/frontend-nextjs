import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';
import {
  ApproveStorePayload,
  GetStoreByIdApiResponse,
  GetStoresApiResponse,
} from './types';
import { authRequest } from '@/libs/api/auth-request';

export async function getStoresService(
  page: number,
  limit: number,
  status?: string,
  search?: string,
  vendorId?: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(status && { status }),
    ...(search && { search }),
    ...(vendorId && { vendorId }),
  });

  return await authRequest<GetStoresApiResponse>(
    `${BASE_URL}/admin/stores?${params}`,
    {
      nextTags: ['get-stores'],
    },
  );
}

export async function getStoreByIdService(storeId: string) {
  return await authRequest<GetStoreByIdApiResponse>(
    `${BASE_URL}/admin/stores/${storeId}`,
    {
      nextTags: [`get-store-${storeId}`],
    },
  );
}

export async function approveStoreService(
  storeId: string,
  payload: ApproveStorePayload,
) {
  return await authRequest(`${BASE_URL}/admin/stores/${storeId}/approve`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    nextTags: [`approve-store-${storeId}`],
  });
}
