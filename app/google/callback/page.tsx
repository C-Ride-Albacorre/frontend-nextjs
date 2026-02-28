'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// ✅ useSearchParams() lives in a CHILD component
function GoogleCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');

    if (error) {
      router.replace('/user/login?error=google_failed');
      return;
    }

    fetch('/api/auth/google-callback', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          router.replace('/user/login?error=google_failed');
          return;
        }
        const dest =
          data.role === 'VENDOR' ? '/vendor/store' : '/user/dashboard';
        router.replace(dest);
      })
      .catch(() => {
        router.replace('/user/login?error=google_failed');
      });
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
