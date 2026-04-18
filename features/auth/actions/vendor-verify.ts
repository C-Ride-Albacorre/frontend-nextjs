'use server';

import { getTokenExpiry } from '@/utils/jwt';
import { VerifyOtpSchema, VerifyOtpState } from '../libs/verify-code.schema';
import {
  verifyVendorEmailService,
  verifyVendorPhoneService,
} from '../services/vendor-verify';
import { getCookie, setCookie } from '@/utils/cookies';

type VendorUser = {
  status?: string;
  onboardingStatus?: string;
  onboardingStep?: string | null;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
};

// ✅ CENTRALIZED FLOW CONTROL (very important)
function resolveNextRoute(user: VendorUser): string | null {
  // 1. Email still needs verification
  if (!user.isEmailVerified && user.status === 'PENDING_EMAIL_VERIFICATION') {
    return '/verify/vendor-email';
  }

  // 2. Onboarding stage
  if (user.status === 'PENDING_ONBOARDING') {
    if (user.onboardingStatus === 'NOT_STARTED') {
      return '/onboarding/business-info';
    }

    if (user.onboardingStatus === 'IN_PROGRESS') {
      // Optional: map steps if backend provides onboardingStep
      switch (user.onboardingStep) {
        case 'CONTACT_INFO':
          return '/onboarding/contact-info';
        case 'ADDRESS_INFO':
          return '/onboarding/address-info';
        case 'BANK_INFO':
          return '/onboarding/bank-info';
        case 'DOCUMENT':
          return '/onboarding/business-document';
        default:
          return '/onboarding/business-info';
      }
    }

    // fallback
    return '/onboarding/business-info';
  }

  // 3. Fully onboarded
  if (user.status === 'ACTIVE') {
    return '/vendor/store';
  }

  // 4. Unknown state
  return null;
}

export async function VendorVerifyPhoneAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({ otp: formData.get('otp') });

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const phoneNumber = await getCookie('vendor_phone_number');

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
    });

    const user = res?.data?.user;

    console.log('Phone verification response:', res);

    if (!user?.isPhoneVerified) {
      return {
        status: 'error',
        message: 'Phone verification failed. Please try again.',
      };
    }

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
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes('expired')) {
        return {
          status: 'error',
          message: 'OTP expired. Please request a new one.',
        };
      }

      if (error.message.toLowerCase().includes('invalid')) {
        return {
          status: 'error',
          message: 'Incorrect OTP. Please try again.',
        };
      }

      return {
        status: 'error',
        message: error.message,
      };
    }

    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    };
  }
}

export async function VendorVerifyEmailAction(
  prevState: VerifyOtpState | null,
  formData: FormData,
): Promise<VerifyOtpState | null> {
  const validated = VerifyOtpSchema.safeParse({ otp: formData.get('otp') });

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const email = await getCookie('vendor_email');

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
    });

    const user = res?.data?.user;

    console.log('Email verification response:', res);

    // ✅ Always refresh accessToken after verification
    if (res?.data?.accessToken) {
      await setCookie({
        name: 'accessToken',
        value: res.data.accessToken,
        maxAge: getTokenExpiry(res.data.accessToken),
      });
    }

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
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes('expired')) {
        return {
          status: 'error',
          message: 'OTP expired. Please request a new one.',
        };
      }

      if (error.message.toLowerCase().includes('invalid')) {
        return {
          status: 'error',
          message: 'Incorrect OTP. Please try again.',
        };
      }

      return {
        status: 'error',
        message: error.message,
      };
    }

    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    };
  }
}
