'use client';

import Card from '@/components/layout/card';

import Avatar from '@/components/ui/avatar';

import { Button } from '@/components/ui/buttons/button';

import {
  Phone,
  MessageCircle,
  Star,
  Circle,
  MessageCircleDashed,
  MessageCircleMore,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

type Driver = {
  id: string;
  fullName: string;
  phone: string;
  photo: string | null;
  rating: number;
  totalTrips: number;
  status: string;
};

type DriverCardProps = {
  orderId: string;
  driver: Driver;
};

export default function DriverCard({ orderId, driver }: DriverCardProps) {
  const router = useRouter();

  const isBusy = driver.status === 'BUSY';


  console.log(  ' [DriverCard] driver info:', driver, 'isBusy:', isBusy);

  return (
    <Card border="none" gap="md" className="bg-primary/10 ">
      {/* Header */}

      <h3 className="font-medium">Your Driver</h3>

      {/* Driver */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Avatar
            size={60}
            name={driver.fullName}
            src={driver.photo ?? undefined}
          />

          <div className="flex-1 space-y-2">
            <h2 className=" font-medium capitalize">
              {driver.fullName}
            </h2>

            <div className=" flex items-center gap-3 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {driver.rating.toFixed(1)}
              </span>

              <span>•</span>

              <span>{driver.totalTrips.toLocaleString()} trips</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Circle
                size={8}
                className={
                  isBusy
                    ? 'fill-amber-500 text-amber-500'
                    : 'fill-neutral-400 text-neutral-400'
                }
              />

              <span
                className={
                  isBusy
                    ? 'text-xs font-medium text-amber-600'
                    : 'text-xs font-medium text-neutral-500'
                }
              >
                {isBusy
                  ? 'Busy'
                  : driver.status === 'ONLINE'
                    ? 'Online'
                    : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-3">
          <Button
            variant="secondary"
            leftIcon={<Phone size={16} />}
            onClick={() => {
              window.location.href = `tel:${driver.phone}`;
            }}
            size="icon"
          >
            Call Driver
          </Button>

          <Button
            leftIcon={<MessageCircleMore size={16} />}
            variant="black"
            size="icon"
            onClick={() => {
              router.push(`/user/track-order/chat?orderId=${orderId}`);
            }}
          >
            Message Driver
          </Button>
        </div>
      </div>
    </Card>
  );
}
