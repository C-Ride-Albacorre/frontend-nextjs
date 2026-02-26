'use server';

import {
  BusinessAddressSchema,
  BusinessBankSchema,
  BusinessContactSchema,
  StepState,
} from './schema';
import { BusinessInfoSchema } from './schema';
import { onboardingService } from './service';

export async function businessInfoAction(
  _state: StepState,
  formData: FormData,
): Promise<StepState> {
  const validatedFields = BusinessInfoSchema.safeParse({
    businessName: formData.get('businessName'),
    businessType: formData.get('businessType'),
    businessRegistrationNo: formData.get('businessRegistrationNo'),
    tinNo: formData.get('tinNo'),
    businessDescription: formData.get('businessDescription')?.toString().trim(),
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
    businessAddress: formData.get('businessAddress'),
    businessCity: formData.get('businessCity'),
    businessState: formData.get('businessState'),
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
    businessBankName: formData.get('businessBankName'),
    businessAccountNumber: formData.get('businessAccountNumber'),
    businessAccountName: formData.get('businessAccountName'),
  });

  if(!validatedFields.success) {
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
