'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'VENDOR' | 'CUSTOMER';

function getDestinationByRole(role: Role): string {
  if (role === 'VENDOR') return '/vendor/store';
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') return '/admin/dashboard';
  return '/user/dashboard';
}

export default function GoogleOAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');

    if (success !== 'true') {
      router.replace('/user/login?error=oauth_failed');
      return;
    }

    // Cookies are httpOnly so we can't read them directly.
    // Ask the backend who the current user is, or hit a lightweight
    // /auth/me endpoint that returns the role.
    // Alternatively, the backend can pass role as a query param on redirect:
    // /google/callback?success=true&role=VENDOR
    const role = params.get('role') as Role | null;

    if (role) {
      router.replace(getDestinationByRole(role));
    } else {
      // Fallback: if no role param, go fetch it
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/callback`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          const userRole: Role = data?.data?.role ?? 'CUSTOMER';
          router.replace(getDestinationByRole(userRole));
        })
        .catch(() => {
          router.replace('/user/login?error=oauth_failed');
        });
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground text-sm">Signing you in...</p>
    </div>
  );
}