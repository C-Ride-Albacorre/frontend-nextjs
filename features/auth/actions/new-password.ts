'use server';

import { redirect } from 'next/navigation';
import { ResetPasswordSchema, ResetPasswordState } from '../libs/reset.schema';
import { newPasswordService } from '../services/new-password';

export async function newPasswordAction(
  _state: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const token = formData.get('token')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const confirmPassword = formData.get('confirmPassword')?.toString() ?? '';

  if (!token) {
    return { status: 'error', message: 'Reset token is missing.' };
  }

  const validated = ResetPasswordSchema.safeParse({
    password,
    confirmPassword,
  });

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await newPasswordService({ token, newPassword: validated.data.password });
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Failed to reset password. Please try again.',
    };
  }

  redirect('/user/login?reset=success');
}
