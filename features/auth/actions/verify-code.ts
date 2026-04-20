'use server';

import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import { verifyOtpService } from '../services/verify-code';

import {
  clearVerificationCookies,
  COOKIE_KEYS,
  getCookie,
  setAuthCookies,
} from '@/utils/cookies';

export async function VerifyCodeAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  // -------------------------
  // VALIDATE INPUT
  // -------------------------
  const validated = VerifyOtpSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // -------------------------
  // SESSION CHECK
  // -------------------------
  const identifier = await getCookie('verify_identifier');
  const verificationToken = await getCookie(COOKIE_KEYS.VERIFICATION_TOKEN);

  const registrationMethod = await getCookie('registration_method');

  if (!identifier || !registrationMethod) {
    return {
      status: 'error',
      message: 'Verification session expired. Please register again.',
    };
  }

  console.log(
    'Verifying OTP for identifier:',
    identifier,
    'OTP:',
    validated.data.otp,
    'verificationToken:',
    verificationToken,
  );

  try {
    const result = await verifyOtpService({
      identifier,
      otp: validated.data.otp,
      verificationToken: verificationToken,
    });

    console.log('Verify OTP response:', result);

    const data = result?.data;

    // -------------------------
    // STRICT RESPONSE VALIDATION
    // -------------------------
    if (!data || !data.accessToken || !data.refreshToken || !data.user) {
      return {
        status: 'error',
        message: 'Invalid verification response. Please try again.',
      };
    }

    // -------------------------
    // STORE TOKENS
    // -------------------------
    await setAuthCookies(data.accessToken, data.refreshToken);

    // -------------------------
    // CLEANUP TEMP COOKIES
    // -------------------------
    await clearVerificationCookies();

    // -------------------------
    // ROUTING LOGIC (BACKEND-DRIVEN)
    // -------------------------
    let redirectTo = '/';

    if (data.user.role === 'CUSTOMER') {
      redirectTo = data.user.isNewUser
        ? '/user/delivery?newUser=true'
        : '/user/dashboard';
    }

    if (data.user.role === 'VENDOR') {
      // (future-proof if reused)
      redirectTo = '/vendor/store';
    }

    if (data.user.role === 'ADMIN') {
      redirectTo = '/admin/dashboard';
    }

    // -------------------------
    // SUCCESS RESPONSE
    // -------------------------
    return {
      status: 'success',
      message: 'Verification successful!',
      redirectTo,
    };
  } catch (error) {
    // -------------------------
    // GRACEFUL ERROR HANDLING
    // -------------------------
    if (error instanceof Error) {
      const msg = error.message.toLowerCase();

      if (msg.includes('expired')) {
        return {
          status: 'error',
          message: 'OTP expired. Please request a new one.',
        };
      }

      if (msg.includes('invalid')) {
        return {
          status: 'error',
          message: 'Incorrect OTP. Please try again.',
        };
      }

      return {
        status: 'error',
        message: error.message,
      };
    }

    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    };
  }
}
