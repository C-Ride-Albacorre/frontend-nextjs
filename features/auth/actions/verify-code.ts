'use server';

import { redirect } from 'next/navigation';
import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import { verifyOtpService } from '../services/verify-code';
import { getTokenExpiry } from '@/utils/jwt';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookies';

export async function VerifyCodeAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const identifier = await getCookie('verify_identifier');
  const registrationMethod = await getCookie('registration_method');

  if (!identifier || !registrationMethod) {
    return { message: 'Verification session expired. Please register again.' };
  }

  try {
    const result = await verifyOtpService({
      identifier,
      otp: validated.data.otp,
    });

    if (!result?.data?.accessToken) {
      return { message: 'Invalid or expired OTP.' };
    }

    await setCookie({
      name: 'accessToken',
      value: result.data.accessToken,
      maxAge: getTokenExpiry(result.data.accessToken),
    });

    await setCookie({
      name: 'refreshToken',
      value: result.data.refreshToken,
      maxAge: getTokenExpiry(result.data.refreshToken),
    });

    await deleteCookie('verify_identifier');
    await deleteCookie('registration_method');
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : 'Invalid or expired OTP.',
    };
  }

  redirect('/user/dashboard');
}
