import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import {
  GetVendorOrderIdServiceResponse,
  VendorOrderActionPayload,
  VendorOrderActionServiceResponse,
  VendorOrderApiResponse,
} from './types';
import { authRequest } from '@/libs/api/auth-request';

export async function getVendorOrdersService({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return await authRequest<VendorOrderApiResponse>(
    `${BASE_URL}/vendor/orders?page=${page}&limit=${limit}`,
    {
      nextTags: ['vendor-orders'],
    },
  );
}

export async function getVendorOrderIdService({
  orderId,
}: {
  orderId: string;
}) {
  return await authRequest<GetVendorOrderIdServiceResponse>(
    `${BASE_URL}/vendor/orders/${orderId}`,
    {
      nextTags: [`vendor-orders-${orderId}`],
    },
  );
}

export async function vendorOrderActionService({
  orderId,
  payload,
}: VendorOrderActionPayload) {
  console.log(' Performing vendor order action service with payload:', {
    orderId,
    payload,
  });

  return await authRequest<VendorOrderActionServiceResponse>(`${BASE_URL}/vendor/orders/${orderId}/action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
