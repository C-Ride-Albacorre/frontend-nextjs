'use server';

import {
  AddToCartSchema,
  CreateOrderSchema,
  InitializePaymentSchema,
  RemoveCartItemSchema,
  UpdateCartQuantitySchema,
} from './schema';
import {
  addToCartService,
  cancelOrderService,
  clearCartService,
  createOrderService,
  fetchCategoriesService,
  fetchCategoryStoresService,
  fetchStoreDetailsService,
  fetchSubcategoriesService,
  fetchVendorAddressService,
  getCartService,
  getDeliveryOptionsService,
  getOrderDetailsService,
  getOrdersService,
  initializePaymentService,
  removeFromCartService,
  updateCartQuantityService,
  verifyPaymentService,
} from './service';
import { AddToCartPayload, ActionResult, CreateOrderPayload } from './types';

// ═══════════════════════════════════════
// CATEGORIES & STORES
// ═══════════════════════════════════════

export async function fetchCategoriesAction() {
  const result = await fetchCategoriesService();
  return result.data;
}

export async function fetchCategoryStoresAction(
  categoryId: string,
  lat?: number,
  lng?: number,
  subcategoryId?: string,
  page?: number,
  limit?: number,
  search?: string,
  radiusKm?: number,
) {
  const result = await fetchCategoryStoresService(
    categoryId,
    lat,
    lng,
    subcategoryId,
    page,
    limit,
    search,
    radiusKm,
  );

  return {
    stores: result.data.data ?? [],
    total: result.data.total ?? 0,
  };
}

export async function fetchSubcategoriesAction(categoryId: string) {
  try {
    const result = await fetchSubcategoriesService(categoryId);
    return result.data ?? [];
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch subcategories',
    };
  }
}

export async function fetchStoreDetailsAction(storeId: string) {
  try {
    const result = await fetchStoreDetailsService(storeId);
    return result.data ?? [];
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch store details',
    };
  }
}

export async function fetchVendorAddressAction(
  storeId: string,
): Promise<ActionResult> {
  try {
    const result = await fetchVendorAddressService(storeId);
    return { success: true, data: result.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch vendor address',
    };
  }
}

// ═══════════════════════════════════════
// CART
// ═══════════════════════════════════════

export async function getCartAction(): Promise<ActionResult> {
  try {
    const response = await getCartService();
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch cart' };
  }
}

export async function addToCartAction(
  payload: AddToCartPayload,
): Promise<ActionResult> {
  const parsed = AddToCartSchema.safeParse(payload);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid payload';
    console.error('[addToCartAction] Validation failed:', msg);
    return { success: false, error: msg };
  }

  try {
    const response = await addToCartService(parsed.data);
    return { success: true, data: response.data };
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
): Promise<ActionResult> {
  const parsed = UpdateCartQuantitySchema.safeParse({ quantity });
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message || 'Invalid quantity';
    console.error('[updateCartQuantityAction] Validation failed:', msg);
    return { success: false, error: msg };
  }

  try {
    const response = await updateCartQuantityService(
      itemId,
      parsed.data.quantity,
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to update quantity',
    };
  }
}

export async function removeFromCartAction(
  itemId: string,
): Promise<ActionResult> {
  const parsed = RemoveCartItemSchema.safeParse({ itemId });
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message || 'Invalid item ID';
    console.error('[removeFromCartAction] Validation failed:', msg);
    return { success: false, error: msg };
  }

  try {
    const response = await removeFromCartService(parsed.data.itemId);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to remove item from cart',
    };
  }
}

export async function clearCartAction(): Promise<ActionResult> {
  try {
    const response = await clearCartService();
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to clear cart' };
  }
}

// ═══════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════

export async function createOrderAction(
  payload: CreateOrderPayload,
): Promise<ActionResult<{ id: string; orderId?: string }>> {
  const parsed = CreateOrderSchema.safeParse(payload);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid order payload';
    console.error('[createOrderAction] Validation failed:', msg);
    return { success: false, error: msg };
  }

  try {
    const res = await createOrderService(parsed.data);
    return { success: true, data: res.data };
  } catch (e: any) {
    return { success: false, error: e.message || 'Failed to create order' };
  }
}

export async function getOrdersAction(): Promise<ActionResult> {
  try {
    const res = await getOrdersService();
    return { success: true, data: res.data };
  } catch (e: any) {
    return { success: false, error: e.message || 'Failed to fetch orders' };
  }
}

export async function getOrderDetailsAction(
  orderId: string,
): Promise<ActionResult> {
  try {
    const res = await getOrderDetailsService(orderId);
    return { success: true, data: res.data };
  } catch (e: any) {
    return {
      success: false,
      error: e.message || 'Failed to fetch order details',
    };
  }
}

export async function cancelOrderAction(
  orderId: string,
): Promise<ActionResult> {
  try {
    const res = await cancelOrderService(orderId);
    return { success: true, data: res.data };
  } catch (e: any) {
    return { success: false, error: e.message || 'Failed to cancel order' };
  }
}

// ═══════════════════════════════════════
// PAYMENT
// ═══════════════════════════════════════

export async function initializePaymentAction(payload: {
  orderId: string;
  paymentMethod: 'CARD';
  callbackUrl: string;
}): Promise<ActionResult<any>> {
  const parsed = InitializePaymentSchema.safeParse(payload);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid payment payload';
    console.error('[initializePaymentAction] Validation failed:', msg);
    return { success: false, error: msg };
  }

  try {
    const res = await initializePaymentService(parsed.data);
    return { success: true, data: res.data };
  } catch (e: any) {
    return {
      success: false,
      error: e.message || 'Failed to initialize payment',
    };
  }
}

export async function verifyPaymentAction(
  reference: string,
): Promise<ActionResult<any>> {
  try {
    const res = await verifyPaymentService(reference);
    return { success: true, data: res.data };
  } catch (e: any) {
    return { success: false, error: e.message || 'Failed to verify payment' };
  }
}

// ═══════════════════════════════════════
// DELIVERY OPTIONS
// ═══════════════════════════════════════

export async function getDeliveryOptionsAction(): Promise<ActionResult<any[]>> {
  try {
    const res = await getDeliveryOptionsService();
    return { success: true, data: res.data ?? [] };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
