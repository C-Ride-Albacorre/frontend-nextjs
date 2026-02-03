'use client';

import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorToolbar from '@/components/layout/vendor-tool-bar';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import OrderCard from '@/features/vendor/orders/components/order-card';
import StatCard from '@/features/vendor/orders/components/stat-card';
import {
  Clock,

  ShoppingBag,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = [
  'All',
  'Nigerian',
  'Chinese',
  'Indian',
  'Italian',
  'Snacks',
];

export default function OrderManagementPage() {
  const [sort, setSort] = useState('');

  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Today's Orders"
              value="24"
              trend="+12%"
              trendDuration="from last week"
              positive
              icon={<ShoppingBag size={18} className="text-green-600" />}
              iconBackground="bg-green-50"
            />
            <StatCard
              title="Revenue"
              value="₦1.2M"
              trend="+8.5%"
              trendDuration="from last week"
              positive
              icon={<TrendingUp size={18} className="text-primary" />}
              iconBackground="bg-primary/10"
            />
            <StatCard
              title="Avg. Prep Time"
              value="18 min"
              trend="-5%"
              trendDuration="from last delivery"
              negative
              icon={<Clock size={18} className="text-primary-text-100" />}
              iconBackground="bg-neutral-100"
            />
            <StatCard
              title="Rating"
              value="4.8"
              icon={<Star size={18} className="text-[#10B981]" />}
              iconBackground="bg-[#10B981]/10"
            />
          </div>

          <VendorToolbar
            title="Incoming Orders"
            searchPlaceholder="Search orders..."
            sort={sort}
            onSortChange={setSort}
            categories={CATEGORIES}
          />

          <div className="space-y-4">
            <OrderCard
              status="pending"
              customer="Adebayo Williams"
              price="₦45,000"
              action="Accept"
            />
            <OrderCard
              status="preparing"
              customer="Chioma Okafor"
              price="₦45,000"
              action="Make ready"
            />
            <OrderCard
              status="ready"
              customer="Adebayo Williams"
              price="₦45,000"
            />
            <OrderCard
              status="in transit"
              customer="Adebayo Williams"
              price="₦45,000"
            />
          </div>
        </SectionLayout>
      </MainLayout>
    </>
  );
}
