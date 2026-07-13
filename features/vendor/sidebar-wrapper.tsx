'use client';

import { useState } from 'react';
import Sidebar from '@/components/navigation/sidebar';
import { VENDOR_SIDEBAR_CONFIG } from '@/config/sidebar';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  sideBarCard: React.ReactNode;
};

export default function VendorSidebarWrapper({ sideBarCard }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* SIDEBAR */}
      <div
        className={`
          w-72 max-w-[85vw]
          bg-white
          transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:static inset-y-0 left-0 z-50
          overflow-y-auto
        `}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          config={VENDOR_SIDEBAR_CONFIG}
          storeCard={sideBarCard}
        />
      </div>

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center gap-3 px-4 py-4 shadow bg-white z-40 h-fit w-full">
        <IconButton
          onClick={() => setSidebarOpen(true)}
          ariaLabel="Open sidebar"
        >
          <MenuIcon size={20} />
        </IconButton>

        <Link href="/vendor/onboarding">
          <Image
            src="/assets/svg/logo-main.svg"
            alt="C-ride Logo"
            priority
            width={100}
            height={32}
          />
        </Link>
      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}
    </>
  );
}
