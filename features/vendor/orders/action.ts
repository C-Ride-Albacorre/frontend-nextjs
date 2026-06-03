'use server';

import { success } from 'zod';
import { getVendorOrdersService, vendorOrderActionService } from './service';
import { VendorOrderActionPayload } from './types';
import { revalidatePath } from 'next/cache';

export async function getVendorOrderAction() {
  try {
    const response = await getVendorOrdersService();

    const orders = response?.data.data;

    return {
      success: true,
      message: 'Orders fetched successfully',
      orders: Array.isArray(orders) ? orders : [],
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch orders',
      orders: [],
    };
  }
}


export async function vendorOrderAction({
  orderId,
  payload,
}: VendorOrderActionPayload) {
  try {
    const response = await vendorOrderActionService({
      orderId,
      payload,
    });

    revalidatePath('/vendor/orders'); 
    return {
      success: true,
      message:
        response?.message ??
        'Order action performed successfully',
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to perform order action',
      data: null,
    };
  }
}