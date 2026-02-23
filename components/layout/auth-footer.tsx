import Link from 'next/link';

import { Icon } from '@iconify/react';

import { AuthType } from '@/features/auth/types';
import { Button } from '../ui/buttons/button';
import GoogleAuthButton from '@/features/auth/components/socials/google-auth-button';

type Props = {
  variant: AuthType;
  href: string;
};
export default function AuthFooter({ variant, href }: Props) {
  return (
    <div className="mt-6 text-center text-sm">
      {variant === 'register' ? (
        <p>
          Already have an account?{' '}
          <Link href={href} className="text-primary font-medium">
            Login
          </Link>
        </p>
      ) : (
        <p>
          Don&apos;t have an account?{' '}
          <Link href={href} className="text-primary font-medium">
            Register
          </Link>
        </p>
      )}

      <div className="my-6 flex items-center gap-4 text-neutral-300">
        <span className="h-px flex-1 bg-border" />
        or continue with
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-4">
        <GoogleAuthButton />

        <Button
          variant="white"
          size="full"
          leftIcon={<Icon icon="logos:apple" width={18} height={18} />}
        >
          Continue with Apple
        </Button>
      </div>

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
