'use client';

import { useState, useTransition } from 'react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { logoutAction } from '@/features/auth/actions/logout';
import ConfirmLogoutModal from './confirm-logout-modal';

export default function Logout() {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <>
      <Button
        onClick={() => setConfirmLogout(true)}
        variant="primary-black-outline"
        size="lg"
      >
        Logout from Account
      </Button>

      <ConfirmLogoutModal
        confirmLogout={confirmLogout}
        setConfirmLogout={setConfirmLogout}
        handleLogout={handleLogout}
        isPending={isPending}
      />
    </>
  );
}
