'use client';

import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import VerifyClient from './verify-client';
import { VerifyOtpState } from '../../libs/verify-code.schema';
import { VendorVerifyPhoneAction } from '../../actions/vendor-verify';

export default function VendorPhoneWrapper({
  identifier,
  method,
}: {
  identifier: string;
  method: 'phone number';
}) {
  const router = useRouter();

  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(VendorVerifyPhoneAction, null);

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
      if (state.redirectTo) {
        router.push(state.redirectTo);
      }
    }
  }, [state, router]);

  return (
    <>
      <VerifyClient
        identifier={identifier}
        method={method}
        verifyType="vendor-phone"
        action={action}
        pending={pending}
        state={state}
       
      />
    </>
  );
}
