'use server';

import { resendOtpService } from '../services/resend-otp';
import { getCookie } from '@/utils/cookies';

export type ResendOtpState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export async function resendOtpAction(
  type: 'user' | 'vendor-email' | 'vendor-phone',
): Promise<ResendOtpState> {
  const cookieMap = {
    user: 'verify_identifier',
    'vendor-email': 'vendor_email',
    'vendor-phone': 'vendor_phone_number',
  };

  const identifier =
    (await getCookie(cookieMap[type]));

  if (!identifier) {
    return {
      status: 'error',
      message: 'Verification session expired. Please register again.',
    };
  }

  try {
    await resendOtpService({ identifier });
    return { status: 'success', message: 'A new code has been sent.' };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to resend code.',
    };
  }
}
