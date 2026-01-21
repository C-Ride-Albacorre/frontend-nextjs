'use client';

import { Eye } from 'lucide-react';

import { useAuthMethod } from '@/features/auth/auth-method.context';

import AuthMethod from '@/features/auth/components/auth-method';
import PhoneInput from '@/features/auth/components/ui/phone-input';
import EmailInput from '@/features/auth/components/ui/email-input';

export default function RegisterForm() {
  const { method } = useAuthMethod();

  return (
    <>
      <AuthMethod />

      {/* FORM */}
      <form className="space-y-5">
        {method === 'phone' ? <PhoneInput /> : <EmailInput />}

        {/* NAMES */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="First name"
              className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Last name"
              className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative mt-2">
            <input
              type="password"
              placeholder="Enter a strong password"
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <Eye
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            Password must contain at least one number
          </p>
        </div>

        {/* REFERRAL */}
        <div>
          <label className="text-sm font-medium">
            Referral Code (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter code"
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-4 text-sm font-medium text-primary-text-100 hover:bg-primary-hover transition"
        >
          Continue
        </button>
      </form>
    </>
  );
}
