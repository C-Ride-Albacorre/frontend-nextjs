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
  valueClassName,
  valueInfo,
  footNote,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  iconBackground?: string;
  trend?: string;
  trendDuration?: string;
  positive?: boolean;
  negative?: boolean;
  valueClassName?: string;
  valueInfo?: string;
  footNote?: string;
}) {
  return (
    <Card
      gap="sm"
      spacing="sm"
      className={`group bg-white rounded-xl border p-4 ${iconBackground && 'group-hover:bg-primary'} transition-colors cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">{title}</p>

        {icon && (
          <div
            className={` group-hover:bg-[#FBF7EB] group-hover:text-primary w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square  ${iconBackground} transition-transform `}
          >
            {icon}
          </div>
        )}
      </div>

      {valueInfo && <p className="text-sm text-neutral-500">{valueInfo}</p>}

      <p className={`text-3xl font-medium ${valueClassName}`}>{value}</p>

      {trend && (
        <div
          className={clsx('text-xs flex items-center gap-1.5 ', {
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

      {footNote && (
        <p className="text-xs md:text-sm text-neutral-500">{footNote}</p>
      )}
    </Card>
  );
}
