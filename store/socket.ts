import { create } from 'zustand';
import { Socket } from 'socket.io-client';

export type OrderStatus =
  | 'ORDER_ASSIGNED'
  | 'PICKED_UP'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'IN_TRANSIT'
  | string;

type OrderLocation = {
  store_lat: number;
  store_lng: number;
  dropoff_lat: number;
  dropoff_lng: number;
  store_address?: string;
  dropoff_address?: string;
};

export type DriverLocation = {
  lat: number;
  lng: number;
  heading?: number;
};

export type RouteLeg = 'to-vendor' | 'to-customer';

export function normalizeRouteLeg(
  leg: string | null | undefined,
): RouteLeg | null {
  if (!leg) return null;

  const normalized = leg.toLowerCase().replace(/_/g, '-');

  if (normalized === 'to-vendor') return 'to-vendor';
  if (normalized === 'to-customer') return 'to-customer';

  return null;
}

type CustomerOrder = {
  store_lat: number;
  store_lng: number;
  pickup_location: {
    address: string;
  };
  dropoff_location: {
    address: string;
    latitude: number;
    longitude: number;
  };
};

type CustomerTrackingState = {
  orderStatus: OrderStatus | null;
  driverLocation: DriverLocation | null;
  eta: {
    toVendor: number | null;
    toCustomer: number | null;
  };
  polylines: {
    toVendor: string | null;
    toCustomer: string | null;
  };
  history: unknown[];
};

type CustomerStoreState = {
  socket: Socket | null;
  activeOrder: CustomerOrder | null;
  tracking: CustomerTrackingState;
  setSocket: (socket: Socket | null) => void;
  setActiveOrder: (order: CustomerOrder | null) => void;
  setOrderStatus: (status: OrderStatus) => void;
  setDriverLocation: (loc: DriverLocation | null) => void;
  setEta: (leg: RouteLeg, value: number | null) => void;
  setPolyline: (leg: RouteLeg, value: string | null) => void;
  setHistory: (history: unknown[]) => void;
  clearTracking: () => void;
};

const initialCustomerTrackingState: CustomerTrackingState = {
  orderStatus: null,
  driverLocation: null,
  eta: {
    toVendor: null,
    toCustomer: null,
  },
  polylines: {
    toVendor: null,
    toCustomer: null,
  },
  history: [],
};

type DriverJobsState = {
  /** SOCKET */
  socket: Socket | null;

  setSocket: (socket: Socket | null) => void;

  /** ORDER LIFECYCLE */

  orderStatus: OrderStatus | null;

  setOrderStatus: (status: OrderStatus) => void;
  /** TRACKING */
  driverLocation: DriverLocation | null;

  setDriverLocation: (loc: DriverLocation | null) => void;

  etaToVendor: number | null;

  etaToCustomer: number | null;

  setEta: (leg: RouteLeg, value: number | null) => void;

  polylineToVendor: string | null;
  polylineToCustomer: string | null;

  setPolyline: (leg: RouteLeg, value: string | null) => void;

  clearTracking: () => void;

  order: OrderLocation | null;

  setOrder: (order: OrderLocation | null) => void;
};

export const useDriverJobsStore = create<DriverJobsState>((set, get) => ({
  /** SOCKET */
  socket: null,

  setSocket: (socket) => set({ socket }),

  order: null,

  setOrder: (order) => set({ order }),

  /** ORDER */
  orderStatus: null,

  setOrderStatus: (status) =>
    set((state) => ({
      orderStatus: status,
    })),

  /** TRACKING */
  driverLocation: null,

  setDriverLocation: (loc) => set({ driverLocation: loc }),

  etaToVendor: null,

  etaToCustomer: null,

  setEta: (leg, value) =>
    set((state) => ({
      etaToVendor: leg === 'to-vendor' ? value : state.etaToVendor,

      etaToCustomer: leg === 'to-customer' ? value : state.etaToCustomer,
    })),

  polylineToVendor: null,

  polylineToCustomer: null,

  setPolyline: (leg, value) =>
    set((state) => ({
      polylineToVendor: leg === 'to-vendor' ? value : state.polylineToVendor,

      polylineToCustomer:
        leg === 'to-customer' ? value : state.polylineToCustomer,
    })),

  clearTracking: () =>
    set({
      driverLocation: null,
      etaToVendor: null,
      etaToCustomer: null,
      polylineToVendor: null,
      polylineToCustomer: null,
      order: null,
    }),
}));

export const useCustomerStore = create<CustomerStoreState>((set) => ({
  socket: null,
  activeOrder: null,
  tracking: initialCustomerTrackingState,

  setSocket: (socket) => set({ socket }),

  setActiveOrder: (activeOrder) => set({ activeOrder }),

  setOrderStatus: (status) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        orderStatus: status,
      },
    })),

  setDriverLocation: (loc) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        driverLocation: loc,
      },
    })),

  setEta: (leg, value) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        eta: {
          ...state.tracking.eta,
          toVendor: leg === 'to-vendor' ? value : state.tracking.eta.toVendor,
          toCustomer:
            leg === 'to-customer' ? value : state.tracking.eta.toCustomer,
        },
      },
    })),

  setPolyline: (leg, value) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        polylines: {
          ...state.tracking.polylines,
          toVendor:
            leg === 'to-vendor' ? value : state.tracking.polylines.toVendor,
          toCustomer:
            leg === 'to-customer' ? value : state.tracking.polylines.toCustomer,
        },
      },
    })),

  setHistory: (history) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        history,
      },
    })),

  clearTracking: () =>
    set({
      tracking: initialCustomerTrackingState,
    }),
}));
