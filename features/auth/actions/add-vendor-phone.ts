'use server';

import { setCookie } from '@/utils/cookies';
import { addVendorPhoneService } from '../services/add-vendor-phone';

export async function AddVendorPhoneAction(
  _prevState: any,
  formData: FormData,
) {
  const phoneNumber = formData.get('phone') as string;
  if (!phoneNumber) {
    return { status: 'error', message: 'Phone number is required.' };
  }
  try {
    const result = await addVendorPhoneService({ phoneNumber });

    console.log('Add vendor phone response:', result);

    await setCookie({
      name: 'vendor_phone_number',
      value: result.data.user.phoneNumber,
      maxAge: 60 * 30,
    });

    return { status: 'success', redirectTo: '/verify/vendor-phone' };
  } catch (error: any) {
    return {
      status: 'error',
      message: error.message || 'Failed to add phone number.',
    };
  }
}
