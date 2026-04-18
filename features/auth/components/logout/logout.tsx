'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/buttons/button';
import { logoutAction } from '@/features/auth/actions/logout';
import ConfirmLogoutModal from './confirm-logout-modal';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function Logout({ onClose }: { onClose?: () => void }) {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pathName = usePathname();

  // function getLoginPath() {
  //   if (pathName.startsWith('/admin')) return '/admin/login';
  //   if (pathName.startsWith('/vendor')) return '/vendor/login';
  //   return '/user/login';
  // }

function handleLogout() {
  startTransition(async () => {
    const res = await logoutAction();

    onClose?.();

    if (res?.redirectTo) {
      window.location.href = res.redirectTo;
    }
  });
}

  return (
    <>
      {!pathName.startsWith('/user') ? (
        <button
          className={`flex items-center justify-between px-3 py-4 rounded-lg transition text-neutral-600 hover:bg-neutral-100 w-full cursor-pointer
        `}
          onClick={() => setConfirmLogout(true)}
        >
          <div className="flex items-center gap-3 text-sm">
            <LogOut size={18} />
            Logout
          </div>
        </button>
      ) : (
        <Button
          onClick={() => setConfirmLogout(true)}
          variant="primary-black-outline"
          size="lg"
        >
          Logout from Account
        </Button>
      )}

      <ConfirmLogoutModal
        confirmLogout={confirmLogout}
        setConfirmLogout={setConfirmLogout}
        handleLogout={handleLogout}
        isPending={isPending}
      />
    </>
  );
}
