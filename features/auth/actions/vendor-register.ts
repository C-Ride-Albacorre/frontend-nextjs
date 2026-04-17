'use server';

import { getTokenExpiry } from '@/utils/jwt';
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

    console.log('Vendor registration successful:', result.data);

    await setCookie({
      name: 'vendor_email',
      value: result.data.user.email,
      maxAge: 60 * 30,
    });

    await setCookie({
      name: 'vendor_phone_number',
      value: result.data.user.phoneNumber,
      maxAge: 60 * 30,
    });

    await setCookie({
      name: 'accessToken',
      value: result.data.accessToken,
      maxAge: getTokenExpiry(result.data.accessToken),
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
