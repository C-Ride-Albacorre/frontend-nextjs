'use server';

import {
  AddToCartSchema,
  RemoveCartItemSchema,
  UpdateCartQuantitySchema,
} from './schema';
import {
  addToCartService,
  clearCartService,
  fetchCategoriesService,
  fetchCategoryStoresService,
  fetchStoreDetailsService,
  fetchSubcategoriesService,
  getCartService,
  getDeliveryOptionsService,
  removeFromCartService,
  updateCartQuantityService,
} from './service';
import { AddToCartPayload } from './types';

export async function fetchCategoriesAction() {
  const result = await fetchCategoriesService();
  return result.data; // Fixed: service already returns the data object
}

export async function fetchCategoryStoresAction(
  categoryId: string,
  lat?: number,
  lng?: number,
) {
  const result = await fetchCategoryStoresService(categoryId);

  console.log('Category Details:', result);

  return result.data.data ?? []; // Fixed: service already returns the data object
}

export async function fetchSubcategoriesAction(categoryId: string) {
  const result = await fetchSubcategoriesService(categoryId);

  console.log('id', categoryId);
  return result.data ?? [];
}

export async function fetchStoreDetailsAction(storeId: string) {
  try {
    const result = await fetchStoreDetailsService(storeId);
    console.log('Store Details:', result);

    return result.data ?? []; // Fixed: service already returns the data object
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch store details',
    };
  }
}

export async function getCartAction() {
  try {
    const response = await getCartService();

    console.log('Get Cart Response:', response);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch cart' };
  }
}

export async function addToCartAction(payload: AddToCartPayload) {
  const parsed = AddToCartSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid payload',
    };
  }

  try {
    const response = await addToCartService(parsed.data);

    console.log('Add to Cart Response:', response);
    return {
      success: true,
      data: response.data, // ← return only the inner cart here
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to add item to cart',
    };
  }
}

export async function updateCartQuantityAction(
  itemId: string,
  quantity: number,
) {
  const parsed = UpdateCartQuantitySchema.safeParse({ quantity });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid quantity',
    };
  }

  try {
    const response = await updateCartQuantityService(
      itemId,
      parsed.data.quantity,
    );
    console.log('Update Cart Quantity Response:', response);
    return { success: true, data: response.data }; // ← return only the inner cart here
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to update quantity',
    };
  }
}

export async function removeFromCartAction(itemId: string) {
  const parsed = RemoveCartItemSchema.safeParse({ itemId });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid item ID',
    };
  }

  try {
    const response = await removeFromCartService(parsed.data.itemId);

    console.log('Remove from Cart Response:', response);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to remove item from cart',
    };
  }
}

export async function clearCartAction() {
  try {
    const response = await clearCartService();
    console.log('Clear Cart Response:', response);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to clear cart' };
  }
}

import {
  createOrderService,
  initializePaymentService,
  verifyPaymentService,
} from './service';

export async function createOrderAction(payload: any) {
  try {
    const res = await createOrderService(payload);
    return { success: true, data: res.data };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function initializePaymentAction(payload: {
  orderId: string;
  paymentMethod: 'CARD';
  callbackUrl: string;
}) {
  try {
    const res = await initializePaymentService(payload);
    return { success: true, data: res.data };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function verifyPaymentAction(reference: string) {
  try {
    const res = await verifyPaymentService(reference);
    return { success: true, data: res.data };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function getDeliveryOptionsAction() {
  try {
    const res = await getDeliveryOptionsService();
    return { success: true, data: res.data ?? [] };
  } catch (e: any) {
    return { success: false, error: e.message, data: [] };
  }
}
