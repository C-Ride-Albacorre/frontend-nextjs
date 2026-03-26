'use client';

import { createPortal } from 'react-dom';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';

interface SessionExpiredModalProps {
  isOpen: boolean;
  redirectPath: string;
}

export default function SessionExpiredModal({
  isOpen,
  redirectPath,
}: SessionExpiredModalProps) {
  if (!isOpen) return null;

  // Determine persona from redirectPath
  let persona = 'admin';
  if (redirectPath.startsWith('/user')) {
    persona = 'user';
  } else if (redirectPath.startsWith('/vendor')) {
    persona = 'vendor';
  }
  const loginUrl = `/${persona}/login?redirect=${encodeURIComponent(redirectPath)}`;

  return createPortal(
    <div className="fixed inset-0 z-100 bg-black/60 flex items-center justify-center px-4 py-8 h-full w-full">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-2xl flex flex-col"
      >
        <div className="p-6 md:p-8 space-y-6 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <LogIn size={28} className="text-red-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-neutral-900">
              Session Expired
            </h2>
            <p className="text-sm text-neutral-500">
              Your session has expired. Please log in again to continue where
              you left off.
            </p>
          </div>

          <Button
            variant="primary"
            size="full"
            onClick={() => {
              window.location.href = loginUrl;
            }}
          >
            Proceed to Login
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
