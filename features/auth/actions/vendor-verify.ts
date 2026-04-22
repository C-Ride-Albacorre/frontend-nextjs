'use server';

import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import {
  verifyVendorEmailService,
  verifyVendorPhoneService,
} from '../services/vendor-verify';
import {
  COOKIE_KEYS,
  getCookie,
  setAuthCookies,
  clearVerificationCookies,
} from '@/utils/cookies';

const VendorStatus = {
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  PENDING_EMAIL_VERIFICATION: 'PENDING_EMAIL_VERIFICATION',
  PENDING_PHONE_VERIFICATION: 'PENDING_PHONE_VERIFICATION',
  PENDING_ONBOARDING: 'PENDING_ONBOARDING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  ACTIVE: 'ACTIVE',
  APPROVED: 'APPROVED',
} as const;

const OnBoardingStatus = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

type VendorUser = {
  status?: string;
  onboardingStatus?: string;
  onboardingStep?: number | string | null;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
};

const ONBOARDING_STEP_ROUTES: Record<string, string> = {
  CONTACT_INFO: '/onboarding/contact-info',
  ADDRESS_INFO: '/onboarding/address-info',
  BANK_INFO: '/onboarding/bank-info',
  DOCUMENT: '/onboarding/business-document',
};

function resolveNextRoute(user: VendorUser): string | null {
  switch (user.status) {
    case VendorStatus.PENDING_VERIFICATION:
      return '/verify/vendor-phone';

    case VendorStatus.PENDING_PHONE_VERIFICATION:
      return '/verify/vendor-phone';

    case VendorStatus.PENDING_EMAIL_VERIFICATION:
      return '/verify/vendor-email';

    case VendorStatus.PENDING_ONBOARDING: {
      if (
        !user.onboardingStatus ||
        user.onboardingStatus === OnBoardingStatus.NOT_STARTED ||
        user.onboardingStep === 0
      ) {
        return '/onboarding/business-info';
      }

      if (user.onboardingStatus === OnBoardingStatus.IN_PROGRESS) {
        return (
          ONBOARDING_STEP_ROUTES[user.onboardingStep as string] ||
          '/onboarding/business-info'
        );
      }

      return '/onboarding/business-info';
    }

    case VendorStatus.UNDER_REVIEW:
      return null;

    case VendorStatus.APPROVED:
    case VendorStatus.ACTIVE:
      return '/vendor/store';

    default:
      return null;
  }
}

function handleVerificationError(error: unknown): VerifyOtpState {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();

    if (msg.includes('expired')) {
      return {
        status: 'error',
        message: 'OTP expired. Please request a new one.',
      };
    }
    if (msg.includes('invalid')) {
      return { status: 'error', message: 'Incorrect OTP. Please try again.' };
    }

    return { status: 'error', message: error.message };
  }

  return {
    status: 'error',
    message: 'Something went wrong. Please try again.',
  };
}

export async function VendorVerifyPhoneAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({ otp: formData.get('otp') });

  if (!validated.success) {
    return { status: 'error', errors: validated.error.flatten().fieldErrors };
  }

  const phoneNumber = await getCookie(COOKIE_KEYS.VENDOR_PHONE_NUMBER);
  const verificationToken = await getCookie(COOKIE_KEYS.VERIFICATION_TOKEN);

  if (!verificationToken) {
    return {
      status: 'error',
      message: 'Verification session expired. Please start again.',
    };
  }

  if (!phoneNumber) {
    return {
      status: 'error',
      message: 'Your verification session has expired. Please register again.',
    };
  }

  try {
    const res = await verifyVendorPhoneService({
      phoneNumber,
      otp: validated.data.otp,
      verificationToken,
    });

    const data = res?.data;
    const user = data?.user;

    console.log('Phone verification response:', res);

    if (!user?.isPhoneVerified) {
      return {
        status: 'error',
        message: 'Phone verification failed. Please try again.',
      };
    }

    if (data.accessToken && data.refreshToken && user.isEmailVerified) {
      await setAuthCookies(data.accessToken, data.refreshToken);
      // await clearVerificationCookies();
      const nextRoute = resolveNextRoute(user);

      if (!nextRoute) {
        return {
          status: 'error',
          message: 'Unexpected verification state. Please contact support.',
        };
      }

      return {
        status: 'success',
        message: 'Phone number verified successfully!',
        redirectTo: nextRoute,
      };
    }

    // ✅ Standard registration — no tokens yet, email still needs verification
    return {
      status: 'success',
      message: 'Phone number verified successfully!',
      redirectTo: '/verify/vendor-email',
    };
  } catch (error) {
    return handleVerificationError(error);
  }
}

export async function VendorVerifyEmailAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({ otp: formData.get('otp') });

  if (!validated.success) {
    return { status: 'error', errors: validated.error.flatten().fieldErrors };
  }

  // ✅ Read cookies inside the action
  const email = await getCookie(COOKIE_KEYS.VENDOR_EMAIL);
  const verificationToken = await getCookie(COOKIE_KEYS.VERIFICATION_TOKEN);

  if (!verificationToken) {
    return {
      status: 'error',
      message: 'Verification session expired. Please start again.',
    };
  }

  if (!email) {
    return {
      status: 'error',
      message: 'Your verification session has expired. Please register again.',
    };
  }

  try {
    const res = await verifyVendorEmailService({
      email,
      otp: validated.data.otp,
      verificationToken,
    });

    const data = res?.data;
    const user = data?.user;

    console.log('Email verification response:', res);

    if (!data || !data.accessToken || !data.refreshToken || !user) {
      return {
        status: 'error',
        message: 'Invalid verification response. Please try again.',
      };
    }

    // ✅ Email verification is the final step — set real auth cookies now
    await setAuthCookies(data.accessToken, data.refreshToken);

    // ✅ Clean up all verification cookies
    // await clearVerificationCookies();

    // ✅ Resolve next route — PENDING_ONBOARDING goes to onboarding, not dashboard
    const nextRoute = resolveNextRoute(user);

    if (!nextRoute) {
      return {
        status: 'error',
        message: 'Unexpected account state. Please contact support.',
      };
    }

    return {
      status: 'success',
      message: 'Email verified successfully!',
      redirectTo: nextRoute,
    };
  } catch (error) {
    return handleVerificationError(error);
  }
}
