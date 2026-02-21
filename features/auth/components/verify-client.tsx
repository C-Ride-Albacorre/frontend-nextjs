'use client';

import { useActionState, useRef, useState } from 'react';
import { VerifyCodeAction } from '@/features/auth/actions/verify-code';
import { OtpInput } from '@/components/ui/inputs/otp-input';
import { Button } from '@/components/ui/buttons/button';
import { VerifyOtpState } from '../libs/verify-code.schema';
import AuthFormHeader from '@/components/ui/headers/auth-form-header';
import ResendOtpButton from './resend-otp-button';

type VerifyClientProps = {
  identifier: string;
  method: 'email' | 'phone';
};

type VerifyAction = (
  state: VerifyOtpState | null,
  formData: FormData,
) => Promise<VerifyOtpState | null>;

export default function VerifyClient({
  identifier,
  method,
}: VerifyClientProps) {
  const label = method === 'email' ? 'email address' : 'phone number';

  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const actionFn = VerifyCodeAction as unknown as VerifyAction;

  const [state, action, pending] = useActionState<
    VerifyOtpState | null,
    FormData
  >(actionFn, null);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const otp = code.join('');

  return (
    <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white border border-border rounded-3xl px-4 md:px-8 py-14 text-center">
        <AuthFormHeader />
        <h1 className="text-2xl font-semibold mb-2">Verify your Identity</h1>

        <p className="text-sm text-neutral-500 mb-10">
          We've sent a verification code to your{' '}
          <span className="font-medium">{label}</span>
          <br />
          <span className="font-medium">{identifier}</span>
        </p>

        {state?.errors?.otp?.[0] && (
          <p className="text-red-500 text-sm mb-4">{state.errors.otp[0]}</p>
        )}

        <form action={action} className="flex flex-col items-center">
          {/* send OTP only */}

          <input type="hidden" name="otp" value={otp} />

          <div className="flex justify-center gap-3 mb-6">
            {code.map((digit, index) => (
              <OtpInput
                key={index}
                name="otp"
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                inputMode="numeric"
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && index > 0) {
                    inputsRef.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </div>

          {state?.errors?.otp && (
            <p className="text-red-500 text-sm mb-4">{state.errors.otp[0]}</p>
          )}

          <Button
            size="6xl"
            variant="primary"
            type="submit"
            disabled={pending || otp.length < 6}
          >
            {pending ? 'Verifying...' : 'Verify & Continue'}
          </Button>
        </form>

        {/* ACTIONS */}
        <div className="mt-8 space-y-3 text-sm">
          <Button
            href="/user/register"
            size="none"
            variant="default"
            className="block text-primary font-medium"
            disabled={pending}
          >
            Change {label}?
          </Button>

          <ResendOtpButton />
        </div>
      </div>
    </section>
  );
}
