'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import VerifyClient from './verify-client';
import { VendorVerifyEmailAction } from '../../actions/vendor-verify';
import { VerifyOtpState } from '../../libs/verify-code.schema';
import VerificationSuccessModal from './verification-success-modal';

export default function VendorEmailWrapper({
  identifier,
  method,
}: {
  identifier: string;
  method: 'email';
}) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(VendorVerifyEmailAction, null);

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message ?? 'Email verified successfully!');
      setShowSuccessModal(true);
    }
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <VerifyClient
        identifier={identifier}
        method={method}
        verifyType="vendor-email"
        action={action}
        pending={pending}
        state={state}
      />

      <VerificationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        redirectTo="/onboarding/business-info"
      />
    </>
  );
}
