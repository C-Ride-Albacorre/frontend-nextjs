import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';
import { ApproveStorePayload } from './types';

export async function getStoresService(page = 1, limit = 10) {
  const res = await authFetch(
    `${BASE_URL}/admin/stores?page=${page}&limit=${limit}`,
    { method: 'GET' },
  );

  if (res.status === 401) {
    redirect('/admin/login');
  }

  const data = await res.json();
  console.log('getStoresService response:', data);

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

  if (res.status === 401) {
    redirect('/admin/login');
  }

  const data = await res.json();
  console.log('getStoreByIdService response:', data);

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

  if (res.status === 401) {
    redirect('/admin/login');
  }

  const data = await res.json();
  console.log('approveStoreService response:', data);

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to update store status',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
