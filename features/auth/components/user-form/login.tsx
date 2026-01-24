'use client';

import Link from 'next/link';

import { Eye } from 'lucide-react';

import { useAuthMethod } from '@/features/auth/auth-method.context';

import AuthMethod from '@/features/auth/components/auth-method';
import PhoneInput from '@/components/ui/inputs/phone-input';
import EmailInput from '@/components/ui/inputs/email-input';

export default function UserLoginForm() {
  const { method } = useAuthMethod();

  return (
    <>
      <AuthMethod />

      {/* FORM */}
      <form className="space-y-5">
        {method === 'phone' ? <PhoneInput /> : <EmailInput />}

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative mt-2">
            <input
              type="password"
              placeholder="Enter a strong password"
              className="w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <Eye
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </div>
          <Link
            href="/reset"
            className="mt-4 text-sm  text-right block  text-primary"
          >
            Forgot Password?
          </Link>
        </div>

        {/* CTA */}
        <Link
          href="/verify"
          type="submit"
          className="w-full block text-center rounded-xl bg-primary py-4 text-sm font-medium text-primary-text-100 hover:bg-primary-hover transition"
        >
          Continue
        </Link>
      </form>
    </>
  );
}
