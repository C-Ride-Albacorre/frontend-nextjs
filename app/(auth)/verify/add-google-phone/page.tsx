'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttons/button';
import Input from '@/components/ui/inputs/input';
import { AddVendorPhoneAction } from '@/features/auth/actions/add-vendor-phone';

export default function VendorGoogleVerifyPhone() {
  const router = useRouter();
  const [state, action, pending] = useActionState<any, FormData>(
    AddVendorPhoneAction,
    null,
  );

  useEffect(() => {
    if (state?.status === 'success' && state.redirectTo) {
      router.push(state.redirectTo);
    } else if (state?.status === 'error' && state.message) {
      // Optionally show error toast
      alert(state.message);
    }
  }, [state, router]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Verify your Phone Number</h1>

      <p className="text-sm text-neutral-500">
        Please input your phone number to receive a verification code via SMS.
        This helps us secure your account and provide better service.
      </p>

      <form className="flex flex-col items-center" action={action}>
        <Input
          label="phone"
          name="phone"
          type="tel"
          placeholder="Your phone number here"
        />

        <Button size="6xl" variant="primary" type="submit" disabled={pending}>
          {pending ? 'Sending...' : 'Receive OTP'}
        </Button>
      </form>
    </div>
  );
}
