'use client';

import { useState, useTransition } from 'react';
import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { logoutAction } from '@/features/user/profile/action/logout';

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

      <Modal
        isModalOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
      >
        <div className="flex flex-col justify-center items-center space-y-6">
          <div className="flex flex-col justify-center items-center space-y-4">
            <h4 className="text-lg font-medium">
              Are you sure you want to logout?
            </h4>
            <p className="text-neutral-500 text-sm">
              You will need to login again to access your account and
              deliveries.
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              variant="green"
              onClick={() => setConfirmLogout(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="red"
              onClick={handleLogout}
              loading={isPending}
              disabled={isPending}
            >
              {isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
