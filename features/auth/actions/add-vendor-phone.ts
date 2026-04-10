'use server';

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
    await addVendorPhoneService({ phoneNumber });
    // Set cookie for phone number to use in OTP verification
    // (optional, if your OTP flow expects it)
    return { status: 'success', redirectTo: '/verify/vendor-phone' };
  } catch (error: any) {
    return {
      status: 'error',
      message: error.message || 'Failed to add phone number.',
    };
  }
}
