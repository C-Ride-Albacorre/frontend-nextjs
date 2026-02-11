'use client';

import Card from '@/components/layout/card';
import Map, { Marker } from 'react-map-gl/mapbox';
import { RouteItem } from '@/features/user/track-order/components/section';
import { STEPS, DRIVER, DESTINATION } from '@/features/user/track-order/data';
import { CheckCircle, Clock, Navigation, Smile } from 'lucide-react';

export default function MapOrderInfo() {
  const activeStep = 4;

  return (
    <>
      <div className="space-y-8">
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
    </>
  );
}
