// features/admin/vendor-onboarding/service.ts
import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';
import {
  ApproveVendorPayload,
  GetVendorByIdApiResponse,
  GetVendorsApiResponse,
  VendorDetail,
} from './types';
import { authRequest } from '@/libs/api/auth-request';

export async function getVendorsService(
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

  return await authRequest<GetVendorsApiResponse>(
    `${BASE_URL}/admin/vendors?${params}`,
    {
      nextTags: ['get-vendors'],
    },
  );
}

export async function getVendorByIdService(vendorId: string) {
  return await authRequest<GetVendorByIdApiResponse>(
    `${BASE_URL}/admin/vendors/${vendorId}`,
    {
      nextTags: [`get-vendor-by-${vendorId}`],
    },
  );
}

export async function approveVendorService(
  vendorId: string,
  payload: ApproveVendorPayload,
) {
  return await authRequest(`${BASE_URL}/admin/vendors/${vendorId}/approve`, {
    method: 'PATCH',

    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    nextTags: [`approve-vendor-${vendorId}`],
  });
}
