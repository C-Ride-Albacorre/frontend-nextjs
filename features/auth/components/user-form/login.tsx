'use client';

import Link from 'next/link';

import { Eye } from 'lucide-react';

import { useAuthMethod } from '@/features/auth/auth-method.context';

import AuthMethod from '@/features/auth/components/auth-method';
import PhoneInput from '@/components/ui/inputs/phone-input';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';

export default function UserLoginForm() {
  const { method } = useAuthMethod();

  return (
    <>
      <AuthMethod />

      {/* FORM */}
      <form className="space-y-5">
        {method === 'phone' ? (
          <PhoneInput />
        ) : (
          <Input type="email" label="Email" placeholder="Enter your email" />
        )}

        <div>
          {/* PASSWORD */}
          <Input
            type="password"
            label="Password"
            placeholder="Enter a strong password"
            spacing="sm"
            rightIcon={<Eye size={18} className="text-neutral-500" />}
          />

          <Link
            href="/reset"
            className="mt-4 text-sm  text-right block  text-primary"
          >
            Forgot Password?
          </Link>
        </div>

        {/* CTA */}
        <Button href="/verify" size="full" variant="primary" className='mt-4'>
          Continue
        </Button>
      </form>
    </>
  );
}
