'use client';

import { useEffect, useState, useTransition } from 'react';
import { resendOtpAction, ResendOtpState } from '../actions/resend-otp';
import { toast } from 'sonner';
import { Button } from '@/components/ui/buttons/button';

const COOLDOWN_SECONDS = 60;

export default function ResendOtpButton() {
  const [secondsLeft, setSecondsLeft] = useState(COOLDOWN_SECONDS);
  const [isPending, startTransition] = useTransition();

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  function handleResend() {
    startTransition(async () => {
      const result: ResendOtpState = await resendOtpAction();

      if (result.status === 'success') {
        toast.success(result.message);
        setSecondsLeft(COOLDOWN_SECONDS); // reset cooldown
      } else if (result.status === 'error') {
        toast.error(result.message);
      }
    });
  }

  const canResend = secondsLeft === 0 && !isPending;

  return (
    <div className="text-sm text-neutral-500">
      {canResend ? (
        <Button
          variant="default"
          size="none"
          type="button"
          onClick={handleResend}
          className="text-primary font-medium hover:underline"
        >
          Resend Code
        </Button>
      ) : (
        <span>
          Resend code in{' '}
          <span className="font-medium text-neutral-700">{secondsLeft}s</span>
        </span>
      )}
    </div>
  );
}
