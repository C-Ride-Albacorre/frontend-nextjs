import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Cart, CartItem } from './types';
import { toast } from 'sonner';
import {
  addToCartAction,
  clearCartAction,
  getCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from './action';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  setCart: (cart: Cart | null) => void;
  loadCart: () => Promise<void>;

  addItem: (
    product: {
      id: string;
      productName: string;
      basePrice: number;
      productImages?: { imageUrl: string }[];
    },
    quantity?: number,
  ) => Promise<void>;

  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,

      setCart: (cart) => set({ cart }),

      loadCart: async () => {
        set({ isLoading: true, error: null });
        const result = await getCartAction();
        set({ isLoading: false });

        if (result.success) {
          if (result.data) {
            const normalized = normalizeCart(result.data);
            set({ cart: normalized });
          } else {
            // No cart exists yet — that's fine
            set({ cart: null });
          }
        } else {
          // Silently handle initial cart load failures
          console.warn('[Cart] Failed to load cart:', result.error);
          set({ error: result.error || null });
        }
      },

      addItem: async (product, quantity = 1) => {
        const prevCart = get().cart;

        // === OPTIMISTIC UPDATE (runs immediately) ===
        set((state) => {
          const currentItems = state.cart?.items ?? [];

          const existing = currentItems.find((i) => i.productId === product.id);

          let updatedItems: CartItem[];
          if (existing) {
            updatedItems = currentItems.map((i) =>
              i.productId === product.id
                ? {
                    ...i,
                    quantity: i.quantity + quantity,
                    totalPrice: i.basePrice * (i.quantity + quantity),
                  }
                : i,
            );
          } else {
            const newItem: CartItem = {
              id: `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
              itemType: 'PRODUCT',
              productId: product.id,
              quantity,
              productName: product.productName,
              productImage: product.productImages?.[0]?.imageUrl,
              basePrice: product.basePrice,
              totalPrice: product.basePrice * quantity,
            };
            updatedItems = [...currentItems, newItem];
          }

          const subTotal = updatedItems.reduce(
            (s, i) => s + (i.totalPrice || 0),
            0,
          );
          const itemCount = updatedItems.reduce(
            (s, i) => s + (i.quantity || 0),
            0,
          );

          return {
            cart: {
              id: state.cart?.id || 'temp-cart',
              items: updatedItems,
              subTotal,
              itemCount,
            },
          };
        });

        // === API CALL ===
        set({ isLoading: true });
        const result = await addToCartAction({
          itemType: 'PRODUCT',
          productId: product.id,
          quantity,
        });
        set({ isLoading: false });

        if (!result.success) {
          set({ cart: prevCart });
          toast.error(result.error || 'Failed to add item');
          return;
        }

        // Sync with server (optimistic was already shown)
        const normalized = normalizeCart(result.data);
        set({ cart: normalized });
      },

      removeItem: async (itemId) => {
        const prevCart = get().cart;

        set((state) => {
          if (!state.cart) return state;
          const updatedItems = state.cart.items.filter((i) => i.id !== itemId);
          const subTotal = updatedItems.reduce(
            (s, i) => s + (i.totalPrice || 0),
            0,
          );
          const itemCount = updatedItems.reduce(
            (s, i) => s + (i.quantity || 0),
            0,
          );

          return {
            cart: { ...state.cart, items: updatedItems, subTotal, itemCount },
          };
        });

        set({ isLoading: true });
        const result = await removeFromCartAction(itemId);
        set({ isLoading: false });

        if (!result.success) {
          set({ cart: prevCart });
          toast.error(result.error || 'Failed to remove item');
          return;
        }

        const normalized = normalizeCart(result.data);
        set({ cart: normalized });
      },

      updateQuantity: async (itemId, quantity) => {
        if (quantity < 1) {
          await get().removeItem(itemId);
          return;
        }

        const prevCart = get().cart;

        set((state) => {
          if (!state.cart) return state;
          const updatedItems = state.cart.items.map((i) =>
            i.id === itemId
              ? { ...i, quantity, totalPrice: i.basePrice * quantity }
              : i,
          );
          const subTotal = updatedItems.reduce(
            (s, i) => s + (i.totalPrice || 0),
            0,
          );
          const itemCount = updatedItems.reduce(
            (s, i) => s + (i.quantity || 0),
            0,
          );

          return {
            cart: { ...state.cart, items: updatedItems, subTotal, itemCount },
          };
        });

        set({ isLoading: true });
        const result = await updateCartQuantityAction(itemId, quantity);
        set({ isLoading: false });

        if (!result.success) {
          set({ cart: prevCart });
          toast.error(result.error || 'Failed to update quantity');
          return;
        }

        const normalized = normalizeCart(result.data);
        set({ cart: normalized });
      },

      clearCart: async () => {
        const prevCart = get().cart;

        set((state) => ({
          cart: state.cart
            ? { ...state.cart, items: [], subTotal: 0, itemCount: 0 }
            : null,
        }));

        set({ isLoading: true });
        const result = await clearCartAction();
        set({ isLoading: false });

        if (!result.success) {
          set({ cart: prevCart });
          toast.error(result.error || 'Failed to clear cart');
          return;
        }

        const normalized = normalizeCart(result.data);
        set({ cart: normalized });
      },
    }),
    {
      name: 'delivery-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);

// Helper to normalize backend response (subtotal → subTotal + safe fallbacks)
function normalizeCart(serverData: any): Cart | null {
  if (!serverData) return null;

  const items = (serverData.items || []).map((item: any) => ({
    ...item,
    productName: item.productName || 'Unknown Item',
    totalPrice: item.totalPrice ?? (item.basePrice || 0) * (item.quantity || 1),
  }));

  return {
    id: serverData.cartId || serverData.id || 'temp-cart',
    items,
    subTotal: serverData.subtotal ?? serverData.subTotal ?? 0,
    itemCount:
      serverData.itemCount ??
      items.reduce((sum: number, i: any) => sum + (i.quantity || 0), 0),
  };
}
