'use client';

import { useState } from 'react';
import Sidebar from '@/features/vendor-dashboard/layout/sidebar';
import { Menu, MenuIcon } from 'lucide-react';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#FDFDFB] md:px-8">
      {/* SIDEBAR */}
      <div className='fixed z-50 overflow-y-scroll h-screen scroll-smooth'>
        <Sidebar
          active="onboarding"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* MAIN WRAPPER */}
      <div
        className={` md:ml-72
          relative flex-1 transition-transform duration-300 ease-out 
          ${sidebarOpen ? 'translate-x-72' : 'translate-x-0'}
        `}
      >
        {/* MOBILE TOP BAR */}
        <div
          className={`
    md:hidden fixed top-0 left-0 z-20 w-full
    flex items-center gap-3
    px-6 py-8 border-b border-border bg-white
    transition-all duration-300 ease-out
    ${
      sidebarOpen
        ? 'opacity-0 pointer-events-none -translate-y-2'
        : 'opacity-100 translate-y-0'
    }
  `}
        >
          <button onClick={() => setSidebarOpen(true)}>
            <MenuIcon size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <main>{children}</main>

        {/* SCRIM (NOT MODAL) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/30 md:hidden"
          />
        )}
      </div>
    </div>
  );
}
