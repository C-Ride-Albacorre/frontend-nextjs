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
      message: 'Verification session expired. Please register again.',
    };
  }

  console.log('Verifying OTP for identifier:', identifier);
  console.log('OTP entered:', validated.data.otp);

  let redirectTo: string | null = null;

  try {
    const result = await verifyOtpService({
      identifier,
      otp: validated.data.otp,
    });

    console.log('Verify OTP response:', result);

    if (!result?.data) {
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

    let userNewData = true;

    if (userNewData) {
      redirectTo = '/user/delivery?newUser=true';
    }
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
    redirect('/user/delivery');
  }
}
