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
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');
      const isPhoneVerified = params.get('isPhoneVerified');
      const onboardingStatus = params.get('onboardingStatus');
      const onBoardingStep = params.get('onboardingStep');

      console.log('[OAuth] Params received:', {
        success,
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        isPhoneVerified,
        onboardingStatus,
        onBoardingStep,
      });

      if (success !== 'true' || !accessToken || !refreshToken) {
        console.error('[OAuth] Missing required params — redirecting to login');
        router.replace('/vendor/login?error=oauth_failed');
        return;
      }

      // Clear tokens from URL immediately to reduce exposure
      window.history.replaceState({}, '', '/google/callback');

      try {
        // Step 1: Set httpOnly cookies via Next.js API route
        console.log(
          '[OAuth] Step 1: Setting cookies via /api/auth/google-callback...',
        );

        const cookieRes = await fetch('/api/auth/google-callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken, refreshToken }),
        });

        console.log('[OAuth] Cookie set response:', {
          status: cookieRes.status,
          ok: cookieRes.ok,
        });

        if (!cookieRes.ok) throw new Error('Failed to set session');

        // Step 2: Decode role directly from the accessToken in URL params.
        // Do NOT call /auth/profile — cookies are httpOnly on the Next.js domain,
        // so the backend (on a different domain) can't see them → always 401.
        console.log('[OAuth] Step 2: Decoding role from accessToken...');

        let role: string | null = null;
        try {
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          role = payload.role ?? null;
          console.log('[OAuth] Decoded JWT payload:', payload);
        } catch (e) {
          console.error('[OAuth] Failed to decode accessToken:', e);
          throw new Error('Invalid access token');
        }

        console.log('[OAuth] Resolved values:', {
          role,
          isPhoneVerified,
          onboardingStatus,
          onBoardingStep,
        });

        // Step 3: Route based on role + vendor state
        if (role === 'VENDOR') {
          if (isPhoneVerified === 'false') {
            console.log(
              '[OAuth] → Phone not verified, redirecting to /add-google-phone',
            );
            window.location.href = '/add-google-phone';
            return;
          }

          if (isPhoneVerified === 'true') {
            if (
              onboardingStatus !== 'completed' &&
              onBoardingStep &&
              onBoardingStep !== 'null'
            ) {
              document.cookie = `onboardingStatus=${encodeURIComponent(onboardingStatus || '')}; path=/;`;
              document.cookie = `onBoardingStep=${encodeURIComponent(onBoardingStep)}; path=/;`;

              const stepNum = Number(onBoardingStep);
              const stepRoutes: Record<number, string> = {
                1: '/onboarding/business-info',
                2: '/onboarding/business-contact',
                3: '/onboarding/business-address',
                4: '/onboarding/business-bank',
                5: '/onboarding/business-document',
              };
              const redirectPath =
                stepRoutes[stepNum] ?? '/onboarding/business-info';
              console.log(
                '[OAuth] → Onboarding incomplete, redirecting to:',
                redirectPath,
              );
              window.location.href = redirectPath;
              return;
            }

            console.log(
              '[OAuth] → Onboarding complete, redirecting to /vendor/store',
            );
            window.location.href = '/vendor/store';
            return;
          }

          // isPhoneVerified is neither 'true' nor 'false' (e.g. null) — safe fallback
          console.warn(
            '[OAuth] isPhoneVerified was unexpected value:',
            isPhoneVerified,
            '— falling back to /add-google-phone',
          );
          window.location.href = '/add-google-phone';
          return;
        } else if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
          console.log('[OAuth] → Admin user, redirecting to /admin/dashboard');
          window.location.href = '/admin/dashboard';
        } else {
          console.log(
            '[OAuth] → Customer user, redirecting to /user/dashboard',
          );
          window.location.href = '/user/dashboard';
        }
      } catch (error) {
        console.error('[OAuth] Fatal error during callback:', error);
        router.replace('/vendor/login?error=session_failed');
      }
    };

    run();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-muted-foreground text-sm space-x-2 flex items-center">
        <Loader2 className="animate-spin text-primary" />
        <p>Signing you in...</p>
      </div>
    </div>
  );
}
