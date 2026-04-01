'use client';

import { Button } from '@/components/ui/buttons/button';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';

export default function GoogleAuthButton() {
  const pathname = usePathname();

  function getRole() {
    if (pathname.includes('user')) return 'CUSTOMER';
    if (pathname.includes('vendor')) return 'VENDOR';

    if (pathname.includes('admin')) return 'ADMIN';

    if (pathname.includes('driver')) return 'DRIVER';

    return 'CUSTOMER'; 
  }

  function googleAuthHandler() {
    window.location.href = `https://backend-service-1rc7.onrender.com/api/v1/auth/google?role=${getRole()}`;
  }
  return (
    <>
      <Button
        variant="white"
        size="full"
        leftIcon={<Icon icon="logos:google-icon" width={18} height={18} />}
        onClick={googleAuthHandler}
      >
        Continue with Google
      </Button>
    </>
  );
}
