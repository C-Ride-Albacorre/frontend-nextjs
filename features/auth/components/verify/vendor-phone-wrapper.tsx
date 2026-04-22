'use client';

import { useActionState, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import VerifyClient from './verify-client';
import { VerifyOtpState } from '../../libs/verify-code.schema';
import { VendorVerifyPhoneAction } from '../../actions/vendor-verify';
import VerificationSuccessModal from './verification-success-modal';

export default function VendorPhoneWrapper({
  identifier,
  method,
}: {
  identifier: string;
  method: 'phone number';
}) {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(VendorVerifyPhoneAction, null);

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);

      if (state.redirectTo?.startsWith('/onboarding')) {
        // Phone was the final verification step — show the onboarding modal
        setShowSuccessModal(true);
      } else if (state.redirectTo) {
        // Still more verification to do (e.g. → /verify/vendor-email)
        router.push(state.redirectTo);
      }
    }

    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
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

      <VerificationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        redirectTo={state?.redirectTo ?? '/onboarding/business-info'}
      />
    </>
  );
}
