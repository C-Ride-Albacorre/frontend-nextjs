'use server';

import {
  getVendorOrderIdService,
  getVendorOrdersService,
  vendorOrderActionService,
} from './service';
import { VendorOrderActionPayload } from './types';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function getVendorOrderAction({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  try {
    const response = await getVendorOrdersService({
      page,
      limit,
    });

    const orders = response?.data.data ?? [];

    return {
      success: true,
      message: 'Orders fetched successfully',
      orders: Array.isArray(orders) ? orders : [],
      total: response?.data.total ?? 0,
      totalPages: response?.data.totalPages ?? 0,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch orders',
      orders: [],
      total: 0,
      totalPages: 0,
    };
  }
}

export async function getVendorOrderIdAction({ orderId }: { orderId: string }) {
  try {
    const response = await getVendorOrderIdService({
      orderId,
    });

    console.log(' Get vendor order details response:', response.data.items);

    const orderDetails = response?.data;

    return {
      success: true,
      message: 'Order details fetched successfully',
      orderDetails: orderDetails,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch order details',
    };
  }
}

export async function vendorOrderAction({
  orderId,
  payload,
}: VendorOrderActionPayload) {
  console.log(' Performing vendor order action with payload:', {
    orderId,
    payload,
  });

  try {
    const response = await vendorOrderActionService({
      orderId,
      payload,
    });

    console.log(' Vendor order action response:', response);

    revalidateTag(`vendor-orders-${orderId}`, 'default');

    revalidateTag(`vendor-orders`, 'default');
    
    return {
      success: true,
      message: response?.message ?? 'Order action performed successfully',
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
