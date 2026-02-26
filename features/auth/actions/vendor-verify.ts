'use server';

import { getTokenExpiry } from '@/utils/jwt';
import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import {
  verifyVendorEmailService,
  verifyVendorPhoneService,
} from '../services/vendor-verify';
import { getCookie, setAuthCookies, setCookie } from '@/utils/cookies';

export async function VendorVerifyPhoneAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({ otp: formData.get('otp') });

  if (!validated.success) {
    return { status: 'error', errors: validated.error.flatten().fieldErrors };
  }

  const phoneNumber = await getCookie('vendor_phone_number');

  if (!phoneNumber) {
    return {
      status: 'error',
      message: 'Verification session expired. Please register again.',
    };
  }

  try {
    await verifyVendorPhoneService({ phoneNumber, otp: validated.data.otp });
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Invalid or expired OTP.',
    };
  }

  return {
    status: 'success',
    message: 'Phone number verified successfully!',
    redirectTo: '/verify/vendor-email',
  };
}

export async function VendorVerifyEmailAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({ otp: formData.get('otp') });

  if (!validated.success) {
    return { status: 'error', errors: validated.error.flatten().fieldErrors };
  }

  const email = await getCookie('vendor_email');

  if (!email) {
    return {
      status: 'error',
      message: 'Verification session expired. Please register again.',
    };
  }

  try {
    const result = await verifyVendorEmailService({
      email,
      otp: validated.data.otp,
    });

    await setCookie({
      name: 'accessToken',
      value: result.data.accessToken,
      maxAge: getTokenExpiry(result.data.accessToken),
    });

    await setCookie({
      name: 'vendor_id',
      value: result.data.vendor.id,
      maxAge: 60 * 60,
    });
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Invalid or expired OTP.',
    };
  }

  return {
    status: 'success',
    message: 'Email verified successfully!',
  };
}
