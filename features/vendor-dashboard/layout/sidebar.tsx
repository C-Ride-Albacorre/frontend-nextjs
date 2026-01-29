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
import { IconButton } from '@/components/ui/buttons/icon-button';

type Props = {
  active?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ active, isOpen, onClose }: Props) {
  return (
    <aside className="h-screen w-full bg-white border-r border-border flex flex-col">
      <div className="flex-1 overflow-y-auto py-6">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-border pb-6 px-6">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center">
              <Link href="/vendor/dashboard" onClick={onClose}>
                <Image
                  src="/assets/svg/logo-main.svg"
                  alt="C-ride Logo"
                  width={120}
                  height={40}
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
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </div>
            </div>

            <span className="text-xs text-neutral-500 mt-2">Vendor Portal</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-12 px-4 lg:px-6 pt-6">
          {/* STORE */}
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

            <div className="space-y-2">
              <p className="text-xs uppercase text-neutral-400">
                Business Tools
              </p>
              <NavItem
                label="Promotions"
                icon={Tag}
                href="/vendor/promotions"
              />
              <NavItem
                label="Analytics"
                icon={BarChart3}
                href="/vendor/analytics"
              />
            </div>

            <div className="space-y-2">
              <NavItem
                label="Settings"
                icon={Settings}
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
  );
}
