'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bell, Shield, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { IconButton } from '@/components/ui/buttons/icon-button';
import { SidebarConfig, VENDOR_SIDEBAR_CONFIG } from '@/config/sidebar';
import NavItem from './nav-item';
import Logout from '@/features/auth/components/logout/logout';

type SidebarProps = {
  onClose: () => void;
  config?: SidebarConfig;
  storeCard?: React.ReactNode;
  userRole?: 'SUPER_ADMIN' | 'ADMIN' | 'VENDOR' | 'DRIVER' | 'CUSTOMER';
};

export default function Sidebar({
  onClose,
  config = VENDOR_SIDEBAR_CONFIG,
  storeCard,
  userRole,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path) || pathname === path;
  };

  return (
    <aside className="h-screen w-full bg-white border-r border-border flex flex-col pb-12 md:pb-16">
      {/* HEADER */}
      <div className="shrink-0 border-b border-border px-6 py-6 bg-white z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Link href={config.logoHref} onClick={onClose}>
              <Image
                src="/assets/svg/logo-main.svg"
                alt="C-ride Logo"
                width={120}
                height={48}
                priority
              />
            </Link>

            <IconButton
              onClick={onClose}
              ariaLabel="Close sidebar"
              className="lg:hidden"
            >
              <X size={20} />
            </IconButton>

            <div className="relative hidden lg:flex">
              <Bell size={22} className="text-neutral-600" />
              <span className="absolute -top-3 -right-3 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center shadow-md">
                3
              </span>
            </div>
          </div>

          <span className="text-xs text-neutral-500">{config.portalName}</span>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 lg:px-6 py-6 space-y-12">
        {config.showStoreCard && storeCard}

        {config.showAdminCard && (
          <div className="rounded-2xl bg-primary/10 border border-border p-4 space-y-2">
            <div>
              <p className="font-medium text-primary-text-100 text-sm">
                Admin User
              </p>
              <span className="text-xs text-neutral-400">Admin@c-ride.ng</span>
            </div>

            <div>
              <span className="flex w-fit items-center justify-center gap-0.5 rounded-full bg-[#10B981]/20  px-1 py-1  text-[8px] text-[#10B981] border border-[#10B981] ">
                <Shield strokeWidth={0} size={12} fill="#10B981" />
                {userRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </div>
        )}

        {/* NAV */}
        <nav className="space-y-6 text-sm">
          {config.sections.map((section, sectionIndex) => {
            const filteredItems = section.items.filter((item) => {
              if (!item.role || item.role === 'ALL') return true;

              // SUPER_ADMIN can see everything
              if (userRole === 'SUPER_ADMIN') return true;

              return item.role === userRole;
            });

            if (!filteredItems.length) return null;

            return (
              <div key={sectionIndex} className="space-y-2">
                {section.title && (
                  <p className="text-xs capitalize text-neutral-400">
                    {section.title}
                  </p>
                )}

                {filteredItems.map((item) =>
                  item.label === 'Logout' ? (
                    <div key={item.href || item.label}>
                      <Logout onClose={onClose} />
                    </div>
                  ) : (
                    <NavItem
                      key={item.href || item.label}
                      label={item.label}
                      icon={item.icon}
                      active={isActive(item.href)}
                      href={item.href}
                      count={item.count}
                      onClose={onClose}
                    />
                  ),
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
