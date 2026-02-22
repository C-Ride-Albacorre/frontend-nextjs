'use server';

import { redirect } from 'next/navigation';

import { resetPasswordService } from '../services/reset';
import { setCookie } from '@/utils/cookies';
import { ResetRequestSchema } from '../libs/reset.schema';

export type ResetPasswordState =
  | undefined
  | { status: 'error'; errors?: { identifier?: string[] }; message?: string }
  | { status: 'success' };

export async function resetPasswordAction(
  _state: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const rawIdentifier = formData.get('identifier')?.toString().trim() ?? '';

  const validatedData = ResetRequestSchema.safeParse({
    identifier: rawIdentifier,
  });

  if (!validatedData.success) {
    return {
      status: 'error',
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const isPhone = /^\+?\d{7,}$/.test(rawIdentifier);

  const payload = isPhone
    ? { phoneNumber: rawIdentifier }
    : { email: rawIdentifier };

  let redirectTo: string | null = null;

  try {
    const result = await resetPasswordService(payload);

    await setCookie({
      name: 'reset_identifier',
      value: result.data?.identifier,
      maxAge: 60 * 30,
    });
    await setCookie({
      name: 'reset_method',
      value: result.data?.method,
      maxAge: 60 * 30,
    });

    redirectTo = `/reset/verify`;
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Password reset failed. Please try again.',
    };
  }

  if (redirectTo) redirect(redirectTo);
  return { status: 'success' };
}
