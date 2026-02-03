import Card from '@/components/layout/card';
import clsx from 'clsx';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  icon,
  iconBackground,
  trend,
  positive,
  negative,
  trendDuration,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  iconBackground?: string;
  trend?: string;
  trendDuration?: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <Card gap="sm" spacing="sm" className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{title}</p>

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square ${iconBackground}`}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-medium">{value}</p>

      {trend && (
        <div
          className={clsx('text-xs flex items-center gap-1.5', {
            'text-green-600': positive,
            'text-red-600': negative,
            'text-neutral-500': !positive && !negative,
          })}
        >
          <span>{trend}</span>
          {positive && <ArrowUpRight className="w-4 h-4 text-green-600" />}
          {negative && <ArrowDownRight className="w-4 h-4 text-red-600" />}
          {trendDuration && <span>{trendDuration}</span>}
        </div>
      )}
    </Card>
  );
}
