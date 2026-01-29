'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Bell,
  Box,
  Store,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  ClipboardList,
  Star,
  X,
} from 'lucide-react';
import NavItem from '../components/nav-item';

type Props = {
  active?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ active, isOpen, onClose }: Props) {
  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
           inset-y-0 left-0 z-50 w-[90%] max-w-xs
          bg-white border-r border-border
          transform transition-transform duration-300
          md:static md:translate-x-0 md:w-72
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-full flex-col overflow-y-auto py-6">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-border pb-6 px-6">
            <div className="flex flex-col gap-1">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/assets/svg/logo-main.svg"
                  alt="C-ride Logo"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
              <span className="text-xs text-neutral-500 mt-2">
                Vendor Portal
              </span>
            </div>

            {/* Close on mobile */}
            <button
              onClick={onClose}
              className="md:hidden rounded-lg p-2 hover:bg-neutral-100"
            >
              <X size={20} />
            </button>

            {/* Bell desktop */}
            <div className="relative hidden md:flex">
              <Bell size={22} className="text-neutral-600" />
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 space-y-10 px-6 pt-6">
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
            <nav className="space-y-10 text-sm">
              {/* MAIN */}
              <div className="space-y-4">
                <p className="text-xs uppercase text-neutral-400">Main Menu</p>

                <NavItem
                  label="Orders"
                  icon={ClipboardList}
                  count={12}
                  active={active === 'orders'}
                  href="/vendor/orders"
                />

                <NavItem
                  label="Products"
                  icon={Box}
                  active={active === 'products'}
                  href="/vendor/products"
                />

                <NavItem
                  label="Store"
                  icon={Store}
                  active={active === 'store'}
                  href="/vendor/store"
                />
              </div>

              {/* BUSINESS */}
              <div className="space-y-4">
                <p className="text-xs uppercase text-neutral-400">
                  Business Tools
                </p>

                <NavItem
                  label="Promotions"
                  icon={Tag}
                  active={active === 'promotions'}
                  href="/vendor/promotions"
                />

                <NavItem
                  label="Analytics"
                  icon={BarChart3}
                  active={active === 'analytics'}
                  href="/vendor/analytics"
                />
              </div>

              {/* SETTINGS */}
              <div className="space-y-4">
                <NavItem
                  label="Settings"
                  icon={Settings}
                  active={active === 'settings'}
                  href="/vendor/settings"
                />

                <NavItem
                  label="Onboarding"
                  icon={Settings}
                  active={active === 'onboarding'}
                  href="/vendor/onboarding"
                />

                <NavItem label="Logout" icon={LogOut} href="/logout" />
              </div>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
