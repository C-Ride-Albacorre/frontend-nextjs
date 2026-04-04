'use client';

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

        if (!res.ok) throw new Error('Not authenticated');

        const user = await res.json();

        if (user.role === 'VENDOR') {
          router.replace('/vendor/store');
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
      <p className="text-muted-foreground text-sm">Signing you in...</p>
    </div>
  );
}
