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

// ─── Types ───

interface AddItemProduct {
  id: string;
  productName: string;
  basePrice: number;
  productImages?: { imageUrl: string }[];
  variantId?: string;
  packageId?: string;
  addonIds?: string[];
  specialInstructions?: string;
}

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  error: string | null;

  setCart: (cart: Cart | null) => void;
  openCart: () => void;
  closeCart: () => void;
  loadCart: () => Promise<void>;
  addItem: (product: AddItemProduct, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

// ─── Helpers ───

function computeTotals(items: CartItem[]) {
  return {
    subTotal: items.reduce((s, i) => s + (i.totalPrice || 0), 0),
    itemCount: items.reduce((s, i) => s + (i.quantity || 0), 0),
  };
}

function normalizeCart(serverData: any): Cart | null {
  if (!serverData) return null;

  const items = (serverData.items || []).map((item: any) => ({
    ...item,
    productName: item.name || 'Unknown Item',
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

// ─── Store ───

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      isCartOpen: false,
      error: null,

      setCart: (cart) => set({ cart }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      // ── Load cart from server ──
      loadCart: async () => {
        set({ isLoading: true, error: null });
        console.log('[CartStore] Loading cart...');

        const result = await getCartAction();
        set({ isLoading: false });

        if (result.success) {
          const normalized = result.data ? normalizeCart(result.data) : null;
          console.log('[CartStore] Cart loaded:', normalized);
          set({ cart: normalized });
        } else {
          console.warn('[CartStore] Failed to load cart:', result.error);
          set({ error: result.error || null });
        }
      },

      // ── Add item ──
      addItem: async (product, quantity = 1) => {
        const prevCart = get().cart;

        console.log('[CartStore] Adding item:', {
          productId: product.id,
          variantId: product.variantId,
          quantity,
        });

        // Optimistic update
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
              id: `temp-${Date.now()}`,
              itemType: 'PRODUCT',
              productId: product.id,
              variantId: product.variantId,
              packageId: product.packageId,
              addonIds: product.addonIds,
              specialInstructions: product.specialInstructions,
              quantity,
              productName: product.productName,
              productImage: product.productImages?.[0]?.imageUrl,
              unitPrice: product.basePrice,

              basePrice: product.basePrice,
              totalPrice: product.basePrice * quantity,
            };
            updatedItems = [...currentItems, newItem];
          }

          return {
            cart: {
              id: state.cart?.id || 'temp-cart',
              items: updatedItems,
              ...computeTotals(updatedItems),
            },
          };
        });

        // Server sync
        set({ isLoading: true });
        const result = await addToCartAction({
          itemType: 'PRODUCT',
          productId: product.id,
          variantId: product.variantId,
          packageId: product.packageId,
          addonIds: product.addonIds,
          quantity,
          specialInstructions: product.specialInstructions,
        });
        set({ isLoading: false });

        if (!result.success) {
          console.error('[CartStore] Add item failed:', result.error);
          set({ cart: prevCart });
          toast.error(result.error || 'Failed to add item');
          return;
        }

        const normalized = normalizeCart(result.data);
        console.log('[CartStore] Add item synced:', normalized);
        set({ cart: normalized });
      },

      // ── Remove item ──
      removeItem: async (itemId) => {
        const prevCart = get().cart;
        console.log('[CartStore] Removing item:', itemId);

        // Optimistic
        set((state) => {
          if (!state.cart) return state;
          const updatedItems = state.cart.items.filter((i) => i.id !== itemId);
          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              ...computeTotals(updatedItems),
            },
          };
        });

        set({ isLoading: true });
        const result = await removeFromCartAction(itemId);
        set({ isLoading: false });

        if (!result.success) {
          console.error('[CartStore] Remove item failed:', result.error);
          set({ cart: prevCart });
          toast.error(result.error || 'Failed to remove item');
          return;
        }

        const normalized = normalizeCart(result.data);
        console.log('[CartStore] Remove item synced:', normalized);
        set({ cart: normalized });
      },

      // ── Update quantity ──
      updateQuantity: async (itemId, quantity) => {
        if (quantity < 1) {
          await get().removeItem(itemId);
          return;
        }

        const prevCart = get().cart;
        console.log('[CartStore] Updating quantity:', { itemId, quantity });

        // Optimistic
        set((state) => {
          if (!state.cart) return state;
          const updatedItems = state.cart.items.map((i) =>
            i.id === itemId
              ? { ...i, quantity, totalPrice: i.basePrice * quantity }
              : i,
          );
          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              ...computeTotals(updatedItems),
            },
          };
        });

        set({ isLoading: true });
        const result = await updateCartQuantityAction(itemId, quantity);
        set({ isLoading: false });

        if (!result.success) {
          console.error('[CartStore] Update quantity failed:', result.error);
          set({ cart: prevCart });
          toast.error(result.error || 'Failed to update quantity');
          return;
        }

        const normalized = normalizeCart(result.data);
        console.log('[CartStore] Update quantity synced:', normalized);
        set({ cart: normalized });
      },

      // ── Clear cart ──
      clearCart: async () => {
        const prevCart = get().cart;
        console.log('[CartStore] Clearing cart...');

        // Optimistic
        set((state) => ({
          cart: state.cart
            ? { ...state.cart, items: [], subTotal: 0, itemCount: 0 }
            : null,
        }));

        set({ isLoading: true });
        const result = await clearCartAction();
        set({ isLoading: false });

        if (!result.success) {
          console.error('[CartStore] Clear cart failed:', result.error);
          set({ cart: prevCart });
          toast.error(result.error || 'Failed to clear cart');
          return;
        }

        const normalized = normalizeCart(result.data);
        console.log('[CartStore] Cart cleared:', normalized);
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
