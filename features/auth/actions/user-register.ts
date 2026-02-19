'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { RegisterFormSchema, FormState } from '../libs/register.schema';
import { registerUser } from '../services/user-register';

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

  const { password, email, ...rest } = validatedFields.data;
  const method = email ? 'email' : 'phone';

  let redirectTo: string | null = null;

  try {
    const result = await registerUser({ ...rest, email, password });

    if (!result.success) {
      return {
        status: 'error',
        message: result.message ?? 'Registration failed.',
      };
    }

    if (result.requiresVerification && !result.user.isVerified) {
      const cookieStore = await cookies();
      cookieStore.set('verify_identifier', result.verificationIdentifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 10,
      });

      redirectTo = `/verify?method=${method}`;
    } else {
      redirectTo = '/dashboard';
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
