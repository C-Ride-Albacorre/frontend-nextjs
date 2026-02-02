'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Bell,
  Package,
  Store,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  ClipboardList,
  Star,
  X,
} from 'lucide-react';

import NavItem from '../../features/vendor/dashboard/components/nav-item';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { usePathname } from 'next/navigation';

export default function Sidebar({ onClose }: { onClose: () => void }) {
  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName === path;
  };

  return (
    <aside className="h-screen w-full bg-white border-r border-border flex flex-col pb-12 md:pb-16 ">
      {/* ================= HEADER ================= */}
      <div className="shrink-0 border-b border-border px-6 py-6 bg-white z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Link href="/vendor/dashboard" onClick={onClose}>
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

          <span className="text-xs text-neutral-500">Vendor Portal</span>
        </div>
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 lg:px-6 py-6 space-y-12">
        {/* STORE CARD */}
        <div className="rounded-2xl bg-primary/10 border border-border p-4 space-y-4">
          <div>
            <p className="font-medium text-primary-text-100">
              The Place Restaurant
            </p>
            <span className="text-xs text-neutral-400">
              Victoria Island, Lagos
            </span>
          </div>

          <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-500 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-600">
            <Star size={14} fill="#10B981" />
            Premium Partner
          </span>

          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Store Rating</span>
            <span className="font-medium text-primary">4.9/5.0</span>
          </div>
        </div>

        {/* NAV */}
        <nav className="space-y-6 text-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase text-neutral-400">Main Menu</p>
            <NavItem
              label="Orders"
              icon={ClipboardList}
              active={isActive('/vendor/orders')}
              href="/vendor/orders"
              onClose={onClose}
            />
            <NavItem
              label="Products"
              icon={Package}
              active={isActive('/vendor/products')}
              href="/vendor/products"
              onClose={onClose}
            />
            <NavItem
              label="Store"
              icon={Store}
              active={isActive('/vendor/store')}
              href="/vendor/store"
              onClose={onClose}
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase text-neutral-400">Business Tools</p>
            <NavItem
              label="Promotions"
              icon={Tag}
              href="/vendor/promotions"
              onClose={onClose}
            />
            <NavItem
              label="Analytics"
              icon={BarChart3}
              active={isActive('/vendor/analytics')}
              href="/vendor/analytics"
              onClose={onClose}
            />
          </div>

          <div className="space-y-2">
            <NavItem
              label="Settings"
              icon={Settings}
              href="/vendor/settings"
              onClose={onClose}
            />
            <NavItem
              label="Logout"
              icon={LogOut}
              href="/logout"
              onClose={onClose}
            />

            <NavItem
              label="Onboarding"
              icon={Settings}
              active={isActive('/vendor/dashboard')}
              href="/vendor/dashboard"
              onClose={onClose}
            />
          </div>
        </nav>
      </div>
    </aside>
  );
}
