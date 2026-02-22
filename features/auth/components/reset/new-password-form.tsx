// features/auth/components/new-password-form.tsx
'use client';

import { useActionState, useState, use } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthFormHeader from '@/components/ui/headers/auth-form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

import { IconButton } from '@/components/ui/buttons/icon-button';
import { newPasswordAction } from '../../actions/new-password';

export default function NewPasswordForm({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = use(searchParams);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fields, setFields] = useState({ password: '', confirmPassword: '' });
  const [state, action, pending] = useActionState(newPasswordAction, undefined);
  const isError = state?.status === 'error';

  if (!token) {
    return (
      <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white border border-border rounded-3xl px-8 py-14 text-center space-y-4">
          <AuthFormHeader />
          <h1 className="text-2xl font-semibold">Invalid Reset Link</h1>
          <p className="text-sm text-neutral-500">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Button href="/reset" variant="primary" size="full">
            Request New Link
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-50 flex justify-center px-4 py-4">
      <div className="w-full max-w-3xl bg-white border border-border rounded-3xl px-8 py-14 text-center">
        <AuthFormHeader />
        <form className="space-y-8 max-w-xl text-left mx-auto" action={action}>
          {/* Pass token to action */}
          <input type="hidden" name="token" value={token} />

          <Input
            name="password"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter a strong password"
            value={fields.password}
            onChange={(e) =>
              setFields((p) => ({ ...p, password: e.target.value }))
            }
            errorMessage={isError ? state.errors?.password?.[0] : undefined}
            rightIcon={
              <IconButton
                type="button"
                variant="gray"
                size="none"
                rounded="none"
                ariaLabel="Toggle password"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            }
          />

          <Input
            name="confirmPassword"
            label="Confirm New Password"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm your new password"
            value={fields.confirmPassword}
            onChange={(e) =>
              setFields((p) => ({ ...p, confirmPassword: e.target.value }))
            }
            errorMessage={
              isError ? state.errors?.confirmPassword?.[0] : undefined
            }
            rightIcon={
              <IconButton
                type="button"
                variant="gray"
                size="none"
                rounded="none"
                ariaLabel="Toggle confirm password"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            }
          />

          {isError && state.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}

          <Button
            type="submit"
            size="full"
            variant="primary"
            loading={pending}
            disabled={pending}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </section>
  );
}
