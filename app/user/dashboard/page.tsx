import {
  Box,
  Wallet,
  MapPin,
  Clock,
  User,
  Star,
  CreditCard,
  Gift,
  HelpCircle,
} from 'lucide-react';

import {
  AccountItem,
  Reward,
} from '@/features/user/dashboard/components/section';

import QuickAction from '@/features/user/dashboard/components/quick-action';

import DeliverySummary from '@/features/user/dashboard/components/delivery-summary';
import Address from '@/features/user/dashboard/components/address';
import DashboardHeader from '@/components/ui/headers/user-dashboard-header';

import ActiveDeliveries from '@/features/user/dashboard/components/active-deliveries';
import { dashboardService } from '@/features/user/dashboard/service/dashboard';

export default async function DashboardPage() {
  const { data } = await dashboardService();

  return (
    <main className="w-full bg-background">
      {/* ================= HEADER ================= */}

      <DashboardHeader name={data.name} />

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-6xl px-6 py-10 space-y-12">
        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <QuickAction
            icon={<Box className="text-primary" />}
            label="Delivery"
          />
          <QuickAction
            icon={<Wallet className="text-green-100" />}
            label="Wallet"
          />
          <QuickAction
            icon={<MapPin className="text-green-100" />}
            label="Track Order"
          />
          <QuickAction
            icon={<Clock className="text-primary" />}
            label="Schedule"
          />
        </div>

        <ActiveDeliveries />

        {/* LOCATIONS + SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LOCATIONS */}
          <Address />

          {/* SUMMARY */}
          <DeliverySummary />
        </div>

        {/* ACCOUNT & SERVICES */}
        <div className="space-y-6">
          <h3 className="font-semibold">Account & Services</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AccountItem icon={<Clock />} label="Order History" />
            <AccountItem icon={<User />} label="Profile & Addresses" />
            <AccountItem
              icon={<CreditCard />}
              label="Payment Methods"
              badge="Add Card"
            />
            <AccountItem icon={<Star />} label="Rate & Review" />
            <AccountItem
              icon={<Gift />}
              label="Loyalty Rewards"
              badge="2850 pts"
            />
            <AccountItem icon={<HelpCircle />} label="Help Center" />
          </div>
        </div>

        <Reward />
      </section>
    </main>
  );
}
