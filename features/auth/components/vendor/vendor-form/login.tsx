'use client';

import { useActionState, useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

import { vendorLoginAction } from '@/features/auth/actions/vendor-login';
import FormHeader from '@/components/ui/headers/form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import UnderReviewModal from '@/features/auth/components/vendor/under-review-modal';

type FieldValues = {
  email: string;
  password: string;
};

const INITIAL_VALUES: FieldValues = { email: '', password: '' };

export default function VendorLoginForm() {
  const [fields, setFields] = useState<FieldValues>(INITIAL_VALUES);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, action, pending] = useActionState(vendorLoginAction, undefined);

  const isError = state?.status === 'error';
  const isUnderReview = state?.status === 'under_review';

  const handleChange =
    (field: keyof FieldValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
    };

  useEffect(() => {
    if (!state) return;

    if (state.status === 'under_review') {
      setIsModalOpen(true);
      return;
    }

    if (state.status !== 'error') return;
    if (state.message) toast.error(state.message);
    if (state.errors) {
      Object.values(state.errors).forEach((fieldErrors) =>
        fieldErrors?.forEach((err) => toast.error(err)),
      );
    }
  }, [state]);

  return (
    <section className='space-y-8'>
      <FormHeader
        title="Login to your account"
        subtitle="Please enter your credentials below."
      />

      <form className="space-y-5" action={action}>
        <Input
          name="email"
          type="email"
          label="Email Address"
          spacing="sm"
          placeholder="Enter your email"
          value={fields.email}
          onChange={handleChange('email')}
          errorMessage={isError ? state.errors?.email?.[0] : undefined}
        />

        <div>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
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
          {pending ? 'Logging in...' : 'Continue'}
        </Button>
      </form>

      <UnderReviewModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={isUnderReview ? state.email : undefined}
      />
    </section>
  );
}
