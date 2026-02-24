'use client';

import { useRef, useState } from 'react';
import { OtpInput } from '@/components/ui/inputs/otp-input';
import { Button } from '@/components/ui/buttons/button';
import { VerifyOtpState } from '../../libs/verify-code.schema';
import ResendOtpButton from './resend-otp-button';

type VerifyClientProps = {
  identifier: string;
  method: 'email' | 'phone';
};

export default function VerifyClient({
  identifier,
  method: label,
  action,
  pending,
  state,
}: VerifyClientProps & {
  action: (payload: FormData) => void;
  pending: boolean;
  state: VerifyOtpState | null;
}) {
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

  const otp = code.join('');

  return (
    <div>
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

      {state?.message && (
        <p className="text-red-500 text-sm mb-4">{state.message}</p>
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
  );
}
