'use server';

import { revalidatePath } from 'next/cache';
import { LocationSchema, LocationState } from './schema';
import { fetchSavedAddressesService, saveAddressService } from './service';

export async function saveLocationAction(
  _state: LocationState,
  formData: FormData,
): Promise<LocationState> {
  const rawData = {
    label: formData.get('locationName'),
    address: formData.get('streetAddress'),
    postalCode: formData.get('postalCode') || undefined,
    city: formData.get('city') || undefined,
    state: formData.get('state') || undefined,
    country: formData.get('country') || undefined,
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
    isDefault: formData.get('isDefault') === 'true',
  };

  const validated = LocationSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  // ✅ Ensure at least coordinates exist
  if (!data.latitude || !data.longitude) {
    return {
      status: 'error',
      message: 'Location coordinates are required.',
    };
  }

  try {
    const result = await saveAddressService(data);

    if (!result?.data?.success) {
      return {
        status: 'error',
        message: result?.data?.message || 'Failed to save location.',
      };
    }

  

    return {
      status: 'success',
      message: result?.data?.message || 'Location saved successfully.',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to save location.',
    };
  }
}

export async function fetchSavedAddressesAction() {
  const result = await fetchSavedAddressesService();

  return result.data;
}
