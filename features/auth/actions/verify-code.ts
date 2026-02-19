'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import { verifyOtpService } from '../services/verify-code';
import { getTokenExpiry } from '@/utils/jwt';

export async function VerifyCodeAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();

  const identifier = cookieStore.get('verify_identifier')?.value;

  if (!identifier) {
    return {
      message: 'Verification session expired. Please register again.',
    };
  }

  const result = await verifyOtpService({
    identifier,
    otp: validated.data.otp,
  });

  if (!result?.accessToken) {
    return { message: 'Invalid or expired OTP' };
  }

  const accessTokenMaxAge = getTokenExpiry(result.accessToken);
  const refreshTokenMaxAge = getTokenExpiry(result.refreshToken);

  const isProd = process.env.NODE_ENV === 'production';

  cookieStore.set('accessToken', result.accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: accessTokenMaxAge,
  });

  cookieStore.set('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: refreshTokenMaxAge,
  });

  cookieStore.delete('verify_identifier');
  cookieStore.delete('verify_method');

  redirect('/user/dashboard');
}
