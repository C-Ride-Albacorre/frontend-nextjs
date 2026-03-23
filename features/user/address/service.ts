import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { LocationData } from './schema';


 type SaveAddressResponse = {
  status: string,
  statusCode: number,
  timestamp: string,
  path: string,
  data: {
    success: boolean,
    message: string,
    location: {
      id: string,
      userId: string,
      address: string,
      city: string,
      state: string,
      country: string,
      postalCode: string,
      latitude: number,
      longitude: number,
      isDefault: boolean,
      label: string,
      createdAt: string,
      updatedAt: string
    }
  }
}



export async function saveAddressService(payload: LocationData): Promise<SaveAddressResponse> {
  const res = await authFetch(`${BASE_URL}/customer/location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to save address',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}



export async function fetchSavedAddressesService() {

    const res = await authFetch(`${BASE_URL}/customer/locations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new ApiError(
            data?.message || 'Failed to fetch saved addresses',
            data?.statusCode ?? res.status,
        );
    }

    return data;
}
