'use client';

import { useActionState, useState } from 'react';
import { useAuthMethod } from '@/features/auth/hooks/auth-method.context';
import { resetPasswordAction } from '@/features/auth/actions/reset';
import AuthFormHeader from '@/components/ui/headers/auth-form-header';
import AuthMethod from '@/features/auth/components/auth-method';
import PhoneInput from '@/components/ui/inputs/phone-input';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { ChevronLeft } from 'lucide-react';

type FieldValues = { identifier: string };

export default function ResetPasswordForm() {
  const { method } = useAuthMethod();
  const [fields, setFields] = useState<FieldValues>({ identifier: '' });
  const [state, action, pending] = useActionState(
    resetPasswordAction,
    undefined,
  );
  const isError = state?.status === 'error';

  // ✅ Show success state instead of redirecting
  if (state?.status === 'success') {
    return (
      <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white border border-border rounded-3xl px-4 md:px-8 py-14 text-center flex flex-col gap-6">
          <AuthFormHeader />
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold">
              Check your {method === 'email' ? 'inbox' : 'messages'}
            </h1>
            <p className="text-sm text-neutral-500 leading-7 max-w-md mx-auto">
              We've sent a password reset link to{' '}
              <span className="font-medium text-neutral-700">
                {fields.identifier}
              </span>
              . Click the link in the {method === 'email' ? 'email' : 'message'}{' '}
              to reset your password.
            </p>
            <p className="text-xs text-neutral-400">
              The link expires in 15 minutes. If you don't see it, check your
              spam folder.
            </p>
          </div>
          <Button
            href="/user/login"
            variant="primary"
            leftIcon={<ChevronLeft size={18} />}
            size="6xl"
          >
            Back to Login
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white border border-border rounded-3xl px-4 md:px-8 py-14 text-center flex flex-col gap-4">
        <AuthFormHeader />
        <div className="md:max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-2">Reset Password</h1>
          <p className="text-sm text-neutral-500 mb-10 leading-6">
            Enter the {method} attached to your account. We'll send you a link
            to reset your password.
          </p>
        </div>
        <AuthMethod />
        <form className="space-y-12 text-left" action={action}>
          {method === 'phone' ? (
            <PhoneInput
              name="identifier"
              value={fields.identifier}
              onChange={(e) => setFields({ identifier: e.target.value })}
              errorMessage={isError ? state.errors?.identifier?.[0] : undefined}
            />
          ) : (
            <Input
              name="identifier"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={fields.identifier}
              onChange={(e) => setFields({ identifier: e.target.value })}
              errorMessage={isError ? state.errors?.identifier?.[0] : undefined}
            />
          )}
          {isError && state.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}
          <Button
            type="submit"
            variant="primary"
            size="full"
            loading={pending}
            disabled={pending}
          >
            {`${pending ? 'Sending...' : 'Send Reset Link'} `}
          </Button>
        </form>
      </div>
    </section>
  );
}
