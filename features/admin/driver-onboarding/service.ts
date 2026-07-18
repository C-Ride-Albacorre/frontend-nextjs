// features/admin/driver-onboarding/service.ts
import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import {
  ApproveDriverPayload,
  GetDriverByIdResponse,
  GetDriversResponse,
} from './types';
import { authRequest } from '@/libs/api/auth-request';

export async function getDriversService(
  page: number,
  limit: number,
  status?: string,
  search?: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(status && { status }),
    ...(search && { search }),
  });

  return await authRequest<GetDriversResponse>(
    `${BASE_URL}/admin/dispatchers?${params}`,
    {
      nextTags: ['get-drivers'],
    },
  );
}

export async function getDriverByIdService(driverId: string) {
  return await authRequest<GetDriverByIdResponse>(
    `${BASE_URL}/admin/dispatchers/${driverId}`,
    {
      nextTags: [`get-driver-by-${driverId}`],
    },
  );
}

export async function approveDriverService(
  driverId: string,
  payload: ApproveDriverPayload,
) {
  return await authRequest(
    `${BASE_URL}/admin/dispatchers/${driverId}/approve`,
    {
      method: 'PATCH',
      
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      nextTags: [`approve-driver-${driverId}`],
    },
  );
}
