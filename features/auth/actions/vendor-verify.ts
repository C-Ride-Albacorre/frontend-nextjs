'use server';

import { redirect } from 'next/navigation';
import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import {
  verifyVendorEmailService,
  verifyVendorPhoneService,
} from '../services/vendor-verify';
import { getCookie, deleteCookie, setAuthCookies } from '@/utils/cookies';
import { getTokenExpiry } from '@/utils/jwt';

export async function VendorVerifyEmailAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({ otp: formData.get('otp') });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const email = await getCookie('vendor_email');

  if (!email) {
    return { message: 'Verification session expired. Please register again.' };
  }

  try {
    await verifyVendorEmailService({ email, otp: validated.data.otp });
    // ✅ don't delete email cookie yet — phone verification still needs it
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : 'Invalid or expired OTP.',
    };
  }

  // ✅ email verified — go to phone verification
  redirect('/verify/vendor-phone');
}

export async function VendorVerifyPhoneAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({ otp: formData.get('otp') });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const phoneNumber = await getCookie('vendor_phone_number');

  if (!phoneNumber) {
    return { message: 'Verification session expired. Please register again.' };
  }

  try {
    const result = await verifyVendorPhoneService({
      phoneNumber,
      otp: validated.data.otp,
    });

    // ✅ both verified — set auth cookies if API returns tokens
    if (result?.data?.accessToken) {
      await setAuthCookies(result.data.accessToken, result.data.refreshToken);
    }

    // ✅ clean up verification cookies
    await deleteCookie('vendor_email');
    await deleteCookie('vendor_phone_number');
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : 'Invalid or expired OTP.',
    };
  }

  redirect('/vendor/dashboard');
}
