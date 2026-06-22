'use client';

import { Loader, ShoppingCart, Trash, Trash2, X } from 'lucide-react';
import { useCartStore } from '../../hooks/store';
import { Suspense } from 'react';
import Card from '@/components/layout/card';
import { IconButton } from '@/components/ui/buttons/icon-button';
import EmptyState from '@/components/layout/empty-state';

export default function OrderSummary() {
  const { cart, removeItem, isLoading, updatingItems } = useCartStore();

  const items = cart?.items ?? [];

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart size={36} className="text-neutral-400" />}
        title="Your cart is empty"
        message="Add some products to your cart to see them here."
      />
    );
  }

  const isUpdatingCart = updatingItems.length > 0;

  console.log('isUpdatingCart:', isUpdatingCart);

  return (
    <Suspense
      fallback={
        <Loader size={24} className="animate-spin text-primary mx-auto" />
      }
    >
      <Card border="none" gap="lg" className="bg-foreground-200">
        <h2 className="text-lg font-semibold">Your Order Summary</h2>

        <ul className="space-y-6">
          {items.map((item: any) => (
            <li key={item.id} className="flex justify-between items-center">
              <p className="text-neutral-500 text-sm text-left">
                {item.productName} x {item.quantity}
              </p>

              <div className="flex items-center gap-4  md:gap-8">
                {isLoading || isUpdatingCart ? (
                  <Loader size={16} className="animate-spin text-primary" />
                ) : (
                  <span>₦ {item?.totalPrice?.toLocaleString()}</span>
                )}
                <IconButton
                  variant="red"
                  rounded="md"
                  disabled={isLoading || isUpdatingCart}
                  onClick={() => removeItem(item.id)}
                >
                  <X size={14} />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-border pt-8 flex justify-between">
          <span className="font-bold text-lg">Sub Total</span>
          {isLoading || isUpdatingCart ? (
            <Loader size={16} className="animate-spin text-primary" />
          ) : (
            <span className="font-bold text-lg">
              ₦ {(cart?.subTotal ?? 0).toLocaleString()}
            </span>
          )}
        </div>
      </Card>
    </Suspense>
  );
}
