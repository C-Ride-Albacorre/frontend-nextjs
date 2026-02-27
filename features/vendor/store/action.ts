'use server';

import { createStoreService } from './service/store';
import { StoreFormState } from './types';
import { StoreSchema } from './schema';

const DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

export async function createStoreAction(
  _prevState: StoreFormState,
  formData: FormData,
): Promise<StoreFormState> {
  // Extract fields from FormData
  const rawData = {
    storeName: formData.get('storeName') as string,
    storeCategory: formData.get('storeCategory') as string,
    storeAddress: formData.get('storeAddress') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    email: formData.get('email') as string,
    storeDescription: formData.get('storeDescription') as string,
    minimumOrder: formData.get('minimumOrder') as string,
    deliveryFee: formData.get('deliveryFee') as string,
    preparationTime: formData.get('preparationTime') as string,
  };

  // Validate with Zod
  const result = StoreSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      if (!errors[key]) {
        errors[key] = [];
      }
      errors[key].push(issue.message);
    }
    return {
      status: 'error',
      message: 'Please fix the validation errors',
      errors,
    };
  }

  // Build operating hours array in backend format
  const operatingHours = DAYS.map((dayOfWeek) => {
    const dayKey = dayOfWeek.toLowerCase();
    const openTime = (formData.get(`${dayKey}Open`) as string) || '';
    const closeTime = (formData.get(`${dayKey}Close`) as string) || '';
    const isOpen = Boolean(openTime && closeTime);

    return {
      dayOfWeek,
      isOpen,
      openingTime: openTime || null,
      closingTime: closeTime || null,
    };
  });

  // Check if at least one day is open
  const hasOpenDay = operatingHours.some((h) => h.isOpen);
  if (!hasOpenDay) {
    return {
      status: 'error',
      message: 'Please set operating hours for at least one day',
      errors: { operatingHours: ['Operating hours required for at least one day'] },
    };
  }

  // Build FormData for API
  const apiFormData = new FormData();
  apiFormData.append('storeName', result.data.storeName);
  apiFormData.append('storeCategory', result.data.storeCategory);
  apiFormData.append('storeAddress', result.data.storeAddress);
  apiFormData.append('phoneNumber', result.data.phoneNumber);
  apiFormData.append('email', result.data.email);

  // Optional fields
  if (result.data.storeDescription) {
    apiFormData.append('storeDescription', result.data.storeDescription);
  }

  if (result.data.minimumOrder && typeof result.data.minimumOrder === 'number') {
    apiFormData.append('minimumOrder', String(result.data.minimumOrder));
  }

  if (result.data.deliveryFee && typeof result.data.deliveryFee === 'number') {
    apiFormData.append('deliveryFee', String(result.data.deliveryFee));
  }

  if (result.data.preparationTime && typeof result.data.preparationTime === 'number') {
    apiFormData.append('preparationTime', String(result.data.preparationTime));
  }

  // Append operating hours as JSON array
  apiFormData.append('operatingHours', JSON.stringify(operatingHours));

  // Handle logo file
  const logo = formData.get('logo') as File;
  if (logo && logo.size > 0) {
    apiFormData.append('logo', logo);
  }

  try {
    await createStoreService(apiFormData);
    return {
      status: 'success',
      message: 'Store created successfully',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to create store',
    };
  }
}
