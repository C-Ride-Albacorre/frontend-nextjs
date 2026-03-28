// features/user/order/store.ts
import { create } from 'zustand';
import { toast } from 'sonner';
import {
  createOrderAction,
  initializePaymentAction,
  verifyPaymentAction,
} from './action';
import { useCartStore } from '@/features/user/delivery/store';

export type Order = {
  id: string;
  amount?: number;
  items?: any[];
};

type OrderStore = {
  order: Order | null;
  isLoading: boolean;

  createOrder: (payload: any) => Promise<Order | null>;
  initializePayment: () => Promise<void>;
  verifyPayment: (reference: string) => Promise<void>;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  order: null,
  isLoading: false,

  createOrder: async (payload) => {
    set({ isLoading: true });

    const res = await createOrderAction(payload);

    set({ isLoading: false });

    if (!res.success) {
      toast.error(res.error);
      return null;
    }

    set({ order: res.data });

    return res.data;
  },

  initializePayment: async () => {
    const { order } = get();

    if (!order) {
      toast.error('No order found');
      return;
    }

    const res = await initializePaymentAction({
      orderId: order.id,
      paymentMethod: 'CARD',
      callbackUrl: `${window.location.origin}/payment/callback`,
    });

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    window.location.href = res.data.checkoutUrl;
  },

  verifyPayment: async (reference) => {
    const res = await verifyPaymentAction(reference);

    if (!res.success) {
      toast.error(res.error);
      return;
    }

    set({ order: res.data });

    useCartStore.getState().clearCart();
  },
}));