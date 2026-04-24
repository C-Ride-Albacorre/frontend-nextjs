'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import VerifyClient from './verify-client';
import { VerifyOtpState } from '@/features/auth/libs/verify-code.schema';
import { VerifyCodeAction } from '@/features/auth/actions/verify-code';
import VerificationSuccessModal from './verification-user-success-modal';

type VerifyWrapperProps = {
  identifier: string;
  method: 'email' | 'phone number';
};

export default function VerifyWrapper({
  identifier,
  method,
}: VerifyWrapperProps) {
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(VerifyCodeAction, null);

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }

    if (state?.status === 'success') {
      setIsSuccessModal(true);
    }
  }, [state]);

  return (
    <>
      <VerifyClient
        identifier={identifier}
        method={method}
        verifyType="user"
        action={action}
        pending={pending}
        state={state}
        redirectHref="/user/register"
      />

      <VerificationSuccessModal
        isOpen={isSuccessModal}
        redirectTo="/user/delivery?newUser=true"
      />
    </>
  );
}
