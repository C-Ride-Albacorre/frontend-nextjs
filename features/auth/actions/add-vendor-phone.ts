'use server';

import { COOKIE_KEYS, getCookie, setCookie } from '@/utils/cookies';
import { addVendorPhoneService } from '../services/add-vendor-phone';

export async function AddVendorPhoneAction(
  _prevState: any,
  formData: FormData,
) {
  const phoneNumber = formData.get('phone') as string;
  const countryCode = formData.get('countryCode') as string;

  const verificationToken = await getCookie(COOKIE_KEYS.VERIFICATION_TOKEN);

  // -------------------------
  // 1. INPUT VALIDATION
  // -------------------------
  if (!phoneNumber || phoneNumber.trim().length < 10) {
    return {
      status: 'error',
      message: 'Please enter a valid phone number.',
    };
  }

  if (!verificationToken) {
    return {
      status: 'error',
      message: 'Verification session expired. Please start again.',
    };
  }

  try {
    const result = await addVendorPhoneService({
      phoneNumber,
      countryCode,
      verificationToken,
    });

    console.log('Add phone response:', result);

    // -------------------------
    // 2. SAFE RESPONSE CHECKING
    // -------------------------
    const isSuccess =
      result?.status === 'success' 

    const message =
      result?.data.message || 'Unable to send OTP. Please try again.';

    if (!isSuccess) {
      return {
        status: 'error',
        message,
      };
    }

    // -------------------------
    // 3. SIDE EFFECTS (COOKIE)
    // -------------------------
    await setCookie({
      name: COOKIE_KEYS.VENDOR_PHONE_NUMBER,
      value: result.data.identifier,
      maxAge: 60 * 30, 
    });


  

    // -------------------------
    // 4. SUCCESS RESPONSE
    // -------------------------
    return {
      status: 'success',
      message: result.data.nextAction || 'OTP sent successfully.',
      redirectTo: '/verify/vendor-phone',
    };
  } catch (error: unknown) {
    // -------------------------
    // 5. GRACEFUL ERROR HANDLING
    // -------------------------
    const err = error as Error;

    const msg = err?.message?.toLowerCase() || '';

    if (msg.includes('network')) {
      return {
        status: 'error',
        message: 'Network error. Please check your connection.',
      };
    }

    if (msg.includes('400')) {
      return {
        status: 'error',
        message: 'Invalid phone number format.',
      };
    }

    if (msg.includes('409')) {
      return {
        status: 'error',
        message: 'Phone number already exists.',
      };
    }

    if (msg.includes('429')) {
      return {
        status: 'error',
        message: 'Too many requests. Please try again later.',
      };
    }

    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    };
  }
}
