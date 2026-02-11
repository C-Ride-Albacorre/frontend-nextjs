'use client';

import { useRouter } from 'next/navigation';

import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  ArrowLeft,
  Star,
  Phone,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  ChevronLeft,
  Navigation,
  Smile,
  Dot,
  Stars,
} from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/icon-button';
import Card from '@/components/layout/card';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons/button';

const DRIVER = { lat: 6.4389, lng: 3.4175 };
const DESTINATION = { lat: 6.4698, lng: 3.5852 };

const STEPS = [
  {
    label: 'Order Placed',
    date: 'Aug 20, 2024, 1:45 PM',
  },
  {
    label: 'Order Confirmed',
    date: 'Aug 20, 2024, 1:50 PM',
  },
  {
    label: 'Driver Assigned',
    date: 'Aug 20, 2024, 2:05 PM',
  },
  {
    label: 'Driver En Route',
    date: 'Aug 20, 2024, 2:15 PM',
  },
  {
    label: 'Out for Delivery',
    date: 'Aug 20, 2024, 2:30 PM',
  },
  {
    label: 'Delivered',
    date: 'Aug 20, 2024, 2:47 PM',
  },
];

export default function TrackingDeliveryPage() {
  const router = useRouter();

  const backHandler = () => {
    router.back();
  };

  const activeStep = 4;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-6">
          <IconButton onClick={backHandler}>
            <ChevronLeft size={24} className="cursor-pointer" />
          </IconButton>

          <div className="space-y-2">
            <h1 className=" text-xl md:text-2xl font-medium">
              Tracking Delivery
            </h1>
            <p className="text-sm text-neutral-500">CRD-2024-1234</p>
          </div>
        </div>

        <span className="rounded-full bg-[#10B981] p-2 text-xs text-white">
          On Route
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= MAP ================= */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-foreground-200">
            <div className="h-105 rounded-xl overflow-hidden border border-border">
              <Map
                initialViewState={{
                  latitude: DRIVER.lat,
                  longitude: DRIVER.lng,
                  zoom: 12,
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/light-v11"
              >
                <Marker latitude={DRIVER.lat} longitude={DRIVER.lng}>
                  <div className=" border-4 border-primary  rounded-full bg-primary text-white flex items-center justify-center shadow-md animate-pulse">
                    <Navigation
                      stroke="0"
                      fill="primary-text-100"
                      size={18}
                      className="rotate-45"
                    />
                  </div>
                </Marker>

                <Marker latitude={DESTINATION.lat} longitude={DESTINATION.lng}>
                  <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                    📍
                  </div>
                </Marker>
              </Map>
            </div>

            {/* ETA BAR */}
            <Card border="none" gap="md" className="bg-white">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-3">
                  <Clock size={16} /> Estimated Arrival
                </span>
                <span className="font-medium">12 minutes</span>
              </div>

              <div className="h-2 rounded-full bg-neutral-200">
                <div className="h-full w-[70%] bg-primary rounded-full" />
              </div>
            </Card>
          </Card>

          {/* STATUS BANNER */}
          <Card
            border="none"
            gap="md"
            className="bg-primary flex items-start gap-4"
          >
            <Smile size={24} />
            <div className="space-y-4">
              <p className="font-medium">Your order is now in care</p>
              <p className="text-sm text-neutral-500">
                Chukwudi Okonkwo is handling your delivery with premium service
              </p>
            </div>
          </Card>

          {/* DELIVERY PROGRESS */}
          <Card gap="md" className="bg-foreground-200">
            <h3 className="font-medium">Delivery Progress</h3>

            <div className="flex flex-col gap-8">
              {STEPS.map((step, index) => {
                const stepNumber = index + 1;
                const isLast = index === STEPS.length - 1;
                const isCompleted = stepNumber < activeStep;
                const isActive = stepNumber === activeStep;

                return (
                  <div key={index} className="relative flex  gap-4  text-left ">
                    {/* CONNECTOR */}
                    {!isLast && (
                      <>
                        <div className="absolute left-4 md:left-5 top-8 h-full w-0.5 bg-primary" />
                      </>
                    )}

                    {/* ICON */}
                    {isCompleted && (
                      <div className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-white shrink-0">
                        <CheckCircle size={16} />
                      </div>
                    )}

                    {/* ACTIVE ICON */}
                    {isActive && (
                      <div className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary-text-100 text-primary shrink-0">
                        <CheckCircle size={16} />
                      </div>
                    )}

                    {/* LAST ICON */}
                    {!isCompleted && !isActive && (
                      <div className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/50 text-white shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#9CA3AF]"></span>
                      </div>
                    )}

                    {/* TEXT */}
                    <div className="space-y-1.5 md:space-y-1">
                      <p className=" text-sm font-medium md:text-neutral-700 text-neutral-900">
                        {step.label}
                      </p>
                      <p className="text-xs text-neutral-500">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* ROUTE */}
          <Card gap="md" className="bg-foreground-200">
            <h3 className="font-medium">Delivery Route</h3>

            <div className="flex flex-col gap-8">
              <RouteItem
                title="Pickup"
                address="Eko Hotel Restaurant, Victoria Island"
                time="2:15 PM"
              />

              <RouteItem
                title="Drop-off"
                address="12 Admiralty Way, Lekki Phase 1"
                time="2:47 PM (ETA)"
                highlight
              />
            </div>
          </Card>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="space-y-8">
          {/* DRIVER */}
          <Card gap="md" className="bg-foreground-200">
            <h3 className="font-medium">Your Driver</h3>

            <div className="flex items-center gap-4">
              <Avatar
                src="/assets/image/driver.jpg"
                alt="driver"
                name="Chukwudi Okonkwo"
                size={54}
              />
              <div className="text-sm space-y-3">
                <p className="font-medium ">Chukwudi Okonkwo</p>
                <p className="text-xs flex items-center gap-1">
                  <Star size={14} fill="#D4AF37" stroke="0" />
                  4.9 <span className="text-neutral-400">(1247 trips)</span>
                </p>
              </div>
            </div>

            <Card border="none" gap="sm" className="text-sm bg-white">
              <p className="text-xs text-neutral-500">Vehicle</p>

              <p className="font-medium">Mercedes E-Class</p>

              <p className="text-neutral-500">LAG-567-XY</p>
            </Card>

            <div className="flex gap-3">
              <Button
                leftIcon={<Phone size={16} />}
                variant="primary-inverted"
                size="full"
              >
                Call
              </Button>
              <Button
                variant="black"
                size="full"
                leftIcon={<MessageCircle size={16} />}
              >
                Message
              </Button>
            </div>
          </Card>

          {/* ORDER DETAILS */}
          <Card gap="md" className="bg-foreground-200">
            <h3 className="font-medium">Order Details</h3>

            <ul className="space-y-6 text-sm">
              <li className="flex justify-between">
                <p className="text-neutral-500">Order ID</p>
                <p className="text-right">CRD-2024-1234</p>
              </li>

              <li className="flex justify-between">
                <p className="text-neutral-500">Type</p>
                <p className="text-right">Food Delivery</p>
              </li>

              <li className="flex justify-between">
                <p className="text-neutral-500">Delivery Fee</p>
                <p className="text-right">₦500</p>
              </li>

              <li className="flex justify-between border-t border-border pt-4">
                <p className="font-medium">Total Paid</p>
                <p className="text-right font-medium">₦1,500</p>
              </li>
            </ul>
          </Card>

          {/* SUPPORT */}
          <Card gap="md" className="bg-foreground-200">
            <div className="space-y-2">
              <h3 className="font-medium">Need Assistance?</h3>
              <p className="text-sm text-neutral-500">
                Our care team is here to help
              </p>
            </div>

            <Button
              leftIcon={<AlertCircle size={16} />}
              size="full"
              variant="red"
            >
              Report Issue
            </Button>
          </Card>

          {/* PREMIUM */}
          <Card className="bg-primary/10 flex items-start gap-4">
            <Stars size={32} className='text-primary' />

            <div className='space-y-4'>
              <p className="font-medium">Premium Service Guarantee</p>
              <p className="text-neutral-500  text-sm leading-6">
                Your delivery is handled with care by verified premium drivers
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function ProgressStep({
  label,
  time,
  done,
  active,
}: {
  label: string;
  time: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      {done ? (
        <CheckCircle className="text-primary" />
      ) : (
        <div
          className={`h-5 w-5 rounded-full ${
            active ? 'bg-black' : 'bg-neutral-300'
          }`}
        />
      )}
      <div>
        <p className={active ? 'font-medium' : ''}>{label}</p>
        <p className="text-xs text-neutral-400">{time}</p>
      </div>
    </div>
  );
}

function RouteItem({
  title,
  address,
  time,
  highlight,
}: {
  title: string;
  address: string;
  time: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square ${
          highlight
            ? 'bg-primary/10 text-primary'
            : ' bg-[#9CA3AF1A] text-neutral-400'
        }
       `}
      >
        <MapPin size={18} />
      </div>

      <div className="space-y-3">
        <p className="font-medium flex items-center gap-3">
          {title}
          {!highlight && <CheckCircle size={16} className="text-primary" />}
        </p>
        <p className="text-sm text-neutral-500">{address}</p>
        <p className={`text-sm text-primary`}>{time}</p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-neutral-500">{label}</span>
      <span className={bold ? 'font-medium' : ''}>{value}</span>
    </div>
  );
}
