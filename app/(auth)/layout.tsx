// app/(auth)/layout.tsx
import type { Metadata } from 'next';

import { AuthMethodProvider } from '@/features/auth/hooks/auth-method.context';

export const metadata: Metadata = {
  title: {
    default: 'Authentication | C-ride',
    template: '%s | C-ride',
  },
  description: 'Secure access to C-ride.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthMethodProvider>
      <main>{children}</main>
    </AuthMethodProvider>
  );
}
