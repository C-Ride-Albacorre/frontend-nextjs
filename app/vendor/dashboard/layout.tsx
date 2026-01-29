'use client';

import Image from 'next/image';

import { useState } from 'react';
import Sidebar from '@/features/vendor-dashboard/layout/sidebar';
import { MenuIcon } from 'lucide-react';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-[#FDFDFB] lg:px-8">
      {/* SIDEBAR */}
      <Sidebar
        active="onboarding"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN */}
      <div
        className="
          relative flex-1 transition-transform duration-300 ease-out"
      >
        {/* MOBILE HEADER — FIXED */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4  py-6 border-b border-border bg-white">
          <button className='flex items-center gap-4' onClick={() => setSidebarOpen(true)}>
            <div className="lg:hidden rounded-full p-2 hover:bg-neutral-100 border border-border transition">
              <MenuIcon size={20} />
            </div>

            <Image
              src="/assets/svg/logo-main.svg"
              alt="C-ride Logo"
              width={100}
              height={32}
              priority
            />
          </button>
        </div>

        {/* CONTENT */}
        <main className="pt-20 lg:pt-0 h-screen overflow-y-auto max-w-full">
          {children}
        </main>

        {/* SCRIM (VISUAL ONLY, NOT MODAL) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/30 lg:hidden z-40"
          />
        )}
      </div>
    </div>
  );
}
