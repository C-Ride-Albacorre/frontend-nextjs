'use server';

import { redirect } from 'next/navigation';
import { LoginFormSchema, LoginFormState } from '../libs/user-login.schema';
import { LoginPayload, loginUser } from '../services/user-login';
import { setAuthCookies, setVerificationCookies } from '@/utils/cookies';

export async function userLoginAction(
  _state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const rawIdentifier = formData.get('identifier')?.toString().trim() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  // const countryCode = formData.get('countryCode')?.toString() ?? undefined;

  const callbackUrl = formData.get('callbackUrl')?.toString() ?? '';

  const safeCallback =
    callbackUrl &&
    callbackUrl.startsWith('/') &&
    !callbackUrl.startsWith('/user/login') &&
    !callbackUrl.startsWith('/user/register')
      ? callbackUrl
      : '/user/dashboard';

  const validated = LoginFormSchema.safeParse({
    identifier: rawIdentifier,
    // countryCode,
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
    ? { phoneNumber: rawIdentifier, password, 
     }
    : { email: rawIdentifier, password };

  let redirectTo: string | null = null;

  console.log(' Login payload:', payload);

  try {
    console.log(' Attempting to log in user with payload:', payload);

    const result = await loginUser(payload);

    if (!result.data) {
      return {
        status: 'error',
        message: 'Login failed.',
      };
    }

    console.log('Login API result:', result);

    if (!result.data.success && result.data.status === 'UNVERIFIED') {
      if (result.data.verificationToken) {
        await setVerificationCookies({
          verificationToken: result.data.verificationToken,
          verifyIdentifier: result.data.identifier,
          registrationMethod: result.data.verificationMethod,
        });
      }

      redirectTo = '/verify/user';
    } else if (result.data.success) {
      const { accessToken, refreshToken } = result.data;

      await setAuthCookies(accessToken, refreshToken);

      console.log('User login successful:', result);

      redirectTo = safeCallback;
    } else {
      return {
        status: 'error',
        message: result.data.message || 'Login failed.',
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
    };
  }

  if (redirectTo) redirect(redirectTo);
  return { status: 'success' };
}


