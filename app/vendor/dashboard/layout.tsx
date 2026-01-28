'use client';

import { useState } from 'react';
import Sidebar from '@/features/vendor-dashboard/layout/sidebar';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#FDFDFB] md:px-8">
      {/* SIDEBAR */}
      <Sidebar
        active="onboarding"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN WRAPPER */}
      <div
        className={`
          relative flex-1 transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-72' : 'translate-x-0'}
        `}
      >
        {/* MOBILE TOP BAR */}
    { !sidebarOpen&&   <div className="md:hidden flex items-center gap-3 px-6 py-4 border-b border-border bg-white">
          <button onClick={() => setSidebarOpen(true)}>
            <img
              src="/assets/svg/logo-main.svg"
              alt="Open menu"
              className="h-8"
            />
          </button>
        </div>}

        {/* CONTENT */}
        <main>
          {children}
        </main>

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
