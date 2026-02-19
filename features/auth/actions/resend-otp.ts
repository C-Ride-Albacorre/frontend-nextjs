'use server';

import { cookies } from 'next/headers';
import { resendOtpService } from '../services/resend-otp';

export type ResendOtpState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export async function resendOtpAction(): Promise<ResendOtpState> {
  const cookieStore = await cookies();
  const identifier = cookieStore.get('verify_identifier')?.value;

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