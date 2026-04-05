import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import {
  AddToCartPayload,
  CreateOrderPayload,
  InitializePaymentPayload,
} from './types';

// ─── Logging helper ───

function logRequest(tag: string, method: string, url: string, body?: unknown) {
  console.log(`[${tag}] REQUEST ${method} ${url}`, body ?? '');
}

function logResponse(tag: string, status: number, data: unknown) {
  console.log(`[${tag}] RESPONSE ${status}`, data);
}

function logError(tag: string, error: unknown) {
  console.error(`[${tag}] ERROR`, error);
}

// ─── Helper ───

async function request(
  tag: string,
  url: string,
  options: RequestInit & { body?: string } = {},
) {
  const method = options.method ?? 'GET';
  const parsed = options.body ? JSON.parse(options.body) : undefined;
  logRequest(tag, method, url, parsed);

  const res = await authFetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  const data = await res.json();
  logResponse(tag, res.status, data);

  if (!res.ok) {
    const err = new ApiError(
      data?.message || `${tag} failed`,
      data?.statusCode ?? res.status,
    );
    logError(tag, err);
    throw err;
  }

  return data;
}

// ═══════════════════════════════════════
// CATEGORIES & STORES
// ═══════════════════════════════════════

export async function fetchCategoriesService() {
  return request('FetchCategories', `${BASE_URL}/customer/categories`);
}

export async function fetchCategoryStoresService(
  categoryId: string,
  lat?: number,
  lng?: number,
  subcategoryId?: string,
  page?: number,
  limit?: number,
  search?: string,
  radiusKm?: number,
) {
  const params = new URLSearchParams();
  if (lat !== undefined) params.set('lat', String(lat));
  if (lng !== undefined) params.set('lng', String(lng));
  if (subcategoryId) params.set('subcategoryId', subcategoryId);
  if (page) params.set('page', String(page));
  if (limit) params.set('limit', String(limit));
  if (search) params.set('search', search);
  if (radiusKm) params.set('radiusKm', String(radiusKm));

  const qs = params.toString();
  const url = `${BASE_URL}/customer/stores/category/${categoryId}${qs ? `?${qs}` : ''}`;

  return request('FetchCategoryStores', url);
}

export async function fetchSubcategoriesService(categoryId: string) {
  return request(
    'FetchSubcategories',
    `${BASE_URL}/customer/subcategories/category/${categoryId}`,
  );
}

export async function fetchStoreDetailsService(storeId: string) {
  return request('FetchStoreDetails', `${BASE_URL}/customer/stores/${storeId}`);
}

export async function fetchVendorAddressService(storeId: string) {
  return request(
    'FetchVendorAddress',
    `${BASE_URL}/customer/vendor-address/${storeId}`,
  );
}

// ═══════════════════════════════════════
// CART
// ═══════════════════════════════════════

export async function getCartService() {
  return request('GetCart', `${BASE_URL}/customer/cart`);
}

export async function addToCartService(payload: AddToCartPayload) {
  return request('AddToCart', `${BASE_URL}/customer/cart/add`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCartQuantityService(
  itemId: string,
  quantity: number,
) {
  return request(
    'UpdateCartQuantity',
    `${BASE_URL}/customer/cart/item/${itemId}/quantity`,
    {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    },
  );
}

export async function removeFromCartService(itemId: string) {
  return request(
    'RemoveFromCart',
    `${BASE_URL}/customer/cart/item/${itemId}/remove`,
    { method: 'POST' },
  );
}

export async function clearCartService() {
  return request('ClearCart', `${BASE_URL}/customer/cart/clear`, {
    method: 'POST',
  });
}

// ═══════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════

export async function createOrderService(payload: CreateOrderPayload) {
  return request('CreateOrder', `${BASE_URL}/customer/orders`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getOrdersService() {
  return request('GetOrders', `${BASE_URL}/customer/orders`);
}

export async function getOrderDetailsService(orderId: string) {
  return request('GetOrderDetails', `${BASE_URL}/customer/orders/${orderId}`);
}

export async function cancelOrderService(orderId: string) {
  return request(
    'CancelOrder',
    `${BASE_URL}/customer/orders/${orderId}/cancel`,
    { method: 'POST' },
  );
}

// ═══════════════════════════════════════
// PAYMENT
// ═══════════════════════════════════════

export async function initializePaymentService(
  payload: InitializePaymentPayload,
) {
  return request(
    'InitializePayment',
    `${BASE_URL}/customer/payment/initialize`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export async function verifyPaymentService(reference: string) {
  return request(
    'VerifyPayment',
    `${BASE_URL}/customer/payment/verify/${reference}`,
    { method: 'POST' },
  );
}

// ═══════════════════════════════════════
// DELIVERY OPTIONS
// ═══════════════════════════════════════

export async function getDeliveryOptionsService() {
  return request('GetDeliveryOptions', `${BASE_URL}/customer/delivery-options`);
}
