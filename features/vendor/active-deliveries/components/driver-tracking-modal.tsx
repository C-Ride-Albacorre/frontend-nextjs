'use client';

import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';
import {
  CheckCircle,
  Clock,
  Dot,
  MapPin,
  Navigation,
  Package,
  Phone,
  Star,
  Truck,
  X,
} from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
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
          className="p-4 bg-foreground-200 flex items-center gap-4"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 shrink-0 aspect-square">
            <Clock size={18} className="text-primary" />
          </div>

          <div className="flex items-center justify-around flex-1">
            <Stat label="Estimated Time" value="21 mins" />
            <Stat label="Distance Remaining" value="1.1 km" />
            <Stat label="Current Speed" value="45 km/h" />
          </div>
        </Card>

        {/* ================= PROGRESS ================= */}
        <Card gap="md" spacing="md" className="p-4">
            
          <div className="flex justify-between text-sm">
            <span>Delivery Progress</span>
            <span className="text-primary">65%</span>
          </div>

          <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
            <div className="h-full w-[65%] bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-4 text-xs text-center">
            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="bg-[#00C950] w-10 h-10 flex items-center justify-center shrink-0 aspect-square rounded-full">
                <CheckCircle size={20} className="text-white" />
              </div>

              <span>Prepared</span>
            </div>

            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="bg-[#00C950] w-10 h-10 flex items-center justify-center shrink-0 aspect-square rounded-full">
                <CheckCircle size={20} className="text-white" />
              </div>

              <span>Picked Up</span>
            </div>

            <div className="flex flex-col justify-center items-center space-y-2">
             <div className="bg-linear-to-b from-primary to-primary-hover w-10 h-10 flex items-center justify-center shrink-0 aspect-square rounded-full">
                <Package size={20} className="text-white" />
              </div>

              <span className='text-primary'>In Transit</span>
            </div>

            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="bg-neutral-200 w-10 h-10 flex items-center justify-center shrink-0 aspect-square rounded-full">
                <Package size={20} className="text-neutral-400" />
              </div>

              <span className="text-neutral-400">Delivered</span>
            </div>

            
          </div>
        </Card>

        {/* ================= INFO CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 space-y-4">
            <p className="font-medium">Delivery Information</p>

            <div>
              <p className="font-medium">Ibrahim Musa</p>
              <p className="text-sm text-neutral-500 flex items-center gap-1">
                <Star size={14} fill="#D4AF37" stroke="0" /> 4.8 / 5.0
              </p>
              <p className="text-sm">+234 805 678 9012</p>
            </div>

            <div className="flex gap-3">
              <button className="w-full rounded-xl bg-green-600 px-4 py-3 text-sm text-white flex items-center justify-center gap-2">
                <Phone size={16} /> Call
              </button>
              <button className="w-full rounded-xl border border-border px-4 py-3 text-sm">
                Message
              </button>
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <p className="font-medium">Destination Details</p>

            <div className="text-sm space-y-2">
              <p>
                <span className="text-neutral-500">Customer:</span> Okafor
                Chioma
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-neutral-400" />
                Banana Island Estate, Ikoyi
              </p>
              <p className="font-medium text-primary">₦18,500</p>
            </div>
          </Card>
        </div>

        {/* ================= ORDER ITEMS ================= */}
        <Card className="p-4 space-y-4">
          <p className="font-medium flex items-center gap-2">
            <Package size={18} /> Order Items (3)
          </p>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              Afang Soup <span>x2</span>
            </li>
            <li className="flex justify-between">
              Pounded Yam <span>x2</span>
            </li>
            <li className="flex justify-between">
              Grilled Fish <span>x2</span>
            </li>
          </ul>
        </Card>

        {/* ================= LIVE UPDATES ================= */}
        <Card className="p-4 space-y-4">
          <p className="font-medium flex items-center gap-2">
            <Clock size={18} /> Live Updates
          </p>

          <ul className="space-y-3 text-sm">
            <li className="text-green-600">● Driver is on the fastest route</li>
            <li className="text-yellow-600">● Order picked up (5 mins ago)</li>
            <li className="text-neutral-400">● Driver arrived at restaurant</li>
          </ul>
        </Card>

        {/* ================= SUPPORT ================= */}
        <div className="rounded-xl bg-neutral-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white">
            Need help with this delivery? <br className="sm:hidden" />
            <span className="text-neutral-400">Support is available 24/7</span>
          </p>

          <button className="rounded-xl border border-primary px-4 py-2 text-sm text-primary">
            Contact Support
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ================= SMALL INTERNAL COMPONENTS ================= */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-0 flex flex-col items-center gap-4">
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
