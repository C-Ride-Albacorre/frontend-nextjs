'use client';

import { useActionState } from 'react';
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
  const [state, action, pending] = useActionState<VerifyOtpState | null, FormData>(
    VendorVerifyEmailAction,
    null
  );
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
