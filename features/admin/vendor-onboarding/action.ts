
'use server';

import { revalidatePath } from 'next/cache';
import {
  getVendorsService,
  getVendorByIdService,
  approveVendorService,
} from './service';
import { ApproveVendorPayload, VendorDetail } from './types';

export async function getVendorsAction(
  page = 1,
  limit = 10,
  status?: string,
  search?: string,
) {
  const res = await getVendorsService(page, limit, status, search);
  return { vendors: res.data.data, meta: res.data.meta };
}

export async function getVendorByIdAction(
  vendorId: string,
): Promise<VendorDetail> {
  const res = await getVendorByIdService(vendorId);
  return res.data.data;
}

export async function approveVendorAction(
  vendorId: string,
  payload: ApproveVendorPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    await approveVendorService(vendorId, payload);
    revalidatePath('/admin/vendor-onboarding');
    return { success: true, message: 'Vendor status updated successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update vendor',
    };
  }
}
