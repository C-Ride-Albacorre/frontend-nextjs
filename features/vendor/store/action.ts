'use server';

import { revalidatePath } from 'next/cache';
import {
  createStoreService,
  deleteStoreService,
  getStoreService,
  getStoreByIdService,
  updateStoreService,
  updateOperatingHoursService,
} from './service';
import { StoreFormState, StoreData } from './types';
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

export async function getStoreAction(): Promise<StoreData | null> {
  try {
    const response = await getStoreService();

    const stores = response?.data;
    if (Array.isArray(stores) && stores.length > 0) {
      return stores[0];
    }
    return null;
  } catch {
    return null;
  }
}

export async function getStoresAction(): Promise<StoreData[]> {
  try {
    const response = await getStoreService();
    const stores = response?.data;
    return Array.isArray(stores) ? stores : [];
  } catch {
    return [];
  }
}

export async function getStoreByIdAction(
  storeId: string,
): Promise<StoreData | null> {
  // Try fetching the single store by ID first
  try {
    const response = await getStoreByIdService(storeId);
    if (response) {
      const data = response.data;

      // API may return a single object or an array
      if (Array.isArray(data)) {
        const match = data.find((s) => s.id === storeId);
        if (match) return match;
        if (data.length > 0) return data[0];
      } else if (data && typeof data === 'object' && 'id' in data) {
        // Single store object returned directly in data
        return data as unknown as StoreData;
      }

      // Some APIs return the store at the root level (no data wrapper)
      if (
        'id' in response &&
        'storeName' in response &&
        (response as unknown as StoreData).id === storeId
      ) {
        return response as unknown as StoreData;
      }
    }
  } catch {
    // Single-store endpoint failed — fall through to list fallback
  }

  // Fallback: fetch all stores and find by ID
  try {
    const allStores = await getStoresAction();
    return allStores.find((s) => s.id === storeId) ?? null;
  } catch {
    return null;
  }
}

export async function deleteStoresAction(
  storeIds: string[],
): Promise<{ success: boolean; message: string }> {
  try {
    await deleteStoreService(storeIds);
    revalidatePath('/vendor/store');
    return { success: true, message: 'Store(s) deleted successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to delete store(s)',
    };
  }
}

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

  // Build operating hours array

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
      errors: {
        operatingHours: ['Operating hours required for at least one day'],
      },
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

  if (
    result.data.minimumOrder &&
    typeof result.data.minimumOrder === 'number'
  ) {
    apiFormData.append('minimumOrder', String(result.data.minimumOrder));
  }

  if (
    result.data.preparationTime &&
    typeof result.data.preparationTime === 'number'
  ) {
    apiFormData.append('preparationTime', String(result.data.preparationTime));
  }

  // Append operating hours as JSON array
  apiFormData.append('operatingHours', JSON.stringify(operatingHours));

  // Handle logo file
  const logo = formData.get('logo') as File;

  if (logo && logo.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    if (logo.size > MAX_FILE_SIZE) {
      return {
        status: 'error',
        message: 'Store logo must be less than 5MB',
        errors: { logo: ['Image size must be less than 5MB'] },
      };
    }

    // Optional: validate mime type too
    const ALLOWED_TYPES = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!ALLOWED_TYPES.includes(logo.type)) {
      return {
        status: 'error',
        message: 'Only JPEG, PNG, WebP, or GIF images are allowed',
        errors: { logo: ['Invalid file type'] },
      };
    }

    apiFormData.append('logo', logo, logo.name || 'logo');
  }

  try {
    const response = await createStoreService(apiFormData);

    // Revalidate the store page to fetch fresh data
    revalidatePath('/vendor/store');

    return {
      status: 'success',
      message: 'Store created successfully',
      storeId: response?.id,
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to create store',
    };
  }
}

export async function updateStoreAction(
  _prevState: StoreFormState,
  formData: FormData,
): Promise<StoreFormState> {
  const storeId = formData.get('storeId') as string;

  if (!storeId) {
    return {
      status: 'error',
      message: 'Store ID is required for update',
    };
  }

  // Extract fields from FormData
  const rawData = {
    storeName: formData.get('storeName') as string,
    storeCategory: formData.get('storeCategory') as string,
    storeAddress: formData.get('storeAddress') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    email: formData.get('email') as string,
    storeDescription: formData.get('storeDescription') as string,
    minimumOrder: formData.get('minimumOrder') as string,

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
      errors: {
        operatingHours: ['Operating hours required for at least one day'],
      },
    };
  }

  // Build FormData for API (store details)
  const apiFormData = new FormData();
  apiFormData.append('storeName', result.data.storeName);
  apiFormData.append('storeCategory', result.data.storeCategory);
  apiFormData.append('storeAddress', result.data.storeAddress);
  apiFormData.append('phoneNumber', result.data.phoneNumber);

  // Optional fields
  if (result.data.storeDescription) {
    apiFormData.append('storeDescription', result.data.storeDescription);
  }

  if (
    result.data.minimumOrder &&
    typeof result.data.minimumOrder === 'number'
  ) {
    apiFormData.append('minimumOrder', String(result.data.minimumOrder));
  }

  if (
    result.data.preparationTime &&
    typeof result.data.preparationTime === 'number'
  ) {
    apiFormData.append('preparationTime', String(result.data.preparationTime));
  }

  // Handle logo file
  const logo = formData.get('logo') as File;

  if (logo && logo.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    if (logo.size > MAX_FILE_SIZE) {
      return {
        status: 'error',
        message: 'Store logo must be less than 5MB',
        errors: { logo: ['Image size must be less than 5MB'] },
      };
    }

    // Optional: validate mime type too
    const ALLOWED_TYPES = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!ALLOWED_TYPES.includes(logo.type)) {
      return {
        status: 'error',
        message: 'Only JPEG, PNG, WebP, or GIF images are allowed',
        errors: { logo: ['Invalid file type'] },
      };
    }

    apiFormData.append('storeLogo', logo, logo.name || 'store-logo');
  }

  try {
    // Update store details
    await updateStoreService(storeId, apiFormData);

    // Update operating hours separately
    await updateOperatingHoursService(storeId, operatingHours);

    // Revalidate the store page to fetch fresh data
    revalidatePath('/vendor/store');

    return {
      status: 'success',
      message: 'Store updated successfully',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to update store',
    };
  }
}
