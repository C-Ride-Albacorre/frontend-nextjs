import {
  ActivityIcon,
  DollarSign,
  LucideIcon,
  MapPin,
  TriangleAlert,
  TruckIcon,
  UserCheck,
  Package,
  Store,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  ShoppingBag,
  Truck,
  Navigation,
  TrendingUp,
  BadgeCheck,
  BookOpen,
  Users,
  LayoutDashboard,
  ShieldCheck,
  FileText,
  CreditCard,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { Activity } from 'react';

export type NavItemProps = {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  count?: number;
  onClose?: () => void;
};

export type SidebarItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  count?: number;
};

export type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

export type SidebarConfig = {
  sections: SidebarSection[];
  portalName: string;
  logoHref: string;
  showStoreCard?: boolean;
  showAdminCard?: boolean;
};

export const VENDOR_SIDEBAR: SidebarSection[] = [
  {
    title: 'Main Menu',
    items: [
      {
        label: 'Orders',
        icon: ShoppingBag,
        href: '/vendor/orders',
      },
      {
        label: 'Products',
        icon: Package,
        href: '/vendor/products',
      },
      {
        label: 'Store',
        icon: Store,
        href: '/vendor/store',
      },
    ],
  },
  {
    title: 'Business Tools',
    items: [
      {
        label: 'Promotions',
        icon: Tag,
        href: '/vendor/promotions',
      },
      {
        label: 'Analytics',
        icon: BarChart3,
        href: '/vendor/analytics',
      },
      {
        label: 'Performance',
        icon: TrendingUp,
        href: '/vendor/performance',
      },
      {
        label: 'Delivery',
        icon: Truck,
        href: '/vendor/delivery',
      },
      {
        label: 'Active Deliveries',
        icon: Navigation,
        href: '/vendor/active-deliveries',
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        label: 'Tutorials & Tips',
        icon: BookOpen,
        href: '/vendor/tutorials-tips',
      },
      {
        label: 'Partner Program',
        icon: BadgeCheck,
        href: '/vendor/partner-program',
      },
      {
        label: 'Onboarding',
        icon: Settings,
        href: '/vendor/onboarding',
      },
    ],
  },
  {
    items: [
      {
        label: 'Logout',
        icon: LogOut,
        href: '/logout',
      },
    ],
  },
];

const ADMIN_SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/admin/dashboard',
      },
      {
        label: 'Analytics',
        icon: BarChart3,
        href: '/admin/analytics',
      },
    ],
  },
  {
    title: 'User Management',
    items: [
      {
        label: 'Driver Onboarding',
        icon: TruckIcon,
        href: '/admin/driver-onboarding',
      },
      {
        label: 'Vendor Onboarding',
        icon: Store,
        href: '/admin/vendor-onboarding',
      },
      {
        label: 'Customer Accounts',
        icon: Users,
        href: '/admin/customer-accounts',
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        label: 'All Deliveries',
        icon: Package,
        href: '/admin/all-deliveries',
      },
      {
        label: 'Dispatch Panel',
        icon: ActivityIcon,
        href: '/admin/dispatch-panel',
      },
      {
        label: 'Dispute Resolution',
        icon: HelpCircle,
        href: '/admin/support-tickets',
      },
    ],
  },
  {
    title: 'Financial',
    items: [
      {
        label: 'Platform Earnings',
        icon: TrendingUp,
        href: '/admin/platform-earnings',
      },
      {
        label: 'Vendor Payouts',
        icon: CreditCard,
        href: '/admin/vendor-payouts',
      },
      {
        label: 'Pricing Rules',
        icon: DollarSign,
        href: '/admin/pricing-rules',
      },
      {
        label: 'Promotions',
        icon: Tag,
        href: '/admin/promotions',
      },
    ],
  },
  {
    title: 'Analytics & Metrics',
    items: [
      {
        label: 'Driver Performance',
        icon: UserCheck,
        href: '/admin/driver-performance',
      },
      {
        label: 'Customer Analytics',
        icon: Users,
        href: '/admin/customer-analytics',
      },
      {
        label: 'Vendor Analytics',
        icon: ShoppingBag,
        href: '/admin/vendor-analytics',
      },
    ],
  },
  {
    title: 'Security & System',
    items: [
      {
        label: 'Fraud Detection',
        icon: TriangleAlert,
        href: '/admin/fraud-detection',
      },
      {
        label: 'Zone Management',
        icon: MapPin,
        href: '/admin/zone-management',
      },
      {
        label: 'System Logs',
        icon: FileText,
        href: '/admin/system-logs',
      },
      {
        label: 'Global Settings',
        icon: Settings,
        href: '/admin/settings',
      },
    ],
  },
  {
    items: [
      {
        label: 'Logout',
        icon: LogOut,
        href: '/logout',
      },
    ],
  },
];

// Full sidebar configs
export const VENDOR_SIDEBAR_CONFIG: SidebarConfig = {
  sections: VENDOR_SIDEBAR,
  portalName: 'Vendor Portal',
  logoHref: '/vendor/onboarding',
  showStoreCard: true,
  showAdminCard: false,
};

export const ADMIN_SIDEBAR_CONFIG: SidebarConfig = {
  sections: ADMIN_SIDEBAR_SECTIONS,
  portalName: 'Admin Portal',
  logoHref: '/admin',
  showStoreCard: false,
  showAdminCard: true,
};
