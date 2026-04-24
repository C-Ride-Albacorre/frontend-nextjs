import { BASE_URL } from '@/config/api';
import { authFetch } from '../libs/auth-fetch';
import { ApiError } from '../libs/api-error';

export interface NearbyStoreParams {
  lat?: number;
  lng?: number;
  radiusKm?: number;
  search?: string;
}

export default async function getNearByStores(params?: NearbyStoreParams) {
  const query = new URLSearchParams();

  if (params?.lat !== undefined) query.set('lat', String(params.lat));
  if (params?.lng !== undefined) query.set('lng', String(params.lng));
  if (params?.radiusKm !== undefined)
    query.set('radiusKm', String(params.radiusKm));
  if (params?.search) query.set('search', params.search);

  const url = `${BASE_URL}/customer/stores/nearby${query.toString() ? `?${query.toString()}` : ''}`;

  const res = await authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch stores',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
