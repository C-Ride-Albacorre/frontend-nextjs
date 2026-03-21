'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import SessionExpiredModal from '@/components/layout/session-expired-modal';

const CHECK_INTERVAL = 60_000; // 60 seconds

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sessionExpired, setSessionExpired] = useState(false);
  const expiredPathRef = useRef(pathname);

  useEffect(() => {
    // Always keep the ref in sync with the latest pathname
    if (!sessionExpired) {
      expiredPathRef.current = pathname;
    }
  }, [pathname, sessionExpired]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    async function checkSession() {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();

        if (!data.authenticated) {
          setSessionExpired(true);
        }
      } catch {
        // Network error — don't show modal for transient failures
      }
    }

    function handleVisibility() {
      if (document.visibilityState === 'visible') {
        checkSession();
      }
    }

    function handleFocus() {
      checkSession();
    }

    // Start periodic check
    intervalId = setInterval(checkSession, CHECK_INTERVAL);

    // Check on tab focus / visibility
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <>
      {children}
      <SessionExpiredModal
        isOpen={sessionExpired}
        redirectPath={expiredPathRef.current}
      />
    </>
  );
}
