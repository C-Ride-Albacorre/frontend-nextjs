'use client';

import { useActionState, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

import { userLoginAction } from '@/features/auth/actions/user-login';
import { useAuthMethod } from '@/features/auth/hooks/auth-method.context';
import AuthMethod from '@/features/auth/components/auth-method';
import PhoneInput from '@/components/ui/inputs/phone-input';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';

type FieldValues = {
  identifier: string;
  password: string;
};

const INITIAL_VALUES: FieldValues = { identifier: '', password: '' };

export default function UserLoginForm() {
  const { method } = useAuthMethod();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/user/dashboard';

  const [fields, setFields] = useState<FieldValues>(INITIAL_VALUES);
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, pending] = useActionState(userLoginAction, undefined);

  const isError = state?.status === 'error';

  const handleChange =
    (field: keyof FieldValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
    };

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
    <>
      <AuthMethod />

      <form className="space-y-5" action={action}>
        {/* Pass callbackUrl through so the action can redirect back */}
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        {method === 'phone' ? (
          <PhoneInput
            id="identifier"
            name="identifier"
            value={fields.identifier}
            onChange={handleChange('identifier')}
            errorMessage={isError ? state.errors?.identifier?.[0] : undefined}
          />
        ) : (
          <Input
            name="identifier"
            type="email"
            label="Email Address"
            value={fields.identifier}
            onChange={handleChange('identifier')}
            errorMessage={isError ? state.errors?.identifier?.[0] : undefined}
          />
        )}

        <div>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            spacing="sm"
            value={fields.password}
            onChange={handleChange('password')}
            errorMessage={isError ? state.errors?.password?.[0] : undefined}
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

        <Button
          type="submit"
          size="full"
          variant="primary"
          loading={pending}
          disabled={pending}
          className="mt-4"
        >
          Continue
        </Button>
      </form>
    </>
  );
}
