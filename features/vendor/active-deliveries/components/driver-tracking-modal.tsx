'use client';

import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  MessageSquare,
  Navigation,
  Package,
  Phone,
  Star,
  User,
} from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Status = keyof typeof map;

const map = {
  done: {
    bg: 'bg-[#00C950]',
    text: 'text-neutral-900',
    icon: <CheckCircle size={20} className="text-white" />,
  },
  current: {
    bg: 'bg-linear-to-b from-primary to-primary-hover',
    text: 'text-primary',
    icon: <Package size={20} className="text-white" />,
  },
  pending: {
    bg: 'bg-neutral-200',
    text: 'text-neutral-400',
    icon: <Package size={20} className="text-neutral-400" />,
  },
} as const;

const Step = ({
  label,
  icon,
  active,
  current,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  current?: boolean;
  disabled?: boolean;
}) => {
  const base = 'flex items-center gap-3';

  const styles = active
    ? 'text-white'
    : current
      ? 'text-white font-medium'
      : 'text-neutral-400';

  const bg = active
    ? 'bg-[#00C950]'
    : current
      ? 'bg-linear-to-b from-primary to-primary-hover'
      : 'bg-neutral-200';

  return (
    <div className={`${base} ${styles}`}>
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center ${bg}`}
      >
        {icon}
      </div>
      <span className="text-primary-text-100">{label}</span>
    </div>
  );
};

const DesktopStep = ({ label, status }: { label: string; status: Status }) => {
  const map = {
    done: {
      bg: 'bg-[#00C950]',
      text: 'text-neutral-900',
      icon: <CheckCircle size={20} className="text-white" />,
    },
    current: {
      bg: 'bg-linear-to-b from-primary to-primary-hover',
      text: 'text-primary',
      icon: <Package size={20} className="text-white" />,
    },
    pending: {
      bg: 'bg-neutral-200',
      text: 'text-neutral-400',
      icon: <Package size={20} className="text-neutral-400" />,
    },
  };

  const data = map[status];

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center ${data.bg}`}
      >
        {data.icon}
      </div>
      <span className={`text-xs ${data.text}`}>{label}</span>
    </div>
  );
};

