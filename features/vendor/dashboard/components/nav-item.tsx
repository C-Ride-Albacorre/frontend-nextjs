import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { NavItemProps } from '../type';

export default function NavItem({
  label,
  icon: Icon,
  href = '#',
  active,
  count,
  onClose,
}: NavItemProps) {
  return (
    <Link
    onClick={onClose}
      href={href}
      className={`flex items-center justify-between px-3 py-4 rounded-lg transition
        ${
          active
            ? 'bg-primary shadow text-neutral-900 font-medium'
            : 'text-neutral-600 hover:bg-neutral-100'
        }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        {label}
      </div>

      {count && (
        <span className="text-xs px-3 py-1 rounded-full bg-primary/30 text-primary border border-primary font-medium">
          {count}
        </span>
      )}

      <div>
        {active && <ChevronRight size={18}  />}
      </div>
    </Link>
  );
}
