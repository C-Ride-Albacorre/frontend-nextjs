
'use server';

import { revalidatePath } from 'next/cache';
import {
  getStoresService,
  getStoreByIdService,
  approveStoreService,
} from './service';
import { ApproveStorePayload, StoreDetail } from './types';

export async function getStoresAction(
  page = 1,
  limit = 10,
  status?: string,
  search?: string,
  vendorId?: string,
) {
  const res = await getStoresService(page, limit, status, search, vendorId);
  return { stores: res.data.data, meta: res.data.meta };
}

export async function getStoreByIdAction(
  storeId: string,
): Promise<StoreDetail> {
  const res = await getStoreByIdService(storeId);
  return res.data.data;
}

export async function approveStoreAction(
  storeId: string,
  payload: ApproveStorePayload,
): Promise<{ success: boolean; message: string }> {
  try {
    await approveStoreService(storeId, payload);

    
    revalidatePath('/admin/stores');


    return { success: true, message: 'Store status updated successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update store',
    };
  }
}
