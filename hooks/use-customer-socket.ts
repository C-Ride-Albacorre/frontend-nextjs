'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import { useCustomerStore } from '@/store/socket';

const SOCKET_URL = 'https://backend-service-1rc7.onrender.com';

type RouteLeg = 'to-vendor' | 'to-customer';

interface DriverLocationPayload {
  lat: number;
  lng: number;
  heading?: number;
}

interface OrderStatusPayload {
  status: string;
  history?: unknown[];
}

interface EtaPayload {
  leg: RouteLeg;
  etaSeconds: number;
}

interface PolylinePayload {
  leg: RouteLeg;
  polyline: string;
}

export function useCustomerSocket(orderId?: string, accessToken?: string) {
  const socketRef = useRef<Socket | null>(null);

  const setSocket = useCustomerStore((s) => s.setSocket);

  const setDriverLocation = useCustomerStore((s) => s.setDriverLocation);

  const setEta = useCustomerStore((s) => s.setEta);

  const setPolyline = useCustomerStore((s) => s.setPolyline);

  const setOrderStatus = useCustomerStore((s) => s.setOrderStatus);

  const setHistory = useCustomerStore((s) => s.setHistory);

  useEffect(() => {
    console.log('⚡ useCustomerSocket');

    console.log('Order ID:', orderId);

    console.log('Access Token:', accessToken);

    if (!orderId) {
      console.warn('No orderId provided.');
      return;
    }

    if (!accessToken) {
      console.warn('No access token provided.');
      return;
    }

    const socket = io(`${SOCKET_URL}/map`, {
      transports: ['websocket'],

      auth: {
        token: accessToken,
      },

      query: {
        orderId,
      },

      reconnection: true,

      reconnectionAttempts: Infinity,

      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    setSocket(socket);

    /**
     * Connected
     */

    socket.on('connect', () => {
      console.log('✅ Connected:', socket.id);

      socket.emit('subscribe-order', orderId);

      socket.emit('trackOrder', orderId);
    });

    /**
     * Driver Location
     */

    socket.on('driver-location', (payload: DriverLocationPayload) => {
      console.log('📍 driver-location', payload);

      setDriverLocation(payload);
    });

    /**
     * ETA
     */

    socket.on('eta-update', ({ leg, etaSeconds }: EtaPayload) => {
      console.log('⏱ ETA', leg, etaSeconds);

      setEta(leg, etaSeconds);
    });

    /**
     * Polyline
     */

    socket.on('polyline-update', ({ leg, polyline }: PolylinePayload) => {
      console.log('🛣 Polyline', leg);

      setPolyline(leg, polyline);
    });

    /**
     * Order Status
     */

    socket.on('order-status', (payload: OrderStatusPayload) => {
      console.log('📦 Order Status', payload);

      setOrderStatus(payload.status);

      if (payload.history) {
        setHistory(payload.history);
      }
    });

    /**
     * Debug
     */

    socket.onAny((event, ...args) => {
      console.log('📡', event, args);
    });

    /**
     * Errors
     */

    socket.on('connect_error', (err) => {
      console.error('❌ Socket Error:', err.message);
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Disconnected:', reason);
    });

    return () => {
      console.log('Closing customer socket...');

      socket.disconnect();

      socketRef.current = null;

      setSocket(null);
    };
  }, [
    orderId,
    accessToken,
    setSocket,
    setDriverLocation,
    setEta,
    setPolyline,
    setOrderStatus,
    setHistory,
  ]);
}
