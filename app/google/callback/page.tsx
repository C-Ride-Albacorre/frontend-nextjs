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

    const success = searchParams.get('success');
    log(`URL: ${window.location.href}`);
    log(`success param: ${success}`);
    log(`All search params: ${searchParams.toString()}`);

    if (success !== 'true') {
      log('No success=true, redirecting to login');
      router.replace('/user/login?error=oauth_failed');
      return;
    }

    const handleAuth = async () => {
      try {
        // === DEBUG: Log all visible cookies ===
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
          `accessToken from document.cookie: ${accessToken ? 'FOUND (' + accessToken.substring(0, 20) + '...)' : 'NOT FOUND'}`,
        );
        log(
          `refreshToken from document.cookie: ${refreshToken ? 'FOUND (' + refreshToken.substring(0, 20) + '...)' : 'NOT FOUND'}`,
        );

        // 1. If tokens visible in document.cookie, POST them
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

        // 2. Fall back to GET (httpOnly cookies on our domain)
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

        log('All methods failed — staying on page for debug visibility');
        // Don't redirect, show debug info instead
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
