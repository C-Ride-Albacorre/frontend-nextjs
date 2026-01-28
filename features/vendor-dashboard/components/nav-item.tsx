import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type NavItemProps = {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  count?: number;
};

export default function NavItem({
  label,
  icon: Icon,
  href = '#',
  active,
  count,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-lg transition
        ${
          active
            ? 'bg-neutral-100 text-neutral-900 font-medium'
            : 'text-neutral-600 hover:bg-neutral-100'
        }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        {label}
      </div>

      {count && (
        <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">
          {count}
        </span>
      )}
    </Link>
  );
}
