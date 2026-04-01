'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function GoogleCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      router.replace('/user/login?error=oauth_failed');
      return;
    }

    const success = searchParams.get('success');
    if (success !== 'true') {
      router.replace('/user/login?error=oauth_failed');
      return;
    }

    // Try to find tokens — check document.cookie (if non-httpOnly) then fall back to GET
    const handleAuth = async () => {
      try {
        // 1. Try reading tokens from document.cookie (non-httpOnly cookies on our domain)
        const cookies = document.cookie.split(';').reduce(
          (acc, c) => {
            const [key, ...val] = c.trim().split('=');
            if (key) acc[key] = val.join('=');
            return acc;
          },
          {} as Record<string, string>,
        );

        const accessToken = cookies['accessToken'];
        const refreshToken = cookies['refreshToken'];

        if (accessToken && refreshToken) {
          // POST tokens to our API route so it can set httpOnly cookies
          const postRes = await fetch('/api/auth/google-callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken, refreshToken }),
          });
          if (postRes.ok) {
            const data = await postRes.json();
            if (data.success) return redirectByRole(data.role);
          }
        }

        // 2. Fall back to GET (cookies might be httpOnly on our domain)
        const getRes = await fetch('/api/auth/google-callback', {
          method: 'GET',
          credentials: 'include',
        });
        if (getRes.ok) {
          const data = await getRes.json();
          if (data.success) return redirectByRole(data.role);
        }

        throw new Error('Auth failed');
      } catch {
        router.replace('/user/login?error=oauth_failed');
      }
    };

    const redirectByRole = (role: string) => {
      if (role === 'VENDOR') router.replace('/vendor/store');
      else if (role === 'ADMIN' || role === 'SUPER_ADMIN')
        router.replace('/admin/dashboard');
      else if (role === 'DRIVER') router.replace('/driver/dashboard');
      else router.replace('/user/dashboard');
    };

    handleAuth();
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
