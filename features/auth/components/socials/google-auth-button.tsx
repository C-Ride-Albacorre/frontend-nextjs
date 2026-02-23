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

    return 'CUSTOMER'; // default to customer if role cannot be determined
  }

  function googleAuthHandler() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google?role=${getRole()}`;
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
