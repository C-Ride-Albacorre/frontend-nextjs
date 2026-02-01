import { LucideIcon } from 'lucide-react';

export type NavItemProps = {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  count?: number;
};
