'use client';

import { useActionState } from 'react';
import { useAuthMethod } from '@/features/auth/hooks/auth-method.context';

import AuthFormHeader from '@/components/ui/headers/auth-form-header';
import AuthMethod from '@/features/auth/components/auth-method';
import PhoneInput from '@/components/ui/inputs/phone-input';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { useState } from 'react';
import { resetPasswordAction } from '@/features/auth/actions/reset';

type FieldValues = { identifier: string };
const INITIAL_VALUES: FieldValues = { identifier: '' };

export default function ResetPasswordForm() {
  const { method } = useAuthMethod();
  const [fields, setFields] = useState<FieldValues>(INITIAL_VALUES);

  const [state, action, pending] = useActionState(
    resetPasswordAction,
    undefined,
  );

  const isError = state?.status === 'error';

  return (
    <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white border border-border rounded-3xl px-4 md:px-8 py-14 text-center flex flex-col gap-4">
        <AuthFormHeader />

        <div className="md:max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-2">Reset Password</h1>
          <p className="text-sm text-neutral-500 mb-10 leading-6">
            Enter the {method} attached to your account to receive a one-time
            password reset code.
          </p>
        </div>

        <AuthMethod />

        <form className="space-y-12 text-left" action={action}>
          {method === 'phone' ? (
            <PhoneInput
              name="identifier"
              value={fields.identifier}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, identifier: e.target.value }))
              }
              errorMessage={isError ? state.errors?.identifier?.[0] : undefined}
            />
          ) : (
            <Input
              name="identifier"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={fields.identifier}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, identifier: e.target.value }))
              }
              errorMessage={isError ? state.errors?.identifier?.[0] : undefined}
            />
          )}

          {state?.status === 'error' && state.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="full"
            loading={pending}
            disabled={pending}
          >
            {pending ? 'Processing...' : 'Send OTP'}
          </Button>
        </form>
      </div>
    </section>
  );
}
