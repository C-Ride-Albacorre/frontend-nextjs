import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import AuthCarousel from '@/features/auth/components/layout/auth-carousel';
import { AuthCarouselType } from '@/features/auth/types';
import AuthFormHeader from '@/features/auth/components/layout/auth-form-header';

export const metadata: Metadata = {
  title: 'Create Account | C-ride',
  description: 'Create a new account and begin delivery at your doorstep.',
};

const slides: AuthCarouselType[] = [
  {
    src: '/assets/image/signup-1.jpg',
    title: 'Compassionate Care',
    subtitle: 'Your health journey starts with trust and empathy.',
  },
  {
    src: '/assets/image/signup-2.jpg',
    title: 'Expert Professionals',
    subtitle: 'Connect with certified specialists anytime.',
  },
  {
    src: '/assets/image/signup-3.jpg',
    title: 'Secure & Private',
    subtitle: 'Your data is protected with industry standards.',
  },
  {
    src: '/assets/image/signup-4.jpg',
    title: 'Care That Moves With You',
    subtitle: 'Healthcare designed around your lifestyle.',
  },
];

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — STICKY */}
        <div className="hidden md:block sticky top-8 h-[calc(100vh-4rem)]">
          <AuthCarousel slides={slides} />
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
