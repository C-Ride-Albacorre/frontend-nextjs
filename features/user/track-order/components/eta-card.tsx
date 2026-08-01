'use client';

import {
  Clock3,
  Store,
  Truck,
  CircleCheckBig,
  MapPin,
  Bike,
  RefreshCw,
} from 'lucide-react';

type Props = {
  eta: string;
  status: string;
};

export default function EtaCard({ eta, status }: Props) {
  const config = (() => {
    switch (status) {
      case 'ORDER_ASSIGNED':
        return {
          title: 'Heading to Store',
          description: 'Driver is on the way to collect your order.',
          icon: <Store size={22} />,
          color: 'bg-blue-500',
          badge: 'bg-blue-500/10 text-blue-600',
          progress: 0,
        };

      case 'PICKED_UP':
      case 'IN_TRANSIT':
        return {
          title: 'On the Way',
          description: 'Your order is on its way to you.',
          icon: <Truck size={22} />,
          color: 'bg-primary',
          badge: 'bg-primary/10 text-primary',
          progress: 1,
        };

      case 'DELIVERED':
        return {
          title: 'Delivered',
          description: 'Your order has arrived.',
          icon: <CircleCheckBig size={22} />,
          color: 'bg-green-500',
          badge: 'bg-green-500/10 text-green-600',
          progress: 2,
        };

      default:
        return {
          title: 'Preparing',
          description: 'Waiting for live tracking updates.',
          icon: <Clock3 size={22} />,
          color: 'bg-yellow-500',
          badge: 'bg-yellow-500/10 text-yellow-700',
          progress: 0,
        };
    }
  })();

  return (
    <section className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 via-white to-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${config.badge}`}
          >
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

            Live Tracking
          </div>

          <h2 className="mt-4 text-xl font-semibold">{config.title}</h2>

          <p className="mt-1 text-sm text-neutral-500">
            {config.description}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${config.color}`}
        >
          {config.icon}
        </div>
      </div>

      {/* ETA */}
      <div className="py-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight">{eta}</h1>

        <p className="mt-2 text-sm text-neutral-500">
          Estimated Arrival
        </p>
      </div>

      {/* Route */}
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-primary" />

          <div className="relative mx-2 flex-1">
            <div className="h-1 rounded-full bg-neutral-200" />

            {config.progress >= 1 && (
              <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-primary" />
            )}

            {config.progress === 1 && (
              <Bike
                size={18}
                className="absolute left-2/3 -translate-x-1/2 -top-2 text-primary"
              />
            )}
          </div>

          <div
            className={`h-3 w-3 rounded-full ${
              config.progress === 2
                ? 'bg-primary'
                : 'bg-neutral-300'
            }`}
          />
        </div>

        <div className="flex justify-between text-xs text-neutral-500">
          <span>Store</span>

          <span>Your Location</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
        <RefreshCw size={12} className="animate-spin" />

        Updated just now
      </div>
    </section>
  );
}