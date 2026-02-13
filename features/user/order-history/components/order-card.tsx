'úse client';

import { useState } from 'react';

import Card from '@/components/layout/card';
import {
  Ban,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  RefreshCcw,
  Star,
} from 'lucide-react';
import { RouteItem } from '../../track-order/components/section';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';
import { orders } from '../data';
import ReorderConfirmation from './reorder-confirmation';

export default function OrderCard({ order }: { order: (typeof orders)[0] }) {

  const [openReorderModal, setOpenReorderModal] = useState(false);
  return (
    <>
      <Card key={order.id} gap="md" className="bg-foreground-200 h-full">
        <div>
          <div className="flex items-center gap-4">
            <span
              className="flex items-center justify-center p-2 text-xs text-white rounded-full w-max gap-1"
              style={{ backgroundColor: order.statusColor }}
            >
              {order.status === 'confirmed' ? (
                <CheckCircle2 size={12} />
              ) : (
                <Ban size={12} />
              )}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>

            <p className="text-sm text-neutral-500">{order.id}</p>
          </div>

          <div className="flex items-end justify-between">
            <p className="font-medium text-sm">{order.service}</p>

            <div className="text-right space-y-4">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Calendar size={14} />
                <p>{order.date}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Clock size={14} />
                <p>{order.time}</p>
              </div>
            </div>
          </div>
        </div>

        <Card border="none" spacing="none" gap="md">
          <div className="flex flex-col md:flex-row gap-8">
            <RouteItem
              title="Pickup"
              address={order.pickup.address}
              time={order.pickup.time}
            />

            <RouteItem
              title="Drop-off"
              address={order.dropoff.address}
              time={order.dropoff.time}
              highlight
            />
          </div>
        </Card>

        <div className="border-t border-border pt-8 space-y-6">
          <p className="font-medium text-sm">Your Driver</p>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 ">
            <div className="flex items-center gap-4">
              <Avatar
                src={order.driver.avatar}
                alt="driver"
                name={order.driver.name}
                size={54}
              />

              <div className="text-sm space-y-3">
                <p className="font-medium">{order.driver.name}</p>
                <p className="text-xs flex items-center gap-1">
                  <Star size={14} fill="#D4AF37" stroke="0" />
                  {order.driver.rating}{' '}
                  <span className="text-neutral-400">
                    ({order.driver.trips} trips)
                  </span>
                </p>
              </div>
            </div>

            <p className="text-sm font-medium">{order.amount}</p>

            <div className="flex gap-3">
              <Button
                leftIcon={<RefreshCcw size={16} />}
                onClick={() => setOpenReorderModal(true)}
                variant="primary"
                size="sm"
                className="shadow"
              >
                Re-order
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Download size={16} />}
                className="shadow"
              >
                Receipt
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Reorder Confirmation Modal */}
      {openReorderModal && <ReorderConfirmation isModalOpen={openReorderModal} onClose={() => setOpenReorderModal(false)} order={order} />}

    </>
  );
}
