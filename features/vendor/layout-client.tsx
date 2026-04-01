'use client';

import Sidebar from '@/components/navigation/sidebar';
import { VENDOR_SIDEBAR_CONFIG } from '@/config/sidebar';
import { useState } from 'react';
import VendorStoreCard from './store-card';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { Link, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { StoreData } from './store/types';

type Props = {
  children: React.ReactNode;
  store: StoreData | null;
};

export default function VendorLayoutClient({ store, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FDFDFB] overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`
          w-[90vw] max-w-xs lg:w-72
          bg-white
          transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:static inset-y-0 left-0 z-50
        `}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          config={VENDOR_SIDEBAR_CONFIG}
          storeCard={<VendorStoreCard store={store} />}
        />
      </div>

      {/* MAIN */}
      <div className="flex flex-1 flex-col">
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-4 shadow bg-white sticky top-0 z-40">
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

        {/* PAGE CONTENT (natural scroll) */}
        <main className="flex-1  overflow-y-auto overscroll-contain">
          {children}
        </main>
      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}
    </div>
  );
}
