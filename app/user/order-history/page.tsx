'use client';

import { useState } from 'react';

import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import Header from '@/components/ui/headers/user-route-header';
import {
  Ban,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Funnel,
  MessageCircle,
  Phone,
  RefreshCcw,
  Search,
  Star,
} from 'lucide-react';
import StatCard from '@/components/layout/stat-card';
import Card from '@/components/layout/card';
import { RouteItem } from '@/features/user/track-order/components/section';
import { Button } from '@/components/ui/buttons/button';
import Avatar from '@/components/ui/avatar';
import { orders } from '@/features/user/order-history/data';
import OrderCard from '@/features/user/order-history/components/order-card';

const orderOptions = [
  { label: 'All Orders', value: 'all' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'In Transit', value: 'in-transit' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function OrderHistoryPage() {
  const [filter, setFilter] = useState(orderOptions[0].value);
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <Header />

      <div className="flex items-center gap-4 w-full">
        <Input
          placeholder="Search by order ID, type, or location..."
          leftIcon={<Search size={12} className="text-primary-text-100" />}
          className="w-full flex-1"
          variant="fill"
          spacing="none"
        />

        <div
          className="
        w-48"
        >
          <Select
            id="orders"
            spacing="none"
            options={orderOptions}
            onChange={(value) => setFilter(value)}
            value={filter}
            leftIcon={<Funnel size={12} className="text-primary-text-100" />}
            variant="fill"
            className="w-48"
          />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Spent" value="₦21,000.00" />
        <StatCard title="Orders Placed" value="15" />
        <StatCard title="Cancelled Orders" value="2" />
      </section>

      <section className="space-y-8">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
    </main>
  );
}