export default function DriverTrackingModal({ open, onClose }: Props) {
  return (
    <Modal isModalOpen={open} onClose={onClose}>
      <div className="space-y-8 py-4">
        {/* ================= HEADER ================= */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-medium">
              Track Driver – <span className="text-neutral-500">#CR-2850</span>
            </h2>

            <div className="flex gap-4 ">
              <div className=" flex justify-center items-center gap-2 rounded-full px-3 py-1.5 text-xs text-[#10B981] bg-[#10B981]/10">
                <div className="bg-[#10B981] w-2 h-2 rounded-full"></div>
                <p>Live Tracking Active</p>
              </div>

              <div className="rounded-full bg-primary/10 px-3 py-1.5  text-xs text-primary flex items-center gap-2">
                ETA: 21 mins
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAP PREVIEW ================= */}
        <div className="relative h-64 rounded-xl border border-border bg-linear-to-br from-[#F1FAFF] to-[#F4FFF7]">
          <div className="absolute flex items-center justify-center gap-2 top-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs shadow-sm ">
            <div className="bg-[#FB2C36] w-2 h-2 rounded-full"></div>
            <p>Live Tracking</p>
          </div>

          <div className="absolute bottom-4 left-4 space-y-2">
            <MapBtn label="+" />
            <MapBtn label="-" />
            <MapBtn icon={<Navigation size={14} />} />
          </div>
        </div>

        {/* ================= STATS ================= */}
        <Card
          gap="sm"
          spacing="md"
          className="p-4 bg-foreground-200 flex flex-col md:flex-row md:items-center gap-4"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 shrink-0 aspect-square">
            <Clock size={18} className="text-primary" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-around flex-1 gap-6 md:gap-0">
            <Stat label="Estimated Time" value="21 mins" />
            <Stat label="Distance Remaining" value="1.1 km" />
            <Stat label="Current Speed" value="45 km/h" />
          </div>
        </Card>

        {/* ================= PROGRESS ================= */}
        <Card gap="md" spacing="md" className="p-4">
          {/* Header */}
          <div className="flex justify-between text-sm">
            <span>Delivery Progress</span>
            <span className="text-primary font-medium">65%</span>
          </div>

          {/* ================= MOBILE ================= */}
          <div className="flex gap-6 md:hidden">
            {/* Vertical bar */}
            <div className="relative w-2 rounded-full bg-neutral-200 overflow-hidden">
              <div
                className="absolute top-0 w-full bg-primary rounded-full"
                style={{ height: '65%' }}
              />
            </div>

            {/* Steps */}
            <div className="flex flex-col justify-between flex-1 text-xs gap-6">
              <Step active label="Prepared" icon={<CheckCircle size={18} />} />
              <Step active label="Picked Up" icon={<CheckCircle size={18} />} />
              <Step current label="In Transit" icon={<Package size={18} />} />
              <Step disabled label="Delivered" icon={<Package size={18} />} />
            </div>
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:block space-y-3">
            {/* Horizontal bar */}
            <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
              <div className="h-full w-[65%] bg-primary rounded-full" />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 text-xs text-center">
              <DesktopStep status="done" label="Prepared" />
              <DesktopStep status="done" label="Picked Up" />
              <DesktopStep status="current" label="In Transit" />
              <DesktopStep status="pending" label="Delivered" />
            </div>
          </div>
        </Card>

        {/* ================= INFO CARDS ================= */}
        <Card className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card gap="md" className="p-4 mb-0">
            <div className="flex gap-2 items-center">
              <User size={20} className="text-primary" />

              <span className="font-medium text-sm">Delivery Information</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Avatar src="/assets/image/driver.jpg" name="Ibrahim Musa" size={44} />

              <div className="text-sm space-y-2">
                <p className="font-medium">Ibrahim Musa</p>
                <p className="text-neutral-500 flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-0.5">
                    <Star size={14} fill="#D4AF37" stroke="0" />

                    <Star size={14} fill="#D4AF37" stroke="0" />

                    <Star size={14} fill="#D4AF37" stroke="0" />

                    <Star size={14} fill="#D4AF37" stroke="0" />

                    <Star size={12} className="text-neutral-400" />
                  </span>{' '}
                  4.8 / 5.0
                </p>
                <p className="text-sm">+234 805 678 9012</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <Button
                variant="green"
                leftIcon={<Phone size={16} />}
                className="w-full text-white"
              >
                Call
              </Button>
              <Button
                variant="outline"
                leftIcon={<MessageSquare size={16} />}
                className="w-full bg-white"
              >
                Message
              </Button>
            </div>
          </Card>

          <Card gap="md" className="p-4">
            <div className="flex gap-2 items-center">
              <MapPin size={20} className="text-[#10B981]" />

              <span className="font-medium text-sm">Destination Details</span>
            </div>
            <ul className="text-sm space-y-4">
              <li className="space-y-1">
                <p className="text-neutral-500">Customer:</p>

                <p>Okafor Chioma</p>
              </li>

              <li className="space-y-1">
                <p className="text-neutral-500">Delivery Address</p>

                <p> Banana Island Estate, Ikoyi</p>
              </li>

              <li className="font-medium pt-4 border-t border-border flex justify-between items-center">
                <p>Total Fee</p>

                <p className="text-primary">₦18,500</p>
              </li>
            </ul>
          </Card>
        </Card>

        {/* ================= ORDER ITEMS ================= */}
        <Card gap="md" className="p-4">
          <div className="flex gap-2 items-center">
            <Package size={20} className="text-primary" />

            <span className="font-medium text-sm">Order Items (3)</span>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between items-center text-neutral-500">
              Afang Soup{' '}
              <span className="w-8 h-8 rounded-full border border-border flex justify-center items-center text-primary-text-100">
                x2
              </span>
            </li>
            <li className="flex justify-between items-center text-neutral-500">
              Pounded Yam{' '}
              <span className="w-8 h-8 rounded-full border border-border flex justify-center items-center text-primary-text-100">
                x2
              </span>
            </li>
            <li className="flex justify-between items-center text-neutral-500">
              Grilled Fish{' '}
              <span className="w-8 h-8 rounded-full border border-border flex justify-center items-center text-primary-text-100">
                x2
              </span>
            </li>
          </ul>
        </Card>

        {/* ================= LIVE UPDATES ================= */}
        <Card gap="md" className="p-4">
          <div className="flex gap-2 items-center">
            <Navigation size={20} className="text-primary" />

            <span className="font-medium text-sm">Live Updates</span>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="text-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-[#10B981]"
                  />
                  <p>Driver is on the fastest route</p>
                </div>

                <time className="pl-4 text-xs text-neutral-400">Just now</time>
              </div>
            </li>

            <li className="text-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-yellow-600"
                  />
                  <p>Order picked up from restaurant</p>
                </div>

                <time className="pl-4 text-xs text-neutral-400">
                  5 mins ago
                </time>
              </div>
            </li>

            <li className="text-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-neutral-500"
                  />
                  <p>Driver arrived at restaurant</p>
                </div>
              </div>
            </li>
          </ul>
        </Card>

        {/* ================= SUPPORT ================= */}
        <div className="rounded-2xl bg-linear-to-r from-black to-primary-text-100 p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row  md:items-center  gap-4 sm:gap-6">
            <div className="w-12 h-12 shrink-0 aspect-square bg-primary/10 rounded-full flex items-center justify-center">
              <AlertCircle className="text-primary " />
            </div>

            <div className="text-sm text-white flex-1 space-y-2">
              <p>Need help with this delivery?</p>
              <p className="text-neutral-400">Support is available 24/7</p>
            </div>

            <button className="rounded-xl border border-primary px-4 py-2 text-sm text-primary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ================= SMALL INTERNAL COMPONENTS ================= */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-0 flex flex-col md:items-center gap-4">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function MapBtn({ label, icon }: { label?: string; icon?: React.ReactNode }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow hover:bg-neutral-100">
      {icon ?? label}
    </button>
  );
}
