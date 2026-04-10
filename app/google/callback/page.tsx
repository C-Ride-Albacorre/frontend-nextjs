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

      if (success !== 'true' || !accessToken || !refreshToken) {
        router.replace('/vendor/login?error=oauth_failed');
        return;
      }

      // Clear tokens from URL immediately to reduce exposure
      window.history.replaceState({}, '', '/google/callback');

      try {
        // Send tokens to server-side API route to set httpOnly cookies
        const cookieRes = await fetch('/api/auth/google-callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken, refreshToken }),
        });

        if (!cookieRes.ok) throw new Error('Failed to set session');

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        console.log('Profile response:', res);

        if (!res.ok) throw new Error('Not authenticated');

        const user = await res.json();

        if (user.role === 'VENDOR') {
          // Use params from Google callback
          if (isPhoneVerified === 'false') {
            window.location.href = '/vendor/add-google-phone';
            return;
          }
          // If phone is verified, check onboarding status
          if (isPhoneVerified === 'true') {
            if (onboardingStatus !== 'completed' && onBoardingStep) {
              // Save onboarding step and status in cookies
              document.cookie = `onboardingStatus=${encodeURIComponent(onboardingStatus || '')}; path=/;`;
              document.cookie = `onBoardingStep=${encodeURIComponent(onBoardingStep)}; path=/;`;
              // Map onboardingStep to correct route (fix TS error)
              const stepNum = Number(onBoardingStep);
              const stepRoutes: Record<number, string> = {
                1: '/onboarding/business-info',
                2: '/onboarding/business-contact',
                3: '/onboarding/business-address',
                4: '/onboarding/business-bank',
                5: '/onboarding/business-document',
              };
              const redirectPath = Object.prototype.hasOwnProperty.call(
                stepRoutes,
                stepNum,
              )
                ? stepRoutes[stepNum]
                : '/onboarding/business-info';
              window.location.href = redirectPath;
              return;
            }
            // If onboarding is completed or no step, go to vendor store
            window.location.href = '/vendor/store';
            return;
          }
        } else if (user.role === 'ADMIN') {
          router.replace('/admin/dashboard');
        } else {
          router.replace('/user/dashboard');
        }
      } catch (error) {
        console.error(error);
        router.replace('/vendor/login?error=session_failed');
      }
    };

    run();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-muted-foreground text-sm space-x-2 flex items-center">
        <Loader2 className="animate-spin" /> <p>Signing you in...</p>
      </div>
    </div>
  );
}
