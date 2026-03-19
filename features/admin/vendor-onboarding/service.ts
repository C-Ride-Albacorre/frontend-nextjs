// features/admin/vendor-onboarding/service.ts
import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';
import { ApproveVendorPayload } from './types';

export async function getVendorsService(
  page = 1,
  limit = 10,
  status?: string,
  search?: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(status && { status }),
    ...(search && { search }),
  });

  const res = await authFetch(`${BASE_URL}/admin/vendors?${params}`, {
    method: 'GET',
  });

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch vendors',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function getVendorByIdService(vendorId: string) {
  const res = await authFetch(`${BASE_URL}/admin/vendors/${vendorId}`, {
    method: 'GET',
  });

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch vendor details',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function approveVendorService(
  vendorId: string,
  payload: ApproveVendorPayload,
) {
  const res = await authFetch(`${BASE_URL}/admin/vendors/${vendorId}/approve`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to update vendor status',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}