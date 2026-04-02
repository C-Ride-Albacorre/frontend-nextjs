'use client';
 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
 
export default function GoogleOAuthCallback() {
  const router = useRouter();
 
  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const success = params.get('success');
 
      if (success !== 'true') {
        router.replace('/vendor/login?error=oauth_failed');
        return;
      }
 
      try {
        const res = await fetch(
          'https://backend-service-1rc7.onrender.com/api/v1/auth/profile',
          {
            method: 'GET',
            credentials: 'include', 
          }
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