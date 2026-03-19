
import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';
import { ApproveStorePayload } from './types';

export async function getStoresService(
  page = 1,
  limit = 10,
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

  const res = await authFetch(`${BASE_URL}/admin/stores?${params}`, {
    method: 'GET',
  });

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch stores',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function getStoreByIdService(storeId: string) {
  const res = await authFetch(`${BASE_URL}/admin/stores/${storeId}`, {
    method: 'GET',
  });

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch store details',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function approveStoreService(
  storeId: string,
  payload: ApproveStorePayload,
) {
  const res = await authFetch(`${BASE_URL}/admin/stores/${storeId}/approve`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to update store status',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
