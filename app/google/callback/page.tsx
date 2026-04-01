'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function GoogleCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      console.error('[Google OAuth] Error param:', error);
      router.replace('/user/login?error=oauth_failed');
      return;
    }

    // Log all query params for debugging
    const allParams = Object.fromEntries(searchParams.entries());
    console.log('[Google OAuth] Callback params:', allParams);

    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const success = searchParams.get('success');

    function handleResult(data: { success: boolean; role?: string }) {
      if (!data.success) {
        router.replace('/user/login?error=oauth_failed');
        return;
      }
      const dest =
        data.role === 'VENDOR'
          ? '/vendor/store'
          : data.role === 'ADMIN' || data.role === 'SUPER_ADMIN'
            ? '/admin/dashboard'
            : '/user/dashboard';
      router.replace(dest);
    }

    function handleError() {
      router.replace('/user/login?error=oauth_failed');
    }

    if (accessToken && refreshToken) {
      // Backend included tokens in redirect URL — send to our API to set httpOnly cookies
      fetch('https://backend-service-1rc7.onrender.com/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, refreshToken }),
      })
        .then((res) => res.json())
        .then(handleResult)
        .catch(handleError);
    } else if (success === 'true') {
      // Backend set cookies on its domain — use our server-side API route (no CORS)
      fetch('https://backend-service-1rc7.onrender.com/api/v1/auth/google', {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then(handleResult)
        .catch(handleError);
    } else {
      console.error(
        '[Google OAuth] No tokens or success param — redirecting to login',
      );
      router.replace('/user/login?error=oauth_failed');
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="animate-pulse text-gray-500">Signing you in...</p>
    </div>
  );
}

// ✅ Page wraps the handler in Suspense
export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="animate-pulse text-gray-500">Loading...</p>
        </div>
      }
    >
      <GoogleCallbackHandler />
    </Suspense>
  );
}
