'use client';

import { useActionState, useState } from 'react';
import { CheckCircle, Eye, EyeOff, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { newPasswordAction } from '../../actions/new-password';

export default function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fields, setFields] = useState({ password: '', confirmPassword: '' });
  const [state, action, pending] = useActionState(newPasswordAction, undefined);
  const isError = state?.status === 'error';

  // ✅ Invalid or missing token
  if (!token) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <XCircle size={48} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold">Invalid Reset Link</h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          This password reset link is invalid or has expired. Please request a
          new one.
        </p>
        <Button href="/reset" variant="primary" size="full">
          Request New Link
        </Button>
      </div>
    );
  }

  // ✅ Success — stay on page, no redirect
  if (state?.status === 'success') {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-semibold">Password Reset Successful</h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          Your password has been updated. You can now log in with your new
          password.
        </p>
        <Button href="/user/login" variant="primary" size="6xl">
          Go to Login
        </Button>
      </div>
    );
  }

  // ✅ Token error from API
  if (isError && state.message?.toLowerCase().includes('token')) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <XCircle size={48} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-semibold">Link Expired</h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          {state.message}
        </p>
        <Button href="/reset" variant="primary" size="6xl">
          Request New Link
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-8 max-w-xl text-left mx-auto" action={action}>
      <input type="hidden" name="token" value={token} />

      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold mb-2">Set New Password</h1>
        <p className="text-sm text-neutral-500">
          Choose a strong password you haven't used before.
        </p>
      </div>

      <Input
        name="password"
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter a strong password"
        value={fields.password}
        onChange={(e) => setFields((p) => ({ ...p, password: e.target.value }))}
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
        errorMessage={isError ? state.errors?.confirmPassword?.[0] : undefined}
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

      {isError && state.message && !state.errors && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <Button
        type="submit"
        size="full"
        variant="primary"
        loading={pending}
        disabled={pending}
      >
        {pending ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
}
