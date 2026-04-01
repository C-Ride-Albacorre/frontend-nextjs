'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function GoogleCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const log = (msg: string) => {
    console.log(`[GoogleCallback] ${msg}`);
    setDebugInfo((prev) => [...prev, msg]);
  };

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      log(`Error param found: ${error}`);
      router.replace(`/user/login?error=${encodeURIComponent(error)}`);
      return;
    }

    log(`URL: ${window.location.href}`);
    log(`All search params: ${searchParams.toString()}`);

    // Check for tokens in URL params first (backend should send these)
    const urlAccessToken = searchParams.get('accessToken');
    const urlRefreshToken = searchParams.get('refreshToken');
    const success = searchParams.get('success');

    log(
      `accessToken in URL: ${urlAccessToken ? 'FOUND (' + urlAccessToken.substring(0, 20) + '...)' : 'NOT FOUND'}`,
    );
    log(
      `refreshToken in URL: ${urlRefreshToken ? 'FOUND (' + urlRefreshToken.substring(0, 20) + '...)' : 'NOT FOUND'}`,
    );
    log(`success param: ${success}`);

    // Must have either tokens in URL or success=true
    if (!urlAccessToken && success !== 'true') {
      log('No tokens and no success=true — redirecting to login');
      router.replace('/user/login?error=oauth_failed');
      return;
    }

    const handleAuth = async () => {
      try {
        // === STEP 1: Tokens in URL params (preferred — cross-domain safe) ===
        if (urlAccessToken && urlRefreshToken) {
          log('Tokens found in URL — POSTing to API route...');
          // Clean tokens from URL for security
          window.history.replaceState({}, '', '/google/callback?success=true');

          const postRes = await fetch('/api/auth/google-callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              accessToken: urlAccessToken,
              refreshToken: urlRefreshToken,
            }),
          });
          log(`POST response status: ${postRes.status}`);
          if (postRes.ok) {
            const data = await postRes.json();
            log(`POST response data: ${JSON.stringify(data)}`);
            if (data.success) return redirectByRole(data.role);
          } else {
            const errText = await postRes.text();
            log(`POST error body: ${errText}`);
          }
        }

        // === STEP 2: Check document.cookie (non-httpOnly cookies on our domain) ===
        const rawCookies = document.cookie;
        log(`document.cookie (raw): "${rawCookies}"`);

        const cookies = rawCookies.split(';').reduce(
          (acc, c) => {
            const [key, ...val] = c.trim().split('=');
            if (key) acc[key] = val.join('=');
            return acc;
          },
          {} as Record<string, string>,
        );

        const cookieNames = Object.keys(cookies);
        log(`Visible cookie names: [${cookieNames.join(', ')}]`);

        const accessToken = cookies['accessToken'];
        const refreshToken = cookies['refreshToken'];

        log(
          `accessToken from document.cookie: ${accessToken ? 'FOUND' : 'NOT FOUND'}`,
        );
        log(
          `refreshToken from document.cookie: ${refreshToken ? 'FOUND' : 'NOT FOUND'}`,
        );

        if (accessToken && refreshToken) {
          log('Tokens found in document.cookie — POSTing to API route...');
          const postRes = await fetch('/api/auth/google-callback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken, refreshToken }),
          });
          log(`POST response status: ${postRes.status}`);
          if (postRes.ok) {
            const data = await postRes.json();
            log(`POST response data: ${JSON.stringify(data)}`);
            if (data.success) return redirectByRole(data.role);
          } else {
            const errText = await postRes.text();
            log(`POST error body: ${errText}`);
          }
        }

        // === STEP 3: GET (httpOnly cookies on our domain) ===
        log('Trying GET /api/auth/google-callback with credentials...');
        const getRes = await fetch('/api/auth/google-callback', {
          method: 'GET',
          credentials: 'include',
        });
        log(`GET response status: ${getRes.status}`);
        if (getRes.ok) {
          const data = await getRes.json();
          log(`GET response data: ${JSON.stringify(data)}`);
          if (data.success) return redirectByRole(data.role);
        } else {
          const errText = await getRes.text();
          log(`GET error body: ${errText}`);
        }

        log(
          '❌ All methods failed. Backend must include tokens in the redirect URL.',
        );
        log(
          'Tell backend to redirect to: https://c-ride.co/google/callback?accessToken=JWT&refreshToken=JWT',
        );
      } catch (err) {
        log(`Exception: ${String(err)}`);
      }
    };

    const redirectByRole = (role: string) => {
      log(`Redirecting by role: ${role}`);
      if (role === 'VENDOR') router.replace('/vendor/store');
      else if (role === 'ADMIN' || role === 'SUPER_ADMIN')
        router.replace('/admin/dashboard');
      else if (role === 'DRIVER') router.replace('/driver/dashboard');
      else router.replace('/user/dashboard');
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <p className="animate-pulse text-gray-500">Signing you in...</p>
      {debugInfo.length > 0 && (
        <div className="w-full max-w-2xl rounded-lg bg-gray-900 p-4 text-xs text-green-400 font-mono">
          <p className="mb-2 text-white font-bold">Debug Log:</p>
          {debugInfo.map((line, i) => (
            <p key={i} className="break-all">
              {line}
            </p>
          ))}
        </div>
      )}
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
