'use server';

import { redirect } from 'next/navigation';
import { RegisterFormSchema, FormState } from '../libs/register.schema';
import { registerUser } from '../services/user-register';
import { setCookie } from '@/utils/cookies';

export async function userRegisterAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = RegisterFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email') || undefined,
    phoneNumber: formData.get('phoneNumber') || undefined,
    password: formData.get('password'),
    referralCode: formData.get('referralCode')?.toString().trim() || undefined,
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let redirectTo: string | null = null;

  try {
    const result = await registerUser({ ...validatedFields.data });

    if (!result.data) {
      return {
        status: 'error',
        message: result.message ?? 'Registration failed.',
      };
    }

    const registrationMethod = result.data.registrationMethod.toLowerCase();

    if (
      result.data.requiresVerification &&
      result.data.verificationIdentifier
    ) {
      await setCookie({
        name: 'verify_identifier',
        value: result.data.verificationIdentifier,
        maxAge: 60 * 30,
      });

      await setCookie({
        name: 'registration_method',
        value: registrationMethod,
        maxAge: 60 * 30,
      });

      redirectTo = `/verify`;
    } else if (!result.data.requiresVerification) {
      redirectTo = '/user/dashboard';
    } else {
      return {
        status: 'error',
        message: 'Invalid registration state.',
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
