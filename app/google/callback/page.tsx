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
    router.replace('/vendor/login?error=oauth_failed');
    return;
  }

  // ✅ Just go to vendor dashboard
  router.replace('/vendor/store');
}, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground text-sm">Signing you in...</p>
    </div>
  );
}