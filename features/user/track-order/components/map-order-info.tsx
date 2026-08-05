'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import Card from '@/components/layout/card';
import { CheckCircle, Clock, LoaderCircle, Smile } from 'lucide-react';

import {
  GoogleMap,
  Marker,
  OverlayView,
  Polyline,
  useLoadScript,
} from '@react-google-maps/api';

import PolylineUtil from '@mapbox/polyline';

import { RouteItem } from '@/features/user/track-order/components/section';
import { STEPS } from '@/features/user/track-order/data';
import { normalizeRouteLeg, useCustomerStore } from '@/store/socket';
import RatingsModal from './ratings-modal';
import ExpiredModal from './expired';

const STATUS_TEXT: Record<string, string> = {
  PENDING: 'Waiting for driver',
  ORDER_ASSIGNED: 'Driver assigned',
  PREPARING: 'Restaurant is preparing your order',
  PICKED_UP: 'Driver picked up your order',
  IN_TRANSIT: 'Driver is on the way',
  DELIVERED: 'Order delivered',
  CANCELLED: 'Order cancelled',
};

const STATUS_STEP: Record<string, number> = {
  PENDING: 1,
  ORDER_ASSIGNED: 2,
  PREPARING: 3, // if your backend ever sends it
  PICKED_UP: 4,
  IN_TRANSIT: 5,
  DELIVERED: 6,
  CANCELLED: 0,
};

