import { Button } from '@/components/ui/buttons/button';
import { Gift, ChevronRight, Link } from 'lucide-react';

export function Reward() {
  return (
    <div className="rounded-2xl bg-linear-to-r from-black to-primary-text-100 p-6 flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-white">Refer & Earn Rewards</h3>
        <p className="mt-1 text-sm text-white/70">
          Share C-Ride with friends and earn 500 points per referral
        </p>

        <button className="mt-4 rounded-xl bg-primary px-6 py-3 text-sm text-primary-text-100">
          Share Now
        </button>
      </div>

      <Gift className="h-10 w-10 text-primary/60" />
    </div>
  );
}

export function AccountItem({
  icon,
  label,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <Button
      justify="between"
      variant="outline"
      href={label.trim().toLowerCase().replace(/\s+/g, '-')}
     
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="rounded-lg bg-white border border-border p-3 text-xs">
            {badge}
          </span>
        )}
        <ChevronRight size={20} className="text-neutral-400" />
      </div>
    </Button>
  );
}
