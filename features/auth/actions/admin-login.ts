'use server';

import { redirect } from 'next/navigation';

import {
  AdminLoginFormSchema,
  AdminLoginFormState,
} from '../libs/admin-login.schema';
import { adminLoginService } from '../services/admin-login';
import { setAuthCookies } from '@/utils/cookies';

export async function adminLoginAction(
  _state: AdminLoginFormState,
  formData: FormData,
): Promise<AdminLoginFormState> {
  const validatedFields = AdminLoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      fields: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
    };
  }

  const payload = validatedFields.data;

  let redirectTo: string | null = null;

  try {
    const result = await adminLoginService(payload);

    const accessToken = result.data.accessToken;
    const refreshToken = result.data.refreshToken;

    await setAuthCookies(accessToken, refreshToken);

    redirectTo = '/admin/dashboard';
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      fields: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
    };
  }

  if (redirectTo) {
    redirect(redirectTo);
  }

  return {
    status: 'success',
  };
}
