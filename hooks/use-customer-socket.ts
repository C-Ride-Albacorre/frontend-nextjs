'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import { normalizeRouteLeg, useCustomerStore } from '@/store/socket';

const SOCKET_URL = 'https://backend-service-1rc7.onrender.com';
const LAST_TRACKED_ORDER_ID_KEY = 'customer:lastTrackedOrderId';

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
  leg: string | null;
  etaSeconds: number;
}

interface PolylinePayload {
  leg: string | null;
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

  const clearTracking = useCustomerStore((s) => s.clearTracking);

  useEffect(() => {
    const resolveOrderId = () => {
      if (orderId) {
        localStorage.setItem(LAST_TRACKED_ORDER_ID_KEY, orderId);
        return orderId;
      }

      return localStorage.getItem(LAST_TRACKED_ORDER_ID_KEY) ?? undefined;
    };

    const activeOrderId = resolveOrderId();

    console.log('⚡ useCustomerSocket');

    console.log('Order ID:', activeOrderId);

    console.log('Access Token:', accessToken);

    if (!activeOrderId) {
      console.warn('No orderId provided.');
      return;
    }

    if (!accessToken) {
      console.warn('No access token provided.');
      return;
    }

    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(`${SOCKET_URL}/map`, {
      transports: ['websocket'],

      auth: {
        token: accessToken,
      },

      query: {
        orderId: activeOrderId,
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

    const joinRoom = () => {
      socket.emit('subscribe-order', activeOrderId);
      socket.emit('trackOrder', activeOrderId);
    };

    socket.on('connect', () => {
      console.log('✅ Connected:', socket.id);

      joinRoom();
    });

    socket.io.on('reconnect', () => {
      joinRoom();
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

    socket.on('eta-update', (payload: EtaPayload) => {
      const leg = normalizeRouteLeg(payload?.leg);

      if (!leg || typeof payload?.etaSeconds !== 'number') return;

      setEta(leg, payload.etaSeconds);
    });
    /**
     * Polyline
     */

    socket.on('polyline-update', (payload: PolylinePayload) => {
      const leg = normalizeRouteLeg(payload?.leg);

      if (!leg || !payload?.polyline) return;

      setPolyline(leg, payload.polyline);
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
      console.error('❌ Socket connection failed');

      console.error(err);
    });

    return () => {
      console.log('Closing customer socket...');

      socket.removeAllListeners();

      socket.disconnect();

      socketRef.current = null;

      clearTracking();

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
    clearTracking,
  ]);
}
