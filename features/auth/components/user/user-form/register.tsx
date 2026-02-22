'use client';

import { useActionState, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

import { userRegisterAction } from '@/features/auth/actions/user-register';
import { useAuthMethod } from '@/features/auth/hooks/auth-method.context';
import AuthMethod from '@/features/auth/components/auth-method';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import PhoneInput from '@/components/ui/inputs/phone-input';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { set } from 'zod';

type FieldValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  referralCode: string;
};

const INITIAL_VALUES: FieldValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  referralCode: '',
};

export default function UserRegisterForm() {
  const { method } = useAuthMethod();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<FieldValues>(INITIAL_VALUES);

  const [state, action, pending] = useActionState(
    userRegisterAction,
    undefined,
  );

  const changeHandler =
    (field: keyof FieldValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
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

  useEffect(() => {
    if (state?.status === 'success') {
      setFormValues(INITIAL_VALUES);
      setAcceptedTerms(false);
    }
  }, [state]);

  return (
    <>
      <AuthMethod />

      <form className="space-y-5" action={action}>
        {method === 'phone' ? (
          <PhoneInput
            id="phoneNumber"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={changeHandler('phoneNumber')}
            errorMessage={isError ? state.errors?.phoneNumber?.[0] : undefined}
          />
        ) : (
          <Input
            name="email"
            type="email"
            label="Email Address"
            value={formValues.email}
            onChange={changeHandler('email')}
            errorMessage={isError ? state.errors?.email?.[0] : undefined}
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="firstName"
            label="First Name"
            value={formValues.firstName}
            onChange={changeHandler('firstName')}
            errorMessage={isError ? state.errors?.firstName?.[0] : undefined}
          />
          <Input
            name="lastName"
            label="Last Name"
            value={formValues.lastName}
            onChange={changeHandler('lastName')}
            errorMessage={isError ? state.errors?.lastName?.[0] : undefined}
          />
        </div>

        <Input
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={formValues.password}
          onChange={changeHandler('password')}
          errorMessage={
            isError && state.errors?.password ? (
              <div className="text-xs space-y-2">
                <p>Password must:</p>
                <ul className="space-y-2 list-disc list-inside">
                  {state.errors.password.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : undefined
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

        <Input
          name="referralCode"
          label="Referral Code (Optional)"
          value={formValues.referralCode}
          onChange={changeHandler('referralCode')}
        />

        <label className="flex gap-3 text-sm">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          I agree to the Terms & Conditions
        </label>

        <Button
          type="submit"
          size="full"
          loading={pending}
          disabled={pending || !acceptedTerms}
        >
          Continue
        </Button>

        {isError && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {state.message}
          </p>
        )}
      </form>
    </>
  );
}
