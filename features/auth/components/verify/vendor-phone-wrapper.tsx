'use client';

import { useActionState, useEffect, useState } from 'react';
import VerifyClient from './verify-client';
import { VerifyOtpState } from '../../libs/verify-code.schema';
import { VendorVerifyPhoneAction } from '../../actions/vendor-verify';
import VerificationSuccessModal from './verification-success-modal';

export default function VendorPhoneWrapper({
  identifier,
  method,
}: {
  identifier: string;
  method: 'phone';
}) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(VendorVerifyPhoneAction, null);

  useEffect(() => {
    if (state?.status === 'success') {
      setShowSuccessModal(true);
    }
  }, [state]);

  return (
    <>
      <VerifyClient
        identifier={identifier}
        method={method}
        verifyType="vendor-phone"
        action={action}
        pending={pending}
        state={state}
        redirectHref="/vendor/register"
      />
      <VerificationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        redirectTo="/onboarding/business-info"
      />
    </>
  );
}
