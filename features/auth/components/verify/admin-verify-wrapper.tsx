'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import VerifyClient from './verify-client';
import { VerifyOtpState } from '@/features/auth/libs/verify-code.schema';
import { AdminVerifyCodeAction } from '@/features/auth/actions/admin-verify';

interface AdminVerifyWrapperProps {
  identifier: string;
  method: 'email';
}

export default function AdminVerifyWrapper({
  identifier,
  method,
}: AdminVerifyWrapperProps) {
  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(AdminVerifyCodeAction, null);

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <VerifyClient
      identifier={identifier}
      method={method}
      verifyType="user"
      action={action}
      pending={pending}
      state={state}
      redirectHref="/admin/login"
    />
  );
}
