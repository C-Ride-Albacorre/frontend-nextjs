'use server';

import {
  getVendorsService,
  getVendorByIdService,
  approveVendorService,
} from './service';
import { VendorDetail, ApproveVendorPayload } from './types';

export async function getVendorsAction(page = 1, limit = 10) {
  const res = await getVendorsService(page, limit);
  console.log('getVendorsAction result:', res.data);
  return { vendors: res.data.data, meta: res.data.meta };
}

export async function getVendorByIdAction(
  vendorId: string,
): Promise<VendorDetail> {
  const res = await getVendorByIdService(vendorId);
  console.log('getVendorByIdAction result:', res.data.data);
  return res.data.data;
}

export async function approveVendorAction(
  vendorId: string,
  payload: ApproveVendorPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    await approveVendorService(vendorId, payload);
    return { success: true, message: 'Vendor status updated successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update vendor',
    };
  }
}
