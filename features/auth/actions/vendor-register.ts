'use server';

import { FormState, VendorRegisterFormSchema } from '../libs/register.schema';
import { registerVendorService } from '../services/vendor-register';
import { setVendorVerificationCookies } from '@/utils/cookies';

export async function vendorRegisterAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = VendorRegisterFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    countryCode: formData.get('countryCode') || undefined,
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

    if (result.status === 'success' && result.data.verificationToken) {
      await setVendorVerificationCookies({
        verificationToken: result.data.verificationToken,
        vendorPhoneNumber: result.data.user.phoneNumber,
        vendorEmail: result.data.user.email,
      });
    }

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
