'use client';

import { useActionState } from 'react';
import VerifyClient from './verify-client';
import { VerifyOtpState } from '../../libs/verify-code.schema';
import { VendorVerifyPhoneAction } from '../../actions/vendor-verify';

export default function VendorPhoneWrapper({
  identifier,
  method,
}: {
  identifier: string;
  method: 'phone';
}) {
  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(VendorVerifyPhoneAction, null);
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
