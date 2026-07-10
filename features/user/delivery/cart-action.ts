'use server';

import {
  AddToCartSchema,
  RemoveCartItemSchema,
  UpdateCartQuantitySchema,
} from './schema';
import {
  addToCartService,
  getCartService,
  removeFromCartService,
  updateCartQuantityService,
  clearCartService,
} from './cart-service';
import { AddToCartPayload, ActionResult, CreateOrderPayload } from './types';

// ═══════════════════════════════════════
// CART
// ═══════════════════════════════════════

export async function getCartAction(): Promise<ActionResult> {
  try {
    const response = await getCartService();

    console.log('[getCartAction] Service response:', response);

    if (response.status !== 'success') {
      return {
        success: false,
        error: response?.message || 'Failed to fetch cart',
      };
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch cart' };
  }
}

export async function addToCartAction(
  payload: AddToCartPayload,
): Promise<ActionResult> {
  const parsed = AddToCartSchema.safeParse(payload);

  console.log('[addToCartAction] Parsed Payload:', parsed.data);

  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid payload';
    console.error('[addToCartAction] Validation failed:', msg);
    return { success: false, error: msg };
  }

  try {
    const response = await addToCartService(parsed.data);

    console.log('[Add to Cart] Service response:', response);

    if (response?.status !== 'success') {
      return {
        success: false,
        error: response?.message || 'Failed to add item to cart',
      };
    }

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

  console.log(
    '[updateCartQuantityAction] Item ID:',
    itemId,
    'Quantity:',
    quantity,
  );

  try {
    const response = await updateCartQuantityService(
      itemId,
      parsed.data.quantity,
    );

    console.log(
      '[updateCartQuantityAction] Service response:',
      response,
      response?.data.items,
    );

    if (response.status !== 'success') {
      return {
        success: false,
        error: response?.message || 'Failed to update quantity',
      };
    }
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

    console.log(' [removeFromCartAction] Service response:', response);

    if (response.status !== 'success') {
      return {
        success: false,
        error: response?.message || 'Failed to remove item from cart',
      };
    }

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

    console.log(' [clearCartAction] Service response:', response);

    if (response.status !== 'success') {
      return {
        success: false,
        error: response?.message || 'Failed to clear cart',
      };
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to clear cart' };
  }
}
