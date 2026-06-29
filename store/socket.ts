import { create } from 'zustand';
import { Socket } from 'socket.io-client';

export interface DriverLocation {
  lat: number;
  lng: number;
  heading?: number;
}

export interface ActiveOrderProps {
  assigned_at: string;
  created_at: string;

  distance_meters: number;

  order_id: string;
  order_number: string;

  order_status: string;

  total_amount: number;

  rn: string;

  store_id: string;
  store_lat: number;
  store_lng: number;
  store_logo: string;
  store_name: string;

  pickup_location: {
    address: string;
    latitude: number;
    longitude: number;
    storeId: string;
    storeName: string;
  };

  dropoff_location: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
    state: string;

    /**
     * Add these if your backend returns them.
     * Otherwise remove them until available.
     */
    latitude?: number;
    longitude?: number;
  };

  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface TrackingState {
  driverLocation: DriverLocation | null;

  eta: {
    toVendor: number | null;
    toCustomer: number | null;
  };

  polylines: {
    toVendor: string | null;
    toCustomer: string | null;
  };

  orderStatus: string | null;

  history: unknown[];
}

type RouteLeg = 'to-vendor' | 'to-customer';

type CustomerState = {
  /**
   * SOCKET
   */
  socket: Socket | null;

  setSocket: (socket: Socket | null) => void;

  /**
   * ACTIVE ORDER
   */
  activeOrder: ActiveOrderProps | null;

  setActiveOrder: (order: ActiveOrderProps | null) => void;

  /**
   * TRACKING
   */
  tracking: TrackingState;

  setDriverLocation: (location: DriverLocation | null) => void;

  setEta: (leg: RouteLeg, eta: number | null) => void;

  setPolyline: (leg: RouteLeg, polyline: string | null) => void;

  setOrderStatus: (status: string | null) => void;

  setHistory: (history: unknown[]) => void;

  clearTracking: () => void;

  /**
   * INCOMING ORDERS
   */
  incomingOrders: ActiveOrderProps[];

  addOrder: (order: ActiveOrderProps) => void;

  removeOrder: (orderId: string) => void;

  clearOrders: () => void;
};

const initialTrackingState: TrackingState = {
  driverLocation: null,

  eta: {
    toVendor: null,
    toCustomer: null,
  },

  polylines: {
    toVendor: null,
    toCustomer: null,
  },

  orderStatus: null,

  history: [],
};

export const useCustomerStore = create<CustomerState>((set) => ({
  /**
   * SOCKET
   */

  socket: null,

  setSocket: (socket) =>
    set({
      socket,
    }),

  /**
   * ACTIVE ORDER
   */

  activeOrder: null,

  setActiveOrder: (order) =>
    set({
      activeOrder: order,
    }),

  /**
   * TRACKING
   */

  tracking: initialTrackingState,

  setDriverLocation: (location) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        driverLocation: location,
      },
    })),

  setEta: (leg, eta) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        eta: {
          ...state.tracking.eta,
          [leg === 'to-vendor' ? 'toVendor' : 'toCustomer']: eta,
        },
      },
    })),

  setPolyline: (leg, polyline) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        polylines: {
          ...state.tracking.polylines,
          [leg === 'to-vendor' ? 'toVendor' : 'toCustomer']: polyline,
        },
      },
    })),

  setOrderStatus: (status) =>
    set((state) => ({
      tracking: {
        ...state.tracking,
        orderStatus: status,
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
      tracking: initialTrackingState,
    }),

  /**
   * INCOMING ORDERS
   */

  incomingOrders: [],

  addOrder: (order) =>
    set((state) => ({
      incomingOrders: [
        order,
        ...state.incomingOrders.filter(
          (existing) => existing.order_id !== order.order_id,
        ),
      ],
    })),

  removeOrder: (orderId) =>
    set((state) => ({
      incomingOrders: state.incomingOrders.filter(
        (order) => order.order_id !== orderId,
      ),
    })),

  clearOrders: () =>
    set({
      incomingOrders: [],
    }),
}));
