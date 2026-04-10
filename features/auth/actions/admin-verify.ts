'use server';

import { redirect } from 'next/navigation';
import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import { verifyAdminOtpService } from '../services/admin-verify';
import { getTokenExpiry } from '@/utils/jwt';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookies';

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

  const identifier = await getCookie('verify_identifier');
  const registrationMethod = await getCookie('registration_method');

  if (!identifier || !registrationMethod) {
    return {
      status: 'error',
      message: 'Verification session expired. Please login again.',
    };
  }

  let redirectTo: string | null = null;

  try {
    const result = await verifyAdminOtpService({
      identifier,
      otp: validated.data.otp,
    });

    if (!result?.data?.accessToken) {
      return {
        status: 'error',
        message: 'Invalid or expired OTP.',
      };
    }

    await setCookie({
      name: 'refreshToken',
      value: result.data.refreshToken,
      maxAge: getTokenExpiry(result.data.refreshToken),
    });

    await deleteCookie('verify_identifier');
    await deleteCookie('registration_method');

    redirectTo = '/admin/dashboard';
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Invalid or expired OTP.',
    };
  }

  if (redirectTo) {
    redirect(redirectTo);
  } else {
    redirect('/admin/dashboard');
  }
}
