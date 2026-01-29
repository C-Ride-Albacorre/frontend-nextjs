'use client';

import Image from 'next/image';
import { useState } from 'react';
import Sidebar from '@/features/vendor-dashboard/layout/sidebar';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { IconButton } from '@/components/ui/buttons/icon-button';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FDFDFB] overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`
    fixed inset-y-0 left-0 z-50
    w-[90vw] max-w-xs lg:w-72
    h-screen
    transition-transform duration-300 ease-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0
  `}
      >
        <Sidebar
          active="onboarding"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* MAIN */}
      <div className="flex flex-1 flex-col lg:pl-72">
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-4 shadow bg-white shrink-0 z-40">
          <IconButton
            onClick={() => setSidebarOpen(true)}
            ariaLabel="Open sidebar"
          >
            <MenuIcon size={20} />
          </IconButton>

          <Link href="/vendor/dashboard">
            <Image
              src="/assets/svg/logo-main.svg"
              alt="C-ride Logo"
              width={100}
              height={32}
              priority
            />
          </Link>
        </div>

        {/* CONTENT SCROLLS */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}
    </div>
  );
}
