'use server';

import { redirect } from 'next/navigation';
import { StepState } from './schema';
import { BusinessInfoSchema } from './schema';
import { onboardingService } from './service';

export async function businessInfoAction(
  _state: StepState,
  formData: FormData,
): Promise<StepState> {
  const validated = BusinessInfoSchema.safeParse({
    businessName: formData.get('businessName'),
    businessType: formData.get('businessType'),
    businessDescription: formData.get('businessDescription')?.toString().trim(),
  });

  if (!validated.success) {
    return { status: 'error', errors: validated.error.flatten().fieldErrors };
  }

  try {
    await onboardingService(validated.data); // ✅ sends only this step's fields
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to save.',
    };
  }

  redirect('/onboarding/business-contact');
}
