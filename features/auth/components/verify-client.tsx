'use client';

import { Suspense, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import AuthFormHeader from '@/features/auth/components/layout/auth-form-header';
import { OtpInput } from '@/components/ui/inputs/otp-input';

export default function VerifyClient() {
  const searchParams = useSearchParams();

  const method = searchParams.get('method') || 'phone';
  const destination =
    searchParams.get('to') ||
    (method === 'email' ? 'jo***@gmail.com' : '+234 8** *** **89');

  const label = method === 'email' ? 'email address' : 'phone number';

  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white border border-border rounded-3xl px-4 md:px-8 py-14 text-center">
        {/* LOGO */}
        <AuthFormHeader />

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-2">Verify your Identity</h1>
        <p className="text-sm text-neutral-500 mb-10">
          We've sent a verification code to your{' '}
          <span className="font-medium text-neutral-700">{label}</span>
          <br />
          <span className="font-medium text-neutral-700">{destination}</span>
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-10">
          {code.map((digit, index) => (
            <OtpInput
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              inputMode="numeric"
            />
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="mx-auto block w-full max-w-md rounded-xl bg-primary py-4 text-sm font-medium text-primary-text-100 hover:bg-primary-hover transition"
        >
          Verify & Continue
        </Link>

        {/* ACTIONS */}
        <div className="mt-8 space-y-3 text-sm">
          <Link href="/signup" className="block text-primary font-medium">
            Change {label}?
          </Link>

          <button className="block w-full text-primary font-medium">
            Resend Code
          </button>
        </div>
      </div>
    </section>
  );
}
