'use server';

import { LocationSchema, LocationState } from './schema';
import { fetchSavedAddressesService, saveAddressService } from './service';

export async function saveLocationAction(
  _state: LocationState,
  formData: FormData,
): Promise<LocationState> {
  const rawData = {
    label: formData.get('locationName'),
    address: formData.get('streetAddress'),
    postalCode: formData.get('postalCode'),
    city: formData.get('city'),
    state: formData.get('state'),
    country: formData.get('country'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
    isDefault: formData.get('isDefault') === 'true',
  };

  console.log('Raw form data:', rawData);

  const validated = LocationSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  console.log('Saving location with data:', validated.data);

  try {
    const result = await saveAddressService(validated.data);

    if (!result?.data?.success) {
      return {
        status: 'error',
        message: result?.data?.message || 'Failed to save location.',
      };
    }

    console.log('Location saved successfully:', result);

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
  try {
    const result = await fetchSavedAddressesService();
    return {
      status: 'success',
      data: result.data,
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch saved addresses.',
    };
  }
}
