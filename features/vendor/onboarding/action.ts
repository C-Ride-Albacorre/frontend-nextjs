'use server';

import {
  BusinessAddressSchema,
  BusinessBankSchema,
  BusinessContactSchema,
  StepState,
} from './schema';
import { BusinessInfoSchema } from './schema';
import { onboardingService } from './service/onboarding';

export async function businessInfoAction(
  _state: StepState,
  formData: FormData,
): Promise<StepState> {
  const validatedFields = BusinessInfoSchema.safeParse({
    businessName: formData.get('businessName'),
    businessType: formData.get('businessType'),
    registrationNumber: formData.get('registrationNumber'),
    taxId: formData.get('taxId'),
    description: formData.get('description')?.toString().trim(),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await onboardingService(1, validatedFields.data);
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to save.',
    };
  }

  return {
    status: 'success',
    message: 'Business information saved successfully!',
  };
}

export async function businessContactAction(
  _state: StepState,
  formData: FormData,
): Promise<StepState> {
  const validatedFields = BusinessContactSchema.safeParse({
    businessEmail: formData.get('businessEmail'),
    businessPhone: formData.get('businessPhone'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await onboardingService(2, validatedFields.data);
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to save.',
    };
  }

  return {
    status: 'success',
    message: 'Business contact information saved successfully!',
  };
}

export async function businessAddressAction(
  _state: StepState,
  formData: FormData,
): Promise<StepState> {
  const validatedFields = BusinessAddressSchema.safeParse({
    address: formData.get('address'),
    city: formData.get('city'),
    state: formData.get('state'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await onboardingService(3, validatedFields.data);
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to save.',
    };
  }

  return {
    status: 'success',
    message: 'Business address information saved successfully!',
  };
}

export async function businessBankAction(
  _state: StepState,
  formData: FormData,
): Promise<StepState> {
  const validatedFields = BusinessBankSchema.safeParse({
    bankName: formData.get('bankName'),
    accountNumber: formData.get('accountNumber'),
    accountName: formData.get('accountName'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await onboardingService(4, validatedFields.data);
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to save.',
    };
  }

  return {
    status: 'success',
    message: 'Business bank information saved successfully!',
  };
}
