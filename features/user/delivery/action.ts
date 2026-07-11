'use server';

import {
  cancelOrderService,
  createOrderService,
  getDeliveryOptionsService,
  getOrderDetailsService,
  getOrdersService,
  getPaymentStatusService,
  initializePaymentService,
} from './order-service';
import type { ActionResult, CreateOrderPayload } from './types';

import { CreateOrderSchema, InitializePaymentSchema } from './schema';

// ═══════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════

export async function createOrderAction(
  payload: CreateOrderPayload,
): Promise<ActionResult<{  orderId?: string }>> {
  console.log('Order payload validated:', payload);

  const parsed = CreateOrderSchema.safeParse(payload);

  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Invalid order payload';
    console.error('[createOrderAction] Validation failed:', msg);
    return { success: false, error: msg };
  }

  try {
    const res = await createOrderService(parsed.data);

    console.log('[createOrderAction] Response:', res);


    return { success: true, data: res?.data };
  } catch (e: any) {
    return { success: false, error: e.message || 'Failed to create order' };
  }
}

export async function getOrdersAction(): Promise<ActionResult<any[]>> {
  try {
    const res = await getOrdersService();

    console.log(' [getOrdersAction] Response:', res);
    return { success: true, data: res.data };
  } catch (e: any) {
    return { success: false, error: e.message || 'Failed to fetch orders' };
  }
}

export async function getOrderDetailsAction(
  orderId: string,
): Promise<ActionResult<any>> {
  try {
    const res = await getOrderDetailsService(orderId);


    console.log(' [getOrderDetailsAction] Response:', res);

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
): Promise<ActionResult<any>> {
  try {
    const res = await cancelOrderService(orderId);

    console.log(' [cancelOrderAction] Response:', res);
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
    console.log(
      '[initializePaymentAction] Payload:',
      JSON.stringify(parsed.data, null, 2),
    );
    const res = await initializePaymentService(parsed.data);

    console.log(
      '[initializePaymentAction] Response:',
      JSON.stringify(res.data, null, 2),
    );
    return { success: true, data: res.data };
  } catch (e: any) {
    console.error('[initializePaymentAction] Error:', e.message, e);
    return {
      success: false,
      error: e.message || 'Failed to initialize payment',
    };
  }
}

export async function getPaymentStatusAction(
  transactionReference: string,
): Promise<ActionResult<any>> {
  try {
    const res = await getPaymentStatusService(transactionReference);

    return { success: true, data: res.data };
  } catch (e: any) {
    return {
      success: false,
      error: e.message || 'Failed to get payment status',
    };
  }
}

// ═══════════════════════════════════════
// DELIVERY OPTIONS
// ═══════════════════════════════════════

export async function getDeliveryOptionsAction(): Promise<ActionResult<any>> {
  try {
    const res = await getDeliveryOptionsService();
    return { success: true, data: res.data ?? [] };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
