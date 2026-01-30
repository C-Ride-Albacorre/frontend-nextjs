'use client';

import { Eye } from 'lucide-react';

import { useAuthMethod } from '@/features/auth/auth-method.context';

import AuthMethod from '@/features/auth/components/auth-method';
import PhoneInput from '@/components/ui/inputs/phone-input';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

export default function UserRegisterForm() {
  const { method } = useAuthMethod();

  return (
    <>
      <AuthMethod />

      {/* FORM */}
      <form className="space-y-5">
        {method === 'phone' ? (
          <PhoneInput />
        ) : (
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
          />
        )}

        {/* NAMES */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            type="text"
            spacing="sm"
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            type="text"
            spacing="sm"
          />
        </div>

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
          label="Referral Code (Optional)"
          type="text"
          spacing="sm"
          placeholder="Enter code"
        />

        {/* CTA */}
        <Button href="/verify" size="full" variant="primary">
          Continue
        </Button>
      </form>
    </>
  );
}
