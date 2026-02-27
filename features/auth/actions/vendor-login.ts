'use server';

import { redirect } from 'next/navigation';
import {
  VendorLoginFormSchema,
  VendorLoginFormState,
} from '../libs/vendor-login.schema';
import { loginVendor } from '../services/vendor-login';
import { setAuthCookies, setCookie } from '@/utils/cookies';
import { ApiError } from '../../libs/api-error';

// Map onboarding step numbers to routes
const ONBOARDING_STEP_ROUTES: Record<number, string> = {
  1: '/onboarding/business-info',
  2: '/onboarding/business-contact',
  3: '/onboarding/business-address',
  4: '/onboarding/business-bank',
  5: '/onboarding/business-document',
};

export async function vendorLoginAction(
  _state: VendorLoginFormState,
  formData: FormData,
): Promise<VendorLoginFormState> {
  const email = formData.get('email')?.toString().trim() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  const validated = VendorLoginFormSchema.safeParse({ email, password });

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  let redirectTo: string | null = null;

  try {
    const result = await loginVendor({ email, password });
    const {
      accessToken,
      refreshToken,
      onboardingStatus,
      onboardingStep,
      status,
    } = result.data;

    // Set auth cookies
    await setAuthCookies(accessToken, refreshToken);

    // Determine redirect based on vendor status
    if (status === 'UNDER_REVIEW') {
      // Vendor is under review - show success modal on login page
      return { status: 'under_review', email };
    } else if (onboardingStatus !== 'COMPLETED') {
      // Onboarding not completed - redirect to current step
      redirectTo =
        ONBOARDING_STEP_ROUTES[onboardingStep] || '/onboarding/business-info';
    } else if (status === 'APPROVED') {
      // Onboarding complete and approved - go to vendor dashboard
      redirectTo = '/vendor/store';
    } else {
      // Default - go to vendor dashboard/store
      redirectTo = '/vendor/store';
    }
  } catch (error) {
    if (
      error instanceof ApiError &&
      error.statusCode === 403 &&
      error.reason === 'UNVERIFIED'
    ) {
      // Handle unverified vendor - phone verification comes first
      await setCookie({
        name: 'verify_identifier',
        value: email,
        maxAge: 60 * 30,
      });
      await setCookie({
        name: 'registration_method',
        value: 'email',
        maxAge: 60 * 30,
      });
      redirectTo = '/verify/vendor-phone';
    } else {
      return {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      };
    }
  }

  if (redirectTo) redirect(redirectTo);
  return { status: 'success' };
}
