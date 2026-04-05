'use client';

import { ChevronRight, Loader2, Minus, Plus, Trash2 } from 'lucide-react';
import Modal from '@/components/layout/modal';
import { useCartStore } from '../store';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function CartModal() {
  const {
    cart,
    isLoading,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const pathname = usePathname();
  const router = useRouter();

  // Extract [id] and [slug] from /user/delivery/[id]/[slug]/...
  const segments = pathname.split('/').filter(Boolean);
  const deliveryIdx = segments.indexOf('delivery');
  const storeId = segments[deliveryIdx + 1] ?? '';
  const storeSlug = segments[deliveryIdx + 2] ?? '';

  const handleProceed = () => {
    closeCart();
    router.push(`/user/delivery/${storeId}/${storeSlug}/delivery-type`);
  };

  const items = cart?.items ?? [];

  console.log('[CartModal] Items:', items);

  return (
    <Modal isModalOpen={isCartOpen} onClose={closeCart}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Your Cart ({cart?.itemCount ?? 0})
          </h2>

          {items.length > 0 && (
            <Button
              type="button"
              variant="red-secondary"
              size="icon"
              onClick={() => clearCart()}
              disabled={isLoading}
              leftIcon={<Trash2 size={14} />}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <p className="py-12 text-center text-neutral-400">
            Your cart is empty
          </p>
        )}

        {/* Items */}
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-3">
                {/* Image */}
                {item.productImage && (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="flex justify-between flex-1">
                  <p className="text-sm font-medium capitalize">
                    {item.productName}
                  </p>

                  <p className="text-sm font-medium">
                    ₦{item.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <p className="text-xs text-neutral-500">
                  ₦{item.unitPrice?.toLocaleString()} x {item.quantity}
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <IconButton
                    variant="primary-outline"
                    size="icon"
                    rounded="md"
                    disabled={isLoading}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={12} />
                  </IconButton>

                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>

                  <IconButton
                    variant="primary"
                    size="icon"
                    rounded="md"
                    disabled={isLoading}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={12} />
                  </IconButton>
                </div>

                {/* Price + remove */}
                <div className="flex flex-col items-end justify-between">
                  <IconButton
                    variant="red"
                    rounded="md"
                    disabled={isLoading}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        {items.length > 0 && (
          <div className="space-y-4 border-t border-border pt-4">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              {isLoading ? (
                <Loader2 size={16} className="animate-spin text-primary" />
              ) : (
                <span>₦{(cart?.subTotal ?? 0).toLocaleString()}</span>
              )}
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              rightIcon={<ChevronRight size={16} />}
              onClick={handleProceed}
              disabled={isLoading || !storeId || !storeSlug}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
