import { CheckCircle, MapPin } from 'lucide-react';

export function RouteItem({
  title,
  address,
  time,
  highlight,
}: {
  title: string;
  address: string;
  time: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square ${
          highlight
            ? 'bg-primary/10 text-primary'
            : ' bg-[#9CA3AF1A] text-neutral-400'
        }
       `}
      >
        <MapPin size={18} />
      </div>

      <div className="space-y-3">
        <p className="font-medium flex items-center gap-3">
          {title}
          {!highlight && <CheckCircle size={16} className="text-primary" />}
        </p>
        <p className="text-sm text-neutral-500">{address}</p>
        <p className={`text-sm text-primary`}>{time}</p>
      </div>
    </div>
  );
}