export default function MapOrderInfo({ orderData }: { orderData: any }) {
  const [isRatingsModalOpen, setIsRatingsModalOpen] = useState(false);

  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);

  const driver = useCustomerStore((s) => s.tracking.driverLocation);

  const etaToVendor = useCustomerStore((s) => s.tracking.eta.toVendor);

  const etaToCustomer = useCustomerStore((s) => s.tracking.eta.toCustomer);

  const toVendorPolyline = useCustomerStore(
    (s) => s.tracking.polylines.toVendor,
  );

  const toCustomerPolyline = useCustomerStore(
    (s) => s.tracking.polylines.toCustomer,
  );

  const setActiveOrder = useCustomerStore((s) => s.setActiveOrder);
  const setOrderStatus = useCustomerStore((s) => s.setOrderStatus);
  const setDriverLocation = useCustomerStore((s) => s.setDriverLocation);
  const setEta = useCustomerStore((s) => s.setEta);
  const setPolyline = useCustomerStore((s) => s.setPolyline);
  const setHistory = useCustomerStore((s) => s.setHistory);
  const orderStatus =
    useCustomerStore((s) => s.tracking.orderStatus) ?? orderData.order.status;

  const hasHydrated = useRef(false);

  useEffect(() => {
    hasHydrated.current = false;
  }, [orderData?.order?.id]);

  // Fallback: Request polyline if missing but socket is connected
  const socket = useCustomerStore((s) => s.socket);

  useEffect(() => {
    if (!socket || !orderData?.order?.id) return;

    // If we don't have polylines but socket is connected, request them
    if (!toVendorPolyline && !toCustomerPolyline) {
      console.log('📍 Requesting polyline from server...');
      socket.emit('request-polyline', { orderId: orderData.order.id });
    }
  }, [socket, orderData?.order?.id, toVendorPolyline, toCustomerPolyline]);

  useEffect(() => {
    if (!orderData || hasHydrated.current) return;

    setActiveOrder({
      store_lat: orderData.store.lat,
      store_lng: orderData.store.lng,
      pickup_location: orderData.order.pickupLocation,
      dropoff_location: orderData.order.dropoffLocation,
    });

    setOrderStatus(orderData.order.status);

    setHistory(orderData.order.statusHistory ?? []);

    if (orderData.tracking?.driverLocation) {
      setDriverLocation(orderData.tracking.driverLocation);
    }

    const leg = normalizeRouteLeg(orderData.tracking?.leg);

    if (leg && typeof orderData.tracking?.etaSeconds === 'number') {
      setEta(leg, orderData.tracking.etaSeconds);
    }

    if (leg && orderData.tracking?.polyline) {
      setPolyline(leg, orderData.tracking.polyline);
    }

    hasHydrated.current = true;
  }, [
    orderData,
    setActiveOrder,
    setOrderStatus,
    setHistory,
    setDriverLocation,
    setEta,
    setPolyline,
  ]);

  /**
   * Center fallback
   */
  const center = useMemo(() => {
    if (!orderData) return;

    // Prioritize driver location, fallback to vendor store
    if (driver) {
      return {
        lat: Number(driver.lat),
        lng: Number(driver.lng),
      };
    }

    return {
      lat: orderData.store.lat,
      lng: orderData.store.lng,
    };
  }, [orderData, driver]);

  /**
   * Decode polyline
   */
  const vendorRoute = useMemo(() => {
    if (!toVendorPolyline) return [];

    return PolylineUtil.decode(toVendorPolyline).map(([lat, lng]) => ({
      lat,
      lng,
    }));
  }, [toVendorPolyline]);

  const customerRoute = useMemo(() => {
    if (!toCustomerPolyline) return [];

    return PolylineUtil.decode(toCustomerPolyline).map(([lat, lng]) => ({
      lat,
      lng,
    }));
  }, [toCustomerPolyline]);
  /**
   * Follow driver
   */
  useEffect(() => {
    if (!driver || !mapRef.current) return;

    mapRef.current.panTo({
      lat: Number(driver.lat),
      lng: Number(driver.lng),
    });
  }, [driver]);

  const isToCustomer =
    orderStatus === 'PICKED_UP' ||
    orderStatus === 'IN_TRANSIT' ||
    etaToCustomer != null;

  const isToVendor = !isToCustomer;

  const eta = isToCustomer
    ? (etaToCustomer ?? etaToVendor)
    : (etaToVendor ?? etaToCustomer);

  const etaText = useMemo(() => {
    if (eta == null) return;

    if (eta < 60) return `${eta} sec`;

    return `${Math.ceil(eta / 60)} min`;
  }, [eta]);

  const initialEtaRef = useRef<number | null>(null);

  useEffect(() => {
    if (eta == null) return;

    if (initialEtaRef.current == null || eta > initialEtaRef.current) {
      initialEtaRef.current = eta;
    }
  }, [eta]);

  const progress = useMemo(() => {
    const initial = initialEtaRef.current;

    if (initial == null || eta == null) return 0;

    const diff = initial - eta;

    const value = (diff / initial) * 100;

    return Math.max(0, Math.min(100, value));
  }, [eta]);

  useEffect(() => {
    initialEtaRef.current = null;
  }, [isToCustomer]);

  const smoothProgress = useRef(0);

  const displayedProgress = useMemo(() => {
    const target = progress;

    smoothProgress.current += (target - smoothProgress.current) * 0.1;

    return smoothProgress.current;
  }, [progress]);

  const statusText =
    STATUS_TEXT[orderStatus ?? 'PENDING'] ?? 'Waiting for driver';

  const activeStep =
    orderStatus === 'CANCELLED'
      ? 0
      : (STATUS_STEP[orderStatus ?? 'PENDING'] ?? 1);

  useEffect(() => {
    if (
      orderStatus === 'DELIVERED' &&
      orderData.assignment.status !== 'EXPIRED'
    ) {
      setIsRatingsModalOpen(true);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (orderData.assignment.status === 'EXPIRED') {
      setIsExpiredModalOpen(true);
    }
  }, [orderData]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const fitBounds = () => {
    if (!mapRef.current) return;

    const bounds = new google.maps.LatLngBounds();

    if (driver) {
      bounds.extend({
        lat: Number(driver.lat),
        lng: Number(driver.lng),
      });
    }

    bounds.extend({
      lat: Number(orderData.store.lat),
      lng: Number(orderData.store.lng),
    });

    bounds.extend({
      lat: Number(orderData.order.dropoffLocation.latitude),
      lng: Number(orderData.order.dropoffLocation.longitude),
    });

    mapRef.current.fitBounds(bounds);
  };

  const driverIcon = useMemo(() => {
    if (!isLoaded || !window.google) return undefined;

    return {
      url:
        'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
          <circle cx="20" cy="20" r="16" fill="#22C55E" stroke="white" stroke-width="3"/>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(40, 40),
    };
  }, [isLoaded]);

  if (!isLoaded)
    return (
      <Card
        border="none"
        className="bg-foreground-200 h-105 mx-auto p-6 space-y-8 flex flex-col items-center justify-center gap-4"
      >
        <LoaderCircle size={24} className="animate-spin text-primary" />

        <p className="text-sm text-primary">Loading map...</p>
      </Card>
    );

  return (
    <>
      <div className="space-y-8">
        {/* MAP */}
        <Card border="none" className="bg-foreground-200">
          <div className="h-105 overflow-hidden rounded-xl shadow">
            <GoogleMap
              center={center}
              zoom={14}
              mapContainerStyle={{
                width: '100%',
                height: '100%',
              }}
              onLoad={(map) => {
                mapRef.current = map;
                fitBounds();
              }}
            >
              {/* DRIVER */}
              {driver && (
                <Marker
                  position={{
                    lat: Number(driver.lat),
                    lng: Number(driver.lng),
                  }}
                  icon={driverIcon}
                />
              )}

              {/* STORE */}
              {orderData && (
                <>
                  {/* Store logo if available */}
                  {orderData.store.logo && (
                    <OverlayView
                      position={{
                        lat: orderData.store.lat,
                        lng: orderData.store.lng,
                      }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-white shadow-md">
                        <img
                          src={orderData.store.logo}
                          alt="store"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </OverlayView>
                  )}
                  {/* Fallback: simple red circle if no logo */}
                  {!orderData.store.logo && (
                    <Marker
                      position={{
                        lat: orderData.store.lat,
                        lng: orderData.store.lng,
                      }}
                      title="Store"
                      icon={{
                        url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2728%22 height=%2728%22 viewBox=%220 0 28 28%22%3E%3Ccircle cx=%2714%22 cy=%2714%22 r=%2711%22 fill=%22%23EF4444%22 stroke=%22white%22 stroke-width=%221.5%22/%3E%3C/svg%3E',
                        scaledSize: new google.maps.Size(28, 28),
                      }}
                    />
                  )}
                </>
              )}

              {/* CUSTOMER */}
              {orderData?.order?.dropoffLocation && (
                <Marker
                  position={{
                    lat: Number(orderData.order.dropoffLocation.latitude),
                    lng: Number(orderData.order.dropoffLocation.longitude),
                  }}
                  title="Customer Location"
                  icon={{
                    url:
                      'data:image/svg+xml;charset=UTF-8,' +
                      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="52" viewBox="0 0 42 52">
          <path
            d="M21 2C11.6 2 4 9.6 4 19c0 13.2 17 31 17 31s17-17.8 17-31C38 9.6 30.4 2 21 2z"
            fill="#3B82F6"
            stroke="white"
            stroke-width="2"
          />
          <path
            d="M15 23l6-5 6 5v7h-4v-5h-4v5h-4z"
            fill="white"
          />
        </svg>
      `),
                    scaledSize: new google.maps.Size(42, 52),
                  }}
                />
              )}

              {/* ROUTE */}
              {/* VENDOR ROUTE */}
              {vendorRoute.length > 0 && (
                <>
                  <Polyline
                    path={vendorRoute}
                    options={{
                      strokeColor: '#FFFFFF', // white border
                      strokeOpacity: 1,
                      strokeWeight: 16,
                    }}
                  />
                  <Polyline
                    path={vendorRoute}
                    options={{
                      strokeColor: '#000000', // black
                      strokeOpacity: 0.8,
                      strokeWeight: 8,
                    }}
                  />
                </>
              )}

              {/* CUSTOMER ROUTE */}
              {customerRoute.length > 0 && (
                <>
                  <Polyline
                    path={customerRoute}
                    options={{
                      strokeColor: '#FFFFFF', // white border
                      strokeOpacity: 1,
                      strokeWeight: 7,
                    }}
                  />
                  <Polyline
                    path={customerRoute}
                    options={{
                      strokeColor: '#000000', // black
                      strokeOpacity: 0.9,
                      strokeWeight: 5,
                    }}
                  />
                </>
              )}
            </GoogleMap>
          </div>

          {/* ETA */}
          <Card border="none" gap="md" className="bg-white shadow">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-primary" />

                <h2
                  className="
                font-semibold"
                >
                  {isToCustomer
                    ? `Driver is on the way to your location `
                    : `Driver is heading to pickup location`}
                </h2>
              </div>

              <span className="font-medium bg-green-100/10 text-green-100 text-[10px] px-2 py-1 rounded-md border border-green-100/30">
                {etaText}
              </span>
            </div>

            <div className="h-2 rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${displayedProgress}%` }}
              />
            </div>
          </Card>
        </Card>

        {/* STATUS */}
        <Card
          border="none"
          gap="md"
          className="flex items-start gap-4 bg-primary/10"
        >
          <Smile size={20} />

          <div className="space-y-3">
            <h2 className="font-medium text-sm">Order Code</h2>

            <h1 className="text-3xl font-semibold">{orderData?.order.code}</h1>
          </div>
        </Card>

        {/* PROGRESS */}
        <Card border="none" gap="md" className="bg-foreground-200">
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
                    <div className="absolute left-5 top-8 h-full w-0.5 bg-primary" />
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

                  <div className="mt-2">
                    <p className="font-medium text-sm">{step.label}</p>
                    {/* <p className=" text-neutral-500 text-xs">{step.date}</p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ROUTE */}
        <Card border="none" gap="md" className="bg-foreground-200">
          <h3 className="font-medium">Delivery Route</h3>

          <div className="flex flex-col gap-8">
            <RouteItem
              title={orderData?.store?.name ?? 'Store'}
              address={orderData?.store?.address}
              highlight={isToVendor}
              storeLogo={orderData?.store?.logo ?? ''}
            />

            <RouteItem
              title="Drop-off"
              address={orderData?.order.dropoffLocation?.address ?? ''}
              highlight={isToCustomer}
            />
          </div>
        </Card>
      </div>

      <RatingsModal
        driver={orderData.driver}
        orderId={orderData?.order.id}
        isOpen={isRatingsModalOpen}
      />

      <ExpiredModal driver={orderData.driver} isOpen={isExpiredModalOpen} />
    </>
  );
}
