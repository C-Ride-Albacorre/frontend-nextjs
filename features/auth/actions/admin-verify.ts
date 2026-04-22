'use server';

import { redirect } from 'next/navigation';
import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import { verifyAdminOtpService } from '../services/admin-verify';
import {
  COOKIE_KEYS,
  getCookie,
  setAuthCookies,
  clearVerificationCookies,
} from '@/utils/cookies';

export async function AdminVerifyCodeAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const identifier = await getCookie(COOKIE_KEYS.VERIFY_IDENTIFIER);
  const registrationMethod = await getCookie(COOKIE_KEYS.REGISTRATION_METHOD);
  const verificationToken = await getCookie(COOKIE_KEYS.VERIFICATION_TOKEN);

  if (!verificationToken) {
    return {
      status: 'error',
      message: 'Verification session expired. Please start again.',
    };
  }

  if (!identifier || !registrationMethod || !verificationToken) {
    return {
      status: 'error',
      message: 'Verification session expired. Please login again.',
    };
  }

  try {
    const result = await verifyAdminOtpService({
      identifier,
      otp: validated.data.otp,
      verificationToken,
    });

    const data = result?.data;

    if (!data?.accessToken || !data?.refreshToken) {
      return {
        status: 'error',
        message: 'Invalid verification response. Please try again.',
      };
    }

    await setAuthCookies(data.accessToken, data.refreshToken);

    await clearVerificationCookies();
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Invalid or expired OTP.',
    };
  }

  redirect('/admin/dashboard');
}
