// features/auth/actions/admin-login.ts
'use server';

import { redirect } from 'next/navigation';
import {
  AdminLoginFormSchema,
  AdminLoginFormState,
} from '../libs/admin-login.schema';
import { adminLoginService } from '../services/admin-login';
import { setVerificationCookies } from '@/utils/cookies';

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

    if (!result.data) {
      return {
        status: 'error',
        message: result.message ?? 'Login failed.',
        fields: { email: validatedFields.data.email },
      };
    }

    if (
      result.data.status === 'OTP_REQUIRED' &&
      result.data.requiresVerification
    ) {
      // ✅ Error explicitly if token is missing — don't silently skip
      if (!result.data.verificationToken) {
        return {
          status: 'error',
          message: 'Login failed. Please try again.',
          fields: { email: validatedFields.data.email },
        };
      }

      await setVerificationCookies({
        verificationToken: result.data.verificationToken,
        verifyIdentifier: result.data.verificationIdentifier,
        registrationMethod: result.data.verificationMethod,
      });

      redirectTo = '/verify/admin';
    } else {
      return {
        status: 'error',
        message: 'Unexpected login response.',
        fields: { email: validatedFields.data.email },
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      fields: { email: validatedFields.data.email },
    };
  }

  if (redirectTo) redirect(redirectTo);

  // Fallback — should never reach here
  return {
    status: 'error',
    message: 'Unexpected login state.',
    fields: { email: validatedFields.data.email },
  };
}
