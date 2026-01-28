import type { Metadata } from 'next';

import AuthCarousel from '@/features/auth/components/layout/auth-carousel';
import AuthFormHeader from '@/features/auth/components/layout/auth-form-header';
import { SLIDES } from '@/features/auth/data';

export const metadata: Metadata = {
  title: 'User Portal | C-ride',
  description: 'Authenticate to access your personalized delivery dashboard.',
};

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-[#FDFDFB] px-6 py-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — STICKY */}
        <div className="hidden md:block sticky top-8 h-[calc(100vh-4rem)]">
          <div className="h-full">
            <AuthCarousel slides={SLIDES} />
          </div>
        </div>

        {/* RIGHT — SCROLLS */}
        <div className="bg-white rounded-3xl border border-border px-4  py-8 md:py-10 md:px-10">
          <AuthFormHeader />
          {children}
        </div>
      </div>
    </section>
  );
}
