
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import {
  getStoreByIdService,
  approveStoreService,
} from './service';
import { ApproveStorePayload, StoreDetail } from './types';



export async function getStoreByIdAction(
  storeId: string,
){
  const res = await getStoreByIdService(storeId);


  return res.data.data;
}

export async function approveStoreAction(
  storeId: string,
  payload: ApproveStorePayload,
): Promise<{ success: boolean; message: string }> {
  try {
    await approveStoreService(storeId, payload);


    revalidateTag(`get-store-${storeId}`, 'default');
    
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
