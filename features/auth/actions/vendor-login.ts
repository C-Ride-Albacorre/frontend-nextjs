'use server';

import { redirect } from 'next/navigation';
import {
  VendorLoginFormSchema,
  VendorLoginFormState,
} from '../libs/vendor-login.schema';
import { loginVendor } from '../services/vendor-login';
import { setAuthCookies, setVendorVerificationCookies } from '@/utils/cookies';

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

  const callbackUrl = formData.get('callbackUrl')?.toString() ?? '';

  const safeCallbackUrl =
    callbackUrl.startsWith('/') &&
    !callbackUrl.startsWith('/vendor/login') &&
    !callbackUrl.startsWith('/vendor/register')
      ? callbackUrl
      : null;

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

    if (!result.data) {
      return { status: 'error', message: 'Login failed.' };
    }

    const data = result.data;

    // -------------------------
    // UNVERIFIED — redirect to verification
    // -------------------------
    if (!data.success && data.status === 'UNVERIFIED') {
      await setVendorVerificationCookies({
        verificationToken: data.verificationToken,
        vendorPhoneNumber: data.phoneNumber,
        vendorEmail: data.email,
      });

      // Per API: start with phone if neither verified, email-only if just email pending
      if (!data.isPhoneVerified) {
        redirectTo = '/verify/vendor-phone';
      } else if (!data.isEmailVerified) {
        redirectTo = '/verify/vendor-email';
      } else {
        redirectTo = '/verify/vendor-phone';
      }

      // -------------------------
      // VERIFIED — check onboarding + status
      // -------------------------
    } else {
      const {
        accessToken,
        refreshToken,
        onboardingStatus,
        onboardingStep,
        status,
      } = data;

      await setAuthCookies(accessToken, refreshToken);

      if (status === 'UNDER_REVIEW') {
        // ✅ Return early — no redirect, show modal on login page
        return { status: 'under_review', email };
      } else if (onboardingStatus !== 'COMPLETED') {
        redirectTo =
          ONBOARDING_STEP_ROUTES[onboardingStep] || '/onboarding/business-info';
      } else {
        redirectTo = safeCallbackUrl ?? '/vendor/store';
      }
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
