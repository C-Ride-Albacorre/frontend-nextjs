import Image from 'next/image';

import AuthInfo from '@/features/auth/components/layout/auth-info';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Portal ',
  description: 'Authenticate to access your personalized delivery dashboard.',
};

export default function VendorAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="hidden md:block sticky top-8 h-[calc(100vh-4rem)]">
          <AuthInfo />
        </div>

        {/* RIGHT — SCROLLS */}
        <div className="bg-white rounded-3xl border border-border px-4  py-8 md:py-10 md:px-10">
          {children}
        </div>
      </div>
    </section>
  );
}
