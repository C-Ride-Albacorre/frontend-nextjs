'use server';

import { redirect } from 'next/navigation';
import { LoginFormSchema, LoginFormState } from '../libs/user-login.schema';
import { LoginPayload, loginUser } from '../services/user-login';
import { setAuthCookies } from '@/utils/cookies'; // reuse the helper we created

export async function userLoginAction(
  _state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const rawIdentifier = formData.get('identifier')?.toString().trim() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const callbackUrl =
    formData.get('callbackUrl')?.toString() ?? '/user/dashboard';

  const validated = LoginFormSchema.safeParse({
    identifier: rawIdentifier,
    password,
  });

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const isPhone = /^\+?\d{7,}$/.test(rawIdentifier);

  // ✅ Send as separate fields matching your API contract
  const payload: LoginPayload = isPhone
    ? { phoneNumber: rawIdentifier, password }
    : { email: rawIdentifier, password };

  const safeCallback = callbackUrl.startsWith('/')
    ? callbackUrl
    : '/user/dashboard';

  let redirectTo: string | null = null;

  try {
    const result = await loginUser(payload);
    const { accessToken, refreshToken } = result.data;

    await setAuthCookies(accessToken, refreshToken);

    redirectTo = safeCallback;
  } catch (error: any) {
    // Account exists but not verified yet
    if (error?.statusCode === 403 && error?.reason === 'UNVERIFIED') {
      redirectTo = `/verify?method=${isPhone ? 'phone' : 'email'}`;
    } else {
      return {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      };
    }
  }

  if (redirectTo) redirect(redirectTo);
  return { status: 'success' };
}
