'use client';

import { useState } from 'react';

import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import StatCard from '@/components/layout/stat-card';
import { Clock, MapPin, Navigation, Package, Truck } from 'lucide-react';
import SectionLayout from '@/components/layout/section-layout';
import MainLayout from '@/components/layout/main-layout';
import VendorToolbar from '@/components/layout/vendor-tool-bar';
import ActiveDeliveriesCard from '@/features/vendor/active-deliveries/components/active-cards';
import { activeOrders } from '@/features/vendor/active-deliveries/data';
import { li } from 'framer-motion/client';

const STATUS = ['All status', 'Active', 'Preparing', 'In Transit', 'Nearby'];

export default function VendorActiveDeliveriesPage() {
  const [sort, setSort] = useState('');
  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <StatCard
              title="Total Active"
              value="5"
              icon={<Package size={18} className="text-primary" />}
              iconBackground="bg-primary/10"
            />

            <StatCard
              title="Preparing"
              value="1"
              icon={<Package size={18} className="text-[#155DFC]" />}
              iconBackground="bg-[#2B7FFF1A]"
            />

            <StatCard
              title="In Transit"
              value="25"
              icon={<Truck size={18} className="text-[#F54900]" />}
              iconBackground="bg-[#FF69001A]"
            />

            <StatCard
              title="Nearby"
              value="1"
              icon={<MapPin size={18} className="text-[#00C950]" />}
              iconBackground="bg-[#00C9501A]"
            />

            <StatCard
              title="Avg. Prep Time"
              value="28 mins"
              icon={<Clock size={18} className="text-primary-text-100" />}
              iconBackground="bg-neutral-100"
            />
          </div>

          <VendorToolbar
            sort={sort}
            onSortChange={setSort}
            categories={STATUS}
            filterPlaceholder="All status"
            searchPlaceholder="Search order ID, customer, or driver"
            updatedAt="9:56:49 PM"
          />

          <ul className="space-y-8">
            {activeOrders.map((order) => (
              <li key={order.orderId}>
                <ActiveDeliveriesCard {...order} />
              </li>
            ))}
          </ul>
        </SectionLayout>
      </MainLayout>
    </>
  );
}
