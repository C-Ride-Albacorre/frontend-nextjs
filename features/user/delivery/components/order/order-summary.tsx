'use client';

import { Loader, Trash, Trash2, X } from 'lucide-react';
import { useCartStore } from '../../hooks/store';
import { Suspense } from 'react';
import Card from '@/components/layout/card';
import { IconButton } from '@/components/ui/buttons/icon-button';

export default function OrderSummary() {
  const { cart, removeItem, isLoading } = useCartStore();

  const items = cart?.items ?? [];

  if (items.length === 0) {
    return <p className="text-center text-neutral-500">Cart is empty</p>;
  }

  return (
    <Suspense
      fallback={
        <Loader size={24} className="animate-spin text-primary mx-auto" />
      }
    >
      <Card gap="lg" className="bg-foreground-200">
        <h2 className="text-lg font-semibold">Your Order Summary</h2>

        <ul className="space-y-6">
          {items.map((item: any) => (
            <li key={item.id} className="flex justify-between items-center">
              <p className="text-neutral-500 text-sm text-left">
                {item.productName} x {item.quantity}
              </p>

              <div className="flex items-center gap-2  md:gap-8">
                {isLoading ? (
                  <Loader size={16} className="animate-spin text-primary" />
                ) : (
                  <span>₦ {item.totalPrice.toLocaleString()}</span>
                )}
                <IconButton
                  variant="red"
                  rounded="md"
                  onClick={() => removeItem(item.id)}
                >
                  <X size={14} />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-border pt-8 flex justify-between">
          <span>Sub Total</span>
          {isLoading ? (
            <Loader size={16} className="animate-spin text-primary" />
          ) : (
            <span>₦ {(cart?.subTotal ?? 0).toLocaleString()}</span>
          )}
        </div>
      </Card>
    </Suspense>
  );
}
