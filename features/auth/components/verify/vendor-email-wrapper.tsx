'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import VerifyClient from './verify-client';
import { VendorVerifyEmailAction } from '../../actions/vendor-verify';
import { VerifyOtpState } from '../../libs/verify-code.schema';

export default function VendorEmailWrapper({
  identifier,
  method,
}: {
  identifier: string;
  method: 'email';
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(VendorVerifyEmailAction, null);

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
      if (state.redirectTo) {
        router.push(state.redirectTo);
      }
    }
  }, [state, router]);

  return (
    <VerifyClient
      identifier={identifier}
      method={method}
      action={action}
      pending={pending}
      state={state}
    />
  );
}
