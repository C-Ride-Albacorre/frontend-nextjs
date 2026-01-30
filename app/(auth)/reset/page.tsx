'use client';

import Link from 'next/link';
import { useAuthMethod } from '@/features/auth/auth-method.context';

import AuthFormHeader from '@/features/auth/components/layout/auth-form-header';
import AuthMethod from '@/features/auth/components/auth-method';
import PhoneInput from '@/components/ui/inputs/phone-input';
import Input from '@/components/ui/inputs/input';

export default function ResetPasswordPage() {
  const { method } = useAuthMethod();

  return (
    <>
      <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white border border-border rounded-3xl px-4 md:px-8 py-14 text-center flex flex-col gap-4">
          {/* LOGO */}
          <AuthFormHeader />

          {/* TITLE */}
          <div className="md:max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-2">Reset Password</h1>
            <p className="text-sm text-neutral-500 mb-10 leading-6">
              Enter the {method} attached to your account to receive a one-time
              password reset code.
            </p>
          </div>

          <AuthMethod />

          {/* FORM */}
          <form className="space-y-12 text-left">
            {method === 'phone' ? <PhoneInput /> : <Input type="email" label="Email Address" placeholder="Enter your email" />}

            {/* CTA */}
            <Link
              href="/reset/verify"
              type="submit"
              className="w-full block text-center rounded-xl bg-primary py-4 text-sm font-medium text-primary-text-100 hover:bg-primary-hover transition cursor-pointer"
            >
              Send OTP
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
