'use server';

import {
  getStoresService,
  getStoreByIdService,
  approveStoreService,
} from './service';
import { StoreDetail, ApproveStorePayload } from './types';

export async function getStoresAction(page = 1, limit = 10) {
  const res = await getStoresService(page, limit);
  console.log('getStoresAction result:', res.data);
  return { stores: res.data.data, meta: res.data.meta };
}

export async function getStoreByIdAction(
  storeId: string,
): Promise<StoreDetail> {
  const res = await getStoreByIdService(storeId);
  console.log('getStoreByIdAction result:', res.data.data);
  return res.data.data;
}

export async function approveStoreAction(
  storeId: string,
  payload: ApproveStorePayload,
): Promise<{ success: boolean; message: string }> {
  try {
    await approveStoreService(storeId, payload);
    return { success: true, message: 'Store status updated successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update store',
    };
  }
}
