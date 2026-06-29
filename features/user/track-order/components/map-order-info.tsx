'use client';

import { useEffect, useMemo, useRef } from 'react';

import Card from '@/components/layout/card';
import { CheckCircle, Clock, Loader, Smile } from 'lucide-react';

import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from '@react-google-maps/api';

import PolylineUtil from '@mapbox/polyline';

import { RouteItem } from '@/features/user/track-order/components/section';
import { STEPS } from '@/features/user/track-order/data';
import { useCustomerStore } from '@/store/socket';

const STATUS_TEXT: Record<string, string> = {
  pending: 'Waiting for driver',
  accepted: 'Driver accepted',
  preparing: 'Restaurant is preparing your order',
  picked_up: 'Driver picked up your order',
  delivering: 'Driver is on the way',
  delivered: 'Order delivered',
};

const STATUS_STEP: Record<string, number> = {
  pending: 1,
  accepted: 2,
  preparing: 3,
  picked_up: 4,
  delivering: 5,
  delivered: 6,
};

export default function MapOrderInfo() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const activeOrder = useCustomerStore((s) => s.activeOrder);

  const driver = useCustomerStore((s) => s.tracking.driverLocation);

  const etaToCustomer = useCustomerStore((s) => s.tracking.eta.toCustomer);

  const status = useCustomerStore((s) => s.tracking.orderStatus);

  const encodedPolyline = useCustomerStore(
    (s) => s.tracking.polylines.toCustomer,
  );

  const etaText = useMemo(() => {
    const eta = etaToCustomer;

    if (eta == null) return 'Waiting...';

    if (eta < 60) return `${eta} sec`;

    return `${Math.ceil(eta / 60)} min`;
  }, [etaToCustomer]);

  /**
   * Center fallback
   */
  const center = useMemo(
    () => ({
      lat: driver?.lat ?? activeOrder?.store_lat ?? 6.5244,
      lng: driver?.lng ?? activeOrder?.store_lng ?? 3.3792,
    }),
    [driver, activeOrder],
  );

  /**
   * Decode polyline
   */
  const route = useMemo(() => {
    if (!encodedPolyline) return [];

    return PolylineUtil.decode(encodedPolyline).map(
      ([lat, lng]: [number, number]) => ({
        lat,
        lng,
      }),
    );
  }, [encodedPolyline]);

  /**
   * Fit map to route
   */
  useEffect(() => {
    if (!mapRef.current || route.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    route.forEach((point: { lat: number; lng: number }) =>
      bounds.extend(point),
    );

    mapRef.current.fitBounds(bounds);
  }, [route]);

  /**
   * Follow driver
   */
  useEffect(() => {
    if (!driver || !mapRef.current) return;

    mapRef.current.panTo({
      lat: driver.lat,
      lng: driver.lng,
    });
  }, [driver]);

  // const activeStep = STATUS_STEP[status ?? 'pending'] ?? 1;

  const initialEtaRef = useRef<number | null>(null);

  useEffect(() => {
    if (etaToCustomer == null) return;

    if (initialEtaRef.current == null) {
      initialEtaRef.current = etaToCustomer;
    }
  }, [etaToCustomer]);

  const progress = useMemo(() => {
    const initial = initialEtaRef.current;

    if (!initial || !etaToCustomer) return 0;

    const diff = initial - etaToCustomer;

    return Math.max(0, Math.min(100, (diff / initial) * 100));
  }, [etaToCustomer]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded)
    return (
      <Card
        border="none"
        className="bg-foreground-200 h-20 mx-auto p-6 space-y-8 flex flex-col items-center justify-center gap-4"
      >
        <Loader size={24} className="animate-spin text-primary" />

        <p className="text-sm text-primary">Loading map...</p>
      </Card>
    );

  return (
    <div className="space-y-8">
      {/* MAP */}
      <Card border="none" className="bg-foreground-200">
        <div className="h-105 overflow-hidden rounded-xl border border-border">
          <GoogleMap
            center={center}
            zoom={14}
            mapContainerStyle={{
              width: '100%',
              height: '100%',
            }}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {/* DRIVER */}
            {driver && (
              <Marker
                position={{
                  lat: driver.lat,
                  lng: driver.lng,
                }}
              />
            )}

            {/* STORE */}
            {activeOrder && (
              <Marker
                position={{
                  lat: activeOrder.store_lat,
                  lng: activeOrder.store_lng,
                }}
              />
            )}

            {/* CUSTOMER */}
            {activeOrder?.dropoff_location.latitude &&
              activeOrder?.dropoff_location.longitude && (
                <Marker
                  position={{
                    lat: activeOrder.dropoff_location.latitude,
                    lng: activeOrder.dropoff_location.longitude,
                  }}
                />
              )}

            {/* ROUTE */}
            {route.length > 0 && (
              <Polyline
                path={route}
                options={{
                  strokeColor: '#10B981',
                  strokeOpacity: 0.9,
                  strokeWeight: 5,
                }}
              />
            )}
          </GoogleMap>
        </div>

        {/* ETA */}
        <Card border="none" gap="md" className="bg-white">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-3">
              <Clock size={16} className="text-primary" />
              Estimated Arrival
            </span>

            <span className="font-medium">{etaText}</span>
          </div>

          <div className="h-2 rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>
      </Card>

      {/* STATUS */}
      {/* <Card
        border="none"
        gap="md"
        className="flex items-start gap-4 bg-primary"
      >
        <Smile size={24} />

        <div className="space-y-3">
          <p className="font-medium">{STATUS_TEXT[status ?? 'pending']}</p>

          <p className="text-sm text-neutral-500">
            Your driver is delivering your order in real time.
          </p>
        </div>
      </Card> */}

      {/* PROGRESS */}
      {/* <Card gap="md" className="bg-foreground-200">
        <h3 className="font-medium">Delivery Progress</h3>

        <div className="flex flex-col gap-8">
          {STEPS.map((step, index) => {
            const stepNumber = index + 1;

            const isCompleted = stepNumber < activeStep;

            const isActive = stepNumber === activeStep;

            const isLast = index === STEPS.length - 1;

            return (
              <div key={step.label} className="relative flex gap-4">
                {!isLast && (
                  <div className="absolute left-4 top-8 h-full w-0.5 bg-primary" />
                )}

                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                    isCompleted
                      ? 'bg-primary text-white'
                      : isActive
                        ? 'bg-primary-text-100 text-primary'
                        : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {isCompleted || isActive ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-neutral-500" />
                  )}
                </div>

                <div>
                  <p className="font-medium">{step.label}</p>
                  <p className="text-sm text-neutral-500">{step.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card> */}

      {/* ROUTE */}
      {/* <Card gap="md" className="bg-foreground-200">
        <h3 className="font-medium">Delivery Route</h3>

        <div className="flex flex-col gap-8">
          <RouteItem
            title="Pickup"
            address={activeOrder?.pickup_location.address ?? '--'}
            time="—"
          />

          <RouteItem
            title="Drop-off"
            address={activeOrder?.dropoff_location.address ?? '--'}
            time={etaText}
            highlight
          />
        </div>
      </Card> */}
    </div>
  );
}
