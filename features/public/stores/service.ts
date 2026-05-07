// import { BASE_URL } from '@/config/api';
// import { authFetch } from '../libs/auth-fetch';
// import { ApiError } from '../libs/api-error';

// export interface NearbyStoreParams {
//   lat?: number;
//   lng?: number;
//   radiusKm?: number;
//   search?: string;
// }

// export default async function getNearByStores(params?: NearbyStoreParams) {
//   const query = new URLSearchParams();

//   if (params?.lat !== undefined) query.set('lat', String(params.lat));
//   if (params?.lng !== undefined) query.set('lng', String(params.lng));
//   if (params?.radiusKm !== undefined)
//     query.set('radiusKm', String(params.radiusKm));
//   if (params?.search) query.set('search', params.search);

//   const url = `${BASE_URL}/customer/stores/nearby${query.toString() ? `?${query.toString()}` : ''}`;

//   const res = await authFetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new ApiError(
//       data?.message || 'Failed to fetch stores',
//       data?.statusCode ?? res.status,
//     );
//   }

//   return data;
// }

// export async function fetchNearbyStoresService(
//   lat?: number,
//   lng?: number,
//   search?: string,
//   radiusKm?: number,
//   page?: number,
//   limit?: number,
// ) {
//   const params = new URLSearchParams();
//   if (lat !== undefined) params.set('lat', String(lat));
//   if (lng !== undefined) params.set('lng', String(lng));
//   if (search) params.set('search', search);
//   if (radiusKm !== undefined) params.set('radiusKm', String(radiusKm));
//   if (page !== undefined) params.set('page', String(page));
//   if (limit !== undefined) params.set('limit', String(limit));

//   const res = await fetch(
//     `${BASE_URL}/customer/stores/nearby?${params.toString()}`,
//     { method: 'GET', headers: { 'Content-Type': 'application/json' } },
//   );

//   const data = await res.json();
//   if (!res.ok)
//     throw new ApiError(
//       data?.message || 'Failed to fetch stores',
//       data?.statusCode ?? res.status,
//     );
//   return data;
// }

export interface StoresResponse {
  stores: any[];
  total: number;
}

export async function fetchStores({
  id,
  latitude,
  longitude,
  page,
  limit,
  search,
  radiusKm,
  subcategoryId,
}: {
  id?: string;
  latitude?: string;
  longitude?: string;
  page?: string;
  limit?: string;
  search?: string;
  radiusKm?: string;
  subcategoryId?: string;
}): Promise<StoresResponse> {
  const params = new URLSearchParams();
  if (latitude) params.set('lat', latitude);
  if (longitude) params.set('lng', longitude);
  if (page) params.set('page', page);
  if (limit) params.set('limit', limit);
  if (search) params.set('search', search);
  if (radiusKm) params.set('radiusKm', radiusKm);
  if (subcategoryId) params.set('subcategoryId', subcategoryId);

  const url = `/api/category-stores/${id ?? ''}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch stores');
  return res.json();
}
