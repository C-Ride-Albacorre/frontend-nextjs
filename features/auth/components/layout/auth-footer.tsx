import Link from 'next/link';

import { Icon } from '@iconify/react';

import { AuthType } from '@/features/auth/types';

type Props = {
  variant: AuthType;
};
export default function AuthFooter({ variant }: Props) {
  return (
    <div className="mt-6 text-center text-sm">
      {variant === 'register' ? (
        <p>
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      ) : (
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary font-medium">
            Register
          </Link>
        </p>
      )}

      <div className="my-6 flex items-center gap-4 text-neutral-300">
        <span className="h-px flex-1 bg-border" />
        or continue with
        <span className="h-px flex-1 bg-border" />
      </div>

      <button className="w-full rounded-xl border border-border py-3 text-sm flex items-center justify-center gap-2 mb-3 cursor-pointer">
        <Icon icon="logos:google-icon" width={18} height={18} />
        Continue with Google
      </button>

      <button className="w-full rounded-xl border border-border py-3 text-sm flex items-center justify-center gap-2 cursor-pointer">
        <Icon icon="logos:apple" width={18} height={18} />
        Continue with Apple
      </button>

      {variant === 'register' && (
        <p className="mt-6 text-xs text-neutral-400">
          By signing up, you agree to our{' '}
          <Link href="/" className="text-primary">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/" className="text-primary">
            Privacy Policy
          </Link>
        </p>
      )}
    </div>
  );
}
