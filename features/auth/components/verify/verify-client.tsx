'use client';

import { useRef, useState } from 'react';
import { OtpInput } from '@/components/ui/inputs/otp-input';
import { Button } from '@/components/ui/buttons/button';
import { VerifyOtpState } from '../../libs/verify-code.schema';
import ResendOtpButton from './resend-otp-button';
import { useRouter } from 'next/navigation';

type VerifyClientProps = {
  identifier: string;
  method: 'email' | 'phone number';
  verifyType: 'user' | 'vendor-email' | 'vendor-phone';
};

export default function VerifyClient({
  identifier,
  method: label,
  verifyType,
  action,
  pending,
  state,
  redirectHref,
}: VerifyClientProps & {
  action: (payload: FormData) => void;
  pending: boolean;
  state: VerifyOtpState | null;
  redirectHref?: string;
}) {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (!pasted) return;

    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);

    const focusIndex = Math.min(pasted.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  const otp = code.join('');

  const errorMessage =
    (state?.status === 'error' && state?.message) ||
    state?.errors?.otp?.[0] ||
    '';

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Verify your Identity</h1>

      <p className="text-sm text-neutral-500">
        We've sent a verification code to your{' '}
        <span className="font-medium">{label}</span>
        <br />
        <span className="font-medium">{identifier}</span>
      </p>

      <p
        className={`my-6 text-sm text-red-500${
          errorMessage ? ' animate-shake' : ' invisible'
        }`}
      >
        {errorMessage || '\u00A0'}
      </p>

      <form action={action} className="flex flex-col items-center">
        {/* send OTP only */}

        <input type="hidden" name="otp" value={otp} />

        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <OtpInput
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onPaste={handlePaste}
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
          onClick={() => {
            if (redirectHref) {
              router.push(redirectHref);
            } else {
              router.back();
            }
          }}
          size="none"
          variant="default"
          className="block text-primary font-medium"
          disabled={pending}
        >
          Change {label}?
        </Button>

        <ResendOtpButton type={verifyType} />
      </div>
    </div>
  );
}
