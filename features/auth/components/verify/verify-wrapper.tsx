'use client';

import { useActionState } from 'react';
import VerifyClient from './verify-client';
import { VerifyOtpState } from '@/features/auth/libs/verify-code.schema';
import { VerifyCodeAction } from '@/features/auth/actions/verify-code';

type VerifyWrapperProps = {
  identifier: string;
  method: 'email' | 'phone';
};

export default function VerifyWrapper({
  identifier,
  method,
}: VerifyWrapperProps) {
  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(VerifyCodeAction, null);

  return (
    <VerifyClient
      identifier={identifier}
      method={method}
      verifyType="user"
      action={action}
      pending={pending}
      state={state}
      redirectHref="/user/register"
    />
  );
}
