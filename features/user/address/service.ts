import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { LocationData } from './schema';
import { authRequest } from '@/libs/api/auth-request';
import { getErrorMessage } from '@/libs/api/get-error-message';
import { revalidateTag } from 'next/cache';

type SaveAddressResponse = {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    success: boolean;
    message: string;
    location: {
      id: string;
      userId: string;
      address: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      latitude: number;
      longitude: number;
      isDefault: boolean;
      label: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export interface AddressItem {
  id: string;
  userId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  label: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: AddressItem[];
}

export async function saveAddressService(data: LocationData) {
  console.log(' [saveAddressService] data:', data);

  console.log(
    '[saveAddressService] payload json:',
    JSON.stringify(data, null, 2),
  );

  const body = JSON.stringify(data);

  console.log('[saveAddressService] body:', body);

  try {
    const response = await authRequest<SaveAddressResponse>(
      `${BASE_URL}/customer/location`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    console.log(' [saveAddressService] response:', response);

    revalidateTag('fetchSavedAddresses' , 'default');

    return {
      success: true,
      message: response.data.message || 'Location saved successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function fetchSavedAddressesService() {
  return authRequest<Address>(`${BASE_URL}/customer/locations`, {
    nextTags: ['fetchSavedAddresses'],
  });
}
