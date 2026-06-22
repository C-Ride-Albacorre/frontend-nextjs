'use server';

import { LocationSchema, LocationState } from './schema';
import { saveAddressService } from './service';

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

  try {
    const result = await saveAddressService(data);

    console.log(' [saveLocationAction] result:', result);

    if (!result?.success) {
      return {
        status: 'error',
        message: result?.message || 'Failed to save location.',
      };
    }

    return {
      status: 'success',
      message: result?.message || 'Location saved successfully.',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to save location.',
    };
  }
}
