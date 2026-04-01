'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleOAuthCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    if (success === 'true') {
      redirect('/user/dashboard');
    } else {
      redirect('/user/login?error=oauth_failed');
    }
  }, []);
  return <p>Redirecting...</p>;
}
