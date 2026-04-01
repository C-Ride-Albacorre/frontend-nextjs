'use client';

import { Button } from '@/components/ui/buttons/button';
import { BASE_URL } from '@/config/api';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';

export default function GoogleAuthButton() {
  const pathname = usePathname();

  function getRole() {
    if (pathname.includes('vendor')) return 'VENDOR';
    if (pathname.includes('admin')) return 'ADMIN';
    if (pathname.includes('driver')) return 'DRIVER';
    return 'CUSTOMER';
  }

  function googleAuthHandler() {
    const role = getRole();

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${baseUrl}/api/v1/auth/google/${role}`;
  }

  return (
    <Button
      variant="white"
      size="full"
      leftIcon={<Icon icon="logos:google-icon" width={18} height={18} />}
      onClick={googleAuthHandler}
    >
      Continue with Google
    </Button>
  );
}