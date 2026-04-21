'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttons/button';
import { AddVendorPhoneAction } from '@/features/auth/actions/add-vendor-phone';
import AuthFormHeader from '@/components/ui/headers/auth-form-header';
import Card from '@/components/layout/card';
import PhoneInput from '@/components/ui/inputs/phone-input';
import ErrorMessage from '@/components/layout/error-message';

const INITIAL_VALUE = {
  phoneNumber: '',
};

export default function VendorGoogleVerifyPhone() {
  const router = useRouter();
  const [state, action, pending] = useActionState<any, FormData>(
    AddVendorPhoneAction,
    null,
  );

  const [formValues, setFormValues] = useState(INITIAL_VALUE);

  useEffect(() => {
    if (state?.status === 'success' && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <Card spacing="lg" className="w-full max-w-2xl bg-white">
        <AuthFormHeader />

        <div className="space-y-2  text-center">
          <h1 className="text-2xl font-semibold mb-2">
            Verify Phone Number
          </h1>

          <p className="text-sm text-neutral-500 text-center">
            Please input your phone number to receive a verification code via
            SMS.
          </p>
        </div>

        {state?.status === 'error' && (
          <ErrorMessage
            message={state?.status === 'error' ? state?.message : undefined}
          />
        )}

        <form className="flex flex-col items-center gap-6" action={action}>
          <PhoneInput
            name="phone"
            placeholder="Your phone number here"
            value={formValues.phoneNumber}
            onChange={(e) =>
              setFormValues({ ...formValues, phoneNumber: e.target.value })
            }
            errorMessage={
              state?.status === 'error' ? state?.errors?.phone?.[0] : undefined
            }
          />

          <Button
            size="lg"
            variant="primary"
            type="submit"
            disabled={pending}
            className="w-full"
          >
            {pending ? 'Sending...' : 'Send Verification Code'}
          </Button>
        </form>
      </Card>
    </main>
  );
}
