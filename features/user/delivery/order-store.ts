// features/user/delivery/order-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DropoffLocation } from './types';

interface OrderState {
  deliveryOptionId: string;
  dropoffLocation: DropoffLocation | null;
  recipientName: string;
  recipientPhone: string;
  deliveryInstructions: string;

  // Post-order creation
  orderId: string | null;
  paymentReference: string | null;
  amountPaid: number | null;
  paymentMethod: string | null;

  setDeliveryOption: (id: string) => void;
  setDropoffLocation: (loc: DropoffLocation) => void;
  setRecipientName: (name: string) => void;
  setRecipientPhone: (phone: string) => void;
  setDeliveryInstructions: (val: string) => void;
  setOrderId: (id: string) => void;
  setPaymentData: (data: {
    reference: string;
    amount: number;
    method: string;
  }) => void;
  reset: () => void;
}

// 🔁 Replace this UUID once GET /customer/delivery-options returns real data.
// Then remove this constant and set deliveryOptionId: null in initialState.
const HARDCODED_DELIVERY_OPTION_ID = '00000000-0000-0000-0000-000000000000';

const initialState = {
  deliveryOptionId: HARDCODED_DELIVERY_OPTION_ID,
  dropoffLocation: null,
  recipientName: '',
  recipientPhone: '',
  deliveryInstructions: '',
  orderId: null,
  paymentReference: null,
  amountPaid: null,
  paymentMethod: null,
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      ...initialState,

      setDeliveryOption: (id) => set({ deliveryOptionId: id }),
      setDropoffLocation: (loc) => set({ dropoffLocation: loc }),
      setRecipientName: (name) => set({ recipientName: name }),
      setRecipientPhone: (phone) => set({ recipientPhone: phone }),
      setDeliveryInstructions: (val) => set({ deliveryInstructions: val }),
      setOrderId: (id) => set({ orderId: id }),
      setPaymentData: (data) =>
        set({
          paymentReference: data.reference,
          amountPaid: data.amount,
          paymentMethod: data.method,
        }),
      reset: () => set(initialState),
    }),
    {
      name: 'delivery-order-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
