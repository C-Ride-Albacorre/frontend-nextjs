import Card from '@/components/layout/card';
import StatCard from '@/components/layout/stat-card';
import {
    ChartPie,
  CircleArrowOutUpRight,
  DollarSign,
  Package,
  TrendingUp,
} from 'lucide-react';
import { MOCK_DATA } from '../data';
import { Period } from '../type';

export default function AnalyticsStatCards({
  data,
}: {
  data: (typeof MOCK_DATA)[Period];
}) {
  return (
    <Card gap="sm" spacing="sm" className=" p-4 shadow">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Earnings"
          value={data.stats.totalEarnings}
          valueClassName="text-xl"
          icon={<DollarSign size={18} className="text-primary" />}
          iconBackground="bg-primary/10"
          trend={data.stats.trend}
          trendDuration="from last week"
          positive={data.stats.trendType === 'positive'}
        />
        <StatCard
          title="Deliveries"
          icon={<Package size={18} className="text-primary" />}
          iconBackground="bg-primary/10"
          value={data.stats.deliveries}
          valueClassName="text-xl"
          footNote="Completed orders"
        />
        <StatCard
          title="Avg Order Value"
          value={data.stats.avgOrderValue}
          valueInfo="Per delivery"
          valueClassName="text-xl"
          icon={<TrendingUp size={18} className="text-[#00C950]" />}
          iconBackground="bg-[#00C9501A]"
        />
        <StatCard
          title="Commission Paid"
          valueInfo="10% platform fee"
          value={data.stats.commissionPaid}
          valueClassName="text-xl"
          icon={
            <ChartPie
              size={18}
              className="text-primary-text-100"
            />
          }
          iconBackground="bg-neutral-100"
        />
      </div>
    </Card>
  );
}
