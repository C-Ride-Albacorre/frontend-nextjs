'use server';

import { FormState, VendorRegisterFormSchema } from '../libs/register.schema';
import { registerVendorService } from '../services/vendor-register';
import { setCookie } from '@/utils/cookies';

export async function vendorRegisterAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = VendorRegisterFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    password: formData.get('password'),
    referralCode: formData.get('referralCode') || undefined,
  });

  if (!validatedFields.success) {
    return {
      status: 'error' as const,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const payload = { ...validatedFields.data };

  try {
    const result = await registerVendorService(payload);

    if (!result.data) {
      return {
        status: 'error' as const,
        message: result.message ?? 'Something went wrong. Please try again.',
      };
    }

    await setCookie({
      name: 'vendorEmail',
      value: result.data.vendor.email,
      maxAge: 60 * 30,
    });

    await setCookie({
      name: 'vendorPhoneNumber',
      value: result.data.vendor.phoneNumber,
      maxAge: 60 * 30,
    });

    return {
      status: 'success' as const,
      data: {
        nextSteps: result.data.nextSteps ?? [],
      },
    };
  } catch (error) {
    return {
      status: 'error' as const,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
    };
  }
}
