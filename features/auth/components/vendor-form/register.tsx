'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

import PhoneInput from '@/components/ui/inputs/phone-input';
import FormHeader from '@/components/ui/headers/form-header';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

export default function VendorRegisterForm() {
  const router = useRouter();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!acceptedTerms) {
      setError('You must agree to the terms and conditions to continue.');
      return;
    }

    setError('');
    router.push('/onboarding/business-info');
  }
  return (
    <>
      <FormHeader
        title="Create an Account"
        subtitle="Please enter your credentials below."
      />

      {/* FORM */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* NAMES */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="First Name"
            spacing="sm"
            placeholder="First name"
          />
          <Input
            type="text"
            label="Last Name"
            spacing="sm"
            placeholder="Last name"
          />
        </div>

        <Input
          type="email"
          label="Email Address"
          spacing="sm"
          placeholder="Enter your email"
        />

        {/* PHONE */}

        <PhoneInput />

        {/* PASSWORD */}
        <Input
          type="password"
          label="Password"
          placeholder="Enter a strong password"
          spacing="sm"
          inputInfo="Password must contain at least one number"
          rightIcon={<Eye size={18} className="text-neutral-500" />}
        />

        {/* REFERRAL */}
        <Input
          type="text"
          label="Referral Code (Optional)"
          spacing="sm"
          placeholder="Enter code"
        />

        {/* TERMS CHECKBOX */}
        <div className="space-y-2">
          <label className="flex items-start lg:items-center gap-3 text-sm text-neutral-600 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                setError('');
              }}
              className="h-4 w-4 rounded-md border-border accent-primary "
            />
            <span>
              I agree to the{' '}
              <span className="text-primary font-medium">
                Terms & Conditions
              </span>
            </span>
          </label>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* CTA */}
        <Button
          type="submit"
          size="full"
          variant="primary"
          className="mt-4"
          disabled={!acceptedTerms}
        >
          Continue
        </Button>
      </form>
    </>
  );
}
