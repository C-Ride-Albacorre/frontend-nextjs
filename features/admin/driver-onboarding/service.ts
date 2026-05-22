// features/admin/driver-onboarding/service.ts
import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';
import { ApproveDriverPayload } from './types';

export async function getDriversService(
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

  const res = await authFetch(`${BASE_URL}/admin/dispatchers?${params}`, {
    method: 'GET',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch drivers',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function getDriverByIdService(driverId: string) {
  const res = await authFetch(
    `${BASE_URL}/admin/dispatchers/${driverId}`,
    {
      method: 'GET',
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch driver details',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function approveDriverService(
  driverId: string,
  payload: ApproveDriverPayload,
) {
  const res = await authFetch(
    `${BASE_URL}/admin/dispatchers/${driverId}/approve`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to update driver status',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
