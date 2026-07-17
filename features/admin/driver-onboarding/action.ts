'use server';

import { revalidatePath } from 'next/cache';
import {
  approveDriverService,
  getDriverByIdService,
  getDriversService,
} from './service';
import {
  ApproveDriverPayload,
  DriverDetail,
  GetDriverByIdResponse,
} from './types';

export async function getDriversAction(
  page = 1,
  limit = 10,
  status?: string,
  search?: string,
) {
  const res = await getDriversService(page, limit, status, search);

  console.log('Fetched drivers:', res);
  return { drivers: res.data.data, meta: res.data.meta };
}

export async function getDriverByIdAction(driverId: string) {
  const res = await getDriverByIdService(driverId);

  return res.data.data;
}

export async function approveDriverAction(
  driverId: string,
  payload: ApproveDriverPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    await approveDriverService(driverId, payload);
    revalidatePath('/admin/driver-onboarding');
    return { success: true, message: 'Driver status updated successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to update driver status',
    };
  }
}
