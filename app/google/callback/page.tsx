'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function GoogleCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      router.replace(`/user/login?error=${encodeURIComponent(error)}`);
      return;
    }

    const success = searchParams.get('success');
    if (success !== 'true') {
      router.replace('/user/login?error=oauth_failed');
      return;
    }

    // Backend already set HttpOnly cookies on the redirect.
    // Fetch profile to get the role, cookies are sent automatically.
    fetch('/api/auth/google-callback', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((data) => {
        const role = data.role;
        if (role === 'VENDOR') router.replace('/vendor/store');
        else if (role === 'ADMIN' || role === 'SUPER_ADMIN')
          router.replace('/admin/dashboard');
        else if (role === 'DRIVER') router.replace('/driver/dashboard');
        else router.replace('/user/dashboard');
      })
      .catch(() => {
        router.replace('/user/login?error=oauth_failed');
      });
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="animate-pulse text-gray-500">Signing you in...</p>
    </div>
  );
}

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
