import { BASE_URL } from '@/config/api';
import {
  AddToCartPayload,
  AddToCartResponse,
  CartResponse,
  ClearCartResponse,
  UpdateCartQuantityResponse,
} from './types';
import { cartRequest } from '@/libs/api/cart-request';

// ═══════════════════════════════════════
// CART
// ═══════════════════════════════════════

export async function getCartService() {
  return cartRequest<CartResponse>(`${BASE_URL}/cart`, {
    nextTags: ['get-cart'],
  });
}

export async function addToCartService(payload: AddToCartPayload) {
  console.log('[addToCartService] Payload:', payload);
  return cartRequest<AddToCartResponse>(`${BASE_URL}/cart/add`, {
    method: 'POST',
    body: JSON.stringify(payload),

    nextTags: ['add-to-cart'],
  });
}

export async function updateCartQuantityService(
  itemId: string,
  quantity: number,
) {
  return cartRequest<UpdateCartQuantityResponse>(
    `${BASE_URL}/cart/item/${itemId}/quantity`,
    {
      method: 'POST',
      body: JSON.stringify({ quantity }),
      nextTags: ['update-cart-quantity'],
    },
  );
}

export async function removeFromCartService(itemId: string) {
  return cartRequest<UpdateCartQuantityResponse>(
    `${BASE_URL}/cart/item/${itemId}/remove`,
    {
      method: 'POST',
      nextTags: ['remove-from-cart'],
    },
  );
}

export async function clearCartService() {
  return cartRequest<ClearCartResponse>(`${BASE_URL}/cart/clear`, {
    method: 'POST',
    nextTags: ['clear-cart'],
  });
}
