'use server';

import { redirect } from 'next/navigation';
import {
  AdminLoginFormSchema,
  AdminLoginFormState,
} from '../libs/admin-login.schema';
import { adminLoginService } from '../services/admin-login';
import { setAuthCookies, setCookie } from '@/utils/cookies';

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

    // Handle OTP_REQUIRED response
    if (
      'status' in result.data &&
      result.data.status === 'OTP_REQUIRED' &&
      result.data.requiresVerification &&
      result.data.verificationIdentifier
    ) {
      // Some OTP_REQUIRED responses may include accessToken
      const otpData = result.data as typeof result.data & {
        accessToken?: string;
      };
      if (otpData.accessToken) {
        await setCookie({
          name: 'accessToken',
          value: otpData.accessToken,
          maxAge: 60 * 60, 
        });
      }
      await setCookie({
        name: 'verify_identifier',
        value: result.data.verificationIdentifier,
        maxAge: 60 * 30,
      });
      await setCookie({
        name: 'registration_method',
        value: 'email',
        maxAge: 60 * 30,
      });

      redirectTo = '/verify/admin';
    } else if ('user' in result.data) {
      const accessToken = result.data.accessToken;
      const refreshToken = result.data.refreshToken;

      await setAuthCookies(accessToken, refreshToken ?? accessToken);

      // Check isNewUser flag
      if (result.data.user?.isNewUser) {
        await setCookie({
          name: 'verify_identifier',
          value: result.data.user.email,
          maxAge: 60 * 30,
        });
        await setCookie({
          name: 'registration_method',
          value: 'email',
          maxAge: 60 * 30,
        });
        redirectTo = '/verify/admin';
      } else {
        const customRedirect = formData.get('redirect') as string;
        redirectTo =
          customRedirect && customRedirect.startsWith('/')
            ? customRedirect
            : '/admin/dashboard';
      }
    } else {
      // Unexpected response
      return {
        status: 'error',
        message: 'Unexpected login response.',
        fields: {
          email: formData.get('email') as string,
        },
      };
    }
  } catch (error: any) {
    // Handle unverified admin
    if (error?.statusCode === 403 && error?.reason === 'UNVERIFIED') {
      await setCookie({
        name: 'verify_identifier',
        value: formData.get('email') as string,
        maxAge: 60 * 30,
      });
      await setCookie({
        name: 'registration_method',
        value: 'email',
        maxAge: 60 * 30,
      });
      redirectTo = '/verify/admin';
    } else {
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
  }

  if (redirectTo) {
    redirect(redirectTo);
  }
}
