import { BASE_URL } from '@/config/api';
import {
  CancelOrderResponse,
  CreateOrderPayload,
  CreateOrderResponse,
  GetDeliveryOptionResponse,
  GetPaymentStatusResponse,
  InitializePaymentPayload,
  InitializePaymentResponse,
  OrderDetailsResponse,
  OrderResponse,
} from './types';
import { authRequest } from '@/libs/api/auth-request';

// ═══════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════

export async function createOrderService(payload: CreateOrderPayload) {
  return authRequest<CreateOrderResponse>(`${BASE_URL}/customer/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    nextTags: ['create-order'],
  });
}

export async function getOrdersService() {
  return authRequest<OrderResponse>(`${BASE_URL}/customer/orders`, {
    nextTags: ['get-orders'],
  });
}

export async function getOrderDetailsService(orderId: string) {
  return authRequest<OrderDetailsResponse>(
    `${BASE_URL}/customer/orders/${orderId}`,
    {
      nextTags: ['get-order-details'],
    },
  );
}

export async function cancelOrderService(orderId: string) {
  return authRequest<CancelOrderResponse>(
    `${BASE_URL}/customer/orders/${orderId}/cancel`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      nextTags: ['cancel-order'],
    },
  );
}

// ═══════════════════════════════════════
// PAYMENT
// ═══════════════════════════════════════

export async function initializePaymentService(
  payload: InitializePaymentPayload,
) {
  return authRequest<InitializePaymentResponse>(
    `${BASE_URL}/customer/payment/initialize`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      nextTags: ['initialize-payment'],
    },
  );
}

export async function getPaymentStatusService(transactionReference: string) {
  const params = new URLSearchParams({ transactionReference });
  return authRequest<GetPaymentStatusResponse>(`${BASE_URL}/payment/status?${params.toString()}`, {
    nextTags: ['get-payment-status'],
  });
}

// ═══════════════════════════════════════
// DELIVERY OPTIONS
// ═══════════════════════════════════════

export async function getDeliveryOptionsService() {
  return authRequest<GetDeliveryOptionResponse>(`${BASE_URL}/customer/delivery-options`, {
    nextTags: ['get-delivery-options'],
    cacheStrategy: { revalidate: 3600 },
  });
}
