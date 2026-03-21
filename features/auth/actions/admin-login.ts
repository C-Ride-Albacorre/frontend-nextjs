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
      },
    };
  }

  let redirectTo: string | null = null;

  try {
    const result = await adminLoginService(validatedFields.data);

    const accessToken = result.data.accessToken;
    const refreshToken = result.data.refreshToken;

    await setAuthCookies(accessToken, refreshToken ?? accessToken);

    const customRedirect = formData.get('redirect') as string;
    redirectTo =
      customRedirect && customRedirect.startsWith('/')
        ? customRedirect
        : '/admin/dashboard';
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      fields: {
        email: formData.get('email') as string,
      },
    };
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}
