import { BASE_URL } from "@/config/api";
import { ApiError } from "@/features/libs/api-error";
import { authFetch } from "@/features/libs/auth-fetch";
import { CreateOrderPayload, InitializePaymentPayload } from "./types";



async function authRequest(
  tag: string,
  url: string,
  options: RequestInit = {},
) {
  const method = options.method ?? 'GET';

  const res = await authFetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();

  console.log(`[${tag}] RESPONSE ${res.status}`, data);

  if (!res.ok) {
    const err = new ApiError(
      data?.message || `${tag} failed`,
      data?.statusCode ?? res.status,
    );
    console.error(`[${tag}] ERROR`, err);
    throw err;
  }

  return data;
}




// ═══════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════

export async function createOrderService(payload: CreateOrderPayload) {
  return authRequest('CreateOrder', `${BASE_URL}/customer/orders`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getOrdersService() {
  return authRequest('GetOrders', `${BASE_URL}/customer/orders`);
}

export async function getOrderDetailsService(orderId: string) {
  return authRequest(
    'GetOrderDetails',
    `${BASE_URL}/customer/orders/${orderId}`,
  );
}

export async function cancelOrderService(orderId: string) {
  return authRequest(
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
  return authRequest(
    'InitializePayment',
    `${BASE_URL}/customer/payment/initialize`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
}

export async function getPaymentStatusService(transactionReference: string) {
  const params = new URLSearchParams({ transactionReference });
  return authRequest(
    'GetPaymentStatus',
    `${BASE_URL}/payment/status?${params.toString()}`,
  );
}

// ═══════════════════════════════════════
// DELIVERY OPTIONS
// ═══════════════════════════════════════

export async function getDeliveryOptionsService() {
  return authRequest(
    'GetDeliveryOptions',
    `${BASE_URL}/customer/delivery-options`,
  );
}
