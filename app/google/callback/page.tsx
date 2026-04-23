'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleOAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);

      const success = params.get('success');

      const normalize = (v: string | null) =>
        !v || v === 'undefined' ? null : v;

      const accessToken = normalize(params.get('accessToken'));
      const refreshToken = normalize(params.get('refreshToken'));
      const verificationToken = normalize(params.get('verificationToken'));

      const isPhoneVerifiedRaw = params.get('isPhoneVerified');
      const onboardingStatus = params.get('onboardingStatus');
      const onboardingStep = params.get('onboardingStep');

      // -------------------------
      // HANDLE BACKEND ERROR PARAMS
      // -------------------------
      const errorParam = params.get('error');
      const messageParam = params.get('message');

      const isPhoneVerified = isPhoneVerifiedRaw === 'true';

      console.log('[OAuth] Params received:', {
        success,
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        hasVerificationToken: !!verificationToken,
        isPhoneVerified,
        onboardingStatus,
        onboardingStep,
        errorParam,
        messageParam,
      });

      // -------------------------
      // 1. INVALID REQUEST (hard fail)
      // -------------------------
      if (success !== 'true') {
        // -------------------------
        // ROLE CONFLICT — account exists with different role
        // -------------------------
        if (messageParam?.toLowerCase().includes('different role')) {
          router.replace(
            `/user/login?error=role_conflict&message=${encodeURIComponent(
              'This email is already registered with a different account type. Please sign in with the correct portal.',
            )}`,
          );
          return;
        }

        router.replace('/vendor/login?error=oauth_failed');
        return;
      }

      // -------------------------
      // 2. PHONE VERIFICATION FLOW
      // -------------------------
      if (!accessToken && verificationToken) {
        try {
          const cookieRes = await fetch('/api/auth/google-callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verificationToken }),
          });

          if (!cookieRes.ok)
            throw new Error('Failed to set verification session');
        } catch (error) {
          console.error('[OAuth] Failed to save verificationToken:', error);
          router.replace('/vendor/login?error=session_failed');
          return;
        }

        router.replace('/verify/add-google-phone');
        return;
      }

      // -------------------------
      // 3. INVALID AUTH STATE
      // -------------------------
      if (!accessToken || !refreshToken) {
        router.replace('/vendor/login?error=oauth_failed');
        return;
      }

      // -------------------------
      // 4. CLEAN URL
      // -------------------------
      window.history.replaceState({}, '', '/google/callback');

      try {
        const cookieRes = await fetch('/api/auth/google-callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken,
            refreshToken,
            verificationToken,
          }),
        });

        if (!cookieRes.ok) throw new Error('Failed to set session');

        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const role = payload.role;

        console.log('[OAuth] role:', role);

        // -------------------------
        // CUSTOMER
        // -------------------------
        if (role === 'CUSTOMER') {
          router.replace('/user/delivery');
          return;
        }

        // -------------------------
        // ADMIN
        // -------------------------
        if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
          router.replace('/admin/dashboard');
          return;
        }

        // -------------------------
        // VENDOR FLOW
        // -------------------------
        if (role === 'VENDOR') {
          // 1. PHONE NOT VERIFIED
          if (!isPhoneVerified) {
            router.replace('/verify/add-google-phone');
            return;
          }

          // 2. ONBOARDING NOT COMPLETED
          const onboardingDone =
            onboardingStatus === 'COMPLETED' ||
            onboardingStatus === 'completed' ||
            onboardingStatus === 'true';

          if (!onboardingDone) {
            const stepRoutes: Record<number, string> = {
              1: '/onboarding/business-info',
              2: '/onboarding/business-contact',
              3: '/onboarding/business-address',
              4: '/onboarding/business-bank',
              5: '/onboarding/business-document',
            };

            const step = Number(onboardingStep);
            router.replace(stepRoutes[step] ?? '/onboarding/business-info');
            return;
          }

          // 3. FULLY READY VENDOR
          router.replace('/vendor/store');
          return;
        }

        // fallback
        router.replace('/user/login');
      } catch (error) {
        console.error('[OAuth] error:', error);
        router.replace('/vendor/login?error=session_failed');
      }
    };

    run();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground text-primary">
        <Loader2 className="animate-spin text-primary" />
        Signing you in...
      </div>
    </div>
  );
}
