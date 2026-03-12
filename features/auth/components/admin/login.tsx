'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';

import ErrorMessage from '@/components/layout/error-message';
import { adminLoginAction } from '../../actions/admin-login';

export default function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, pending] = useActionState(adminLoginAction, undefined);

  const isError = state?.status === 'error';

  useEffect(() => {
    if (!state || state.status !== 'error') return;

    if (state.message) toast.error(state.message);

    if (state.errors) {
      Object.values(state.errors).forEach((fieldErrors) =>
        fieldErrors?.forEach((err) => toast.error(err)),
      );
    }
  }, [state]);

  return (
    <form className="space-y-5" action={action}>
      <Input
        name="email"
        type="email"
        label="Email Address"
        errorMessage={isError ? state.errors?.email?.[0] : undefined}
        defaultValue={
          state?.status === 'error' ? state.fields?.email : undefined
        }
      />

      <div>
        <Input
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          errorMessage={isError ? state.errors?.password?.[0] : undefined}
          defaultValue={
            state?.status === 'error' ? state.fields?.password : undefined
          }
          rightIcon={
            <IconButton
              type="button"
              rounded="none"
              variant="gray"
              size="none"
              ariaLabel="Toggle password visibility"
              onClick={() => setShowPassword((v) => !v)}
              className="text-neutral-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </IconButton>
          }
        />

        <Link
          href="/reset"
          className="mt-4 text-sm text-right block text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <Button type="submit" size="full" loading={pending} disabled={pending}>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>

      {isError && (
        <ErrorMessage message={state.message || 'An error occurred'} />
      )}
    </form>
  );
}
