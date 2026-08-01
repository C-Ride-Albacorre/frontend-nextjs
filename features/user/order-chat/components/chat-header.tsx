'use client';

import { ArrowLeft, MessageCircle, Wifi, WifiOff } from 'lucide-react';

import { useChatStore } from '@/store/chat-store';
import Avatar from '@/components/ui/avatar';

type Driver = {
  id: string;
  fullName: string;
  phone: string;
  photo: string | null;
  rating: number;
  totalTrips: number;
  status: string;
};

type Props = {
  orderId: string;
  driver?: Driver;
};

export default function ChatHeader({ orderId, driver }: Props) {
  const connected = useChatStore((state) => state.connected);

  return (
    <header
      className="
        flex
        items-start
        justify-between
        px-6
        pt-8
        pb-5
     
        border-b
        border-border
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Avatar
            size={52}
            name={driver?.fullName}
            src={driver?.photo ?? undefined}
          />

          <div className="space-y-1">
            <h4
              className="
                font-semibold

                text-lg

                capitalize

                leading-none
              "
            >
              {driver?.fullName ?? 'Assigned Driver'}
            </h4>

            <p
              className="
                text-xs
                text-neutral-500
              "
            >
              {driver?.status === 'BUSY' ? 'On a trip' : 'Available'}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`
          flex
          items-center
          gap-2
          px-3
          py-1.5
          rounded-full
          text-[10px]
          font-medium
          ${
            connected
              ? 'bg-green-500/10 text-green-600'
              : 'bg-neutral-500/10 text-neutral-500'
          }
        `}
      >
        {connected ? (
          <>
            <Wifi size={12} />
            Live
          </>
        ) : (
          <>
            <WifiOff size={12} />
            Reconnecting
          </>
        )}
      </div>
    </header>
  );
}
