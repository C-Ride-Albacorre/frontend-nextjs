'use client';

import { LoaderCircle, Package, ShoppingCart, Trash2 } from 'lucide-react';
import { Suspense } from 'react';

import Card from '@/components/layout/card';
import EmptyState from '@/components/layout/empty-state';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { useCartStore } from '../../hooks/store';

export default function OrderSummary() {
  const { cart, removeItem, isLoading, updatingItems } = useCartStore();

  const items = cart?.items ?? [];

  const storeName = cart?.storeName;

  const isUpdatingCart = updatingItems.length > 0;

  if (!items.length) {
    return (
      <EmptyState
        icon={<ShoppingCart size={36} className="text-neutral-400" />}
        title="Your cart is empty"
        message="Add some products to your cart to see them here."
      />
    );
  }

  return (
    <Suspense
      fallback={
        <LoaderCircle size={24} className="mx-auto animate-spin text-primary" />
      }
    >
      <Card gap="lg" border="none" className="rounded-2xl bg-foreground-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-primary-text-100">
              Order Summary
            </h2>

              <h6 className="font-medium text-xs capitalize text-neutral-600">
              {storeName ? `From: ${storeName}` : 'No store selected'}
            </h6>
          </div>

          <div className="flex items-center gap-1">
            <Package size={16} className="inline-block mr-1 text-neutral-500" />
            <span className="text-sm text-neutral-500">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Items */}
        <ul className="divide-y divide-border mb-0">
          {items.map((item: any) => {
            const isUpdating =
              isUpdatingCart || isLoading || updatingItems.includes(item.id);

            return (
              <li
                key={item.id}
                className="flex items-start justify-between py-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium capitalize text-primary-text-100 text-sm truncate w-44">
                    {item.productName}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Qty {item.quantity}
                  </p>
                </div>

                <div className="ml-4 flex items-center gap-3">
                  {isUpdating ? (
                    <LoaderCircle
                      size={16}
                      className="animate-spin text-primary"
                    />
                  ) : (
                    <h4 className="whitespace-nowrap font-semibold text-neutral-900">
                      NGN {(item.totalPrice ?? 0).toLocaleString()}
                    </h4>
                  )}

                  <IconButton
                    variant="red"
                    rounded="md"
                    disabled={isUpdating}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.productName}`}
                  >
                    <Trash2 size={15} />
                  </IconButton>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Totals */}
        <div className="space-y-5 border-t border-border py-6">
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>Subtotal</span>

            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin text-primary" />
            ) : (
              <h4>NGN {(cart?.subTotal ?? 0).toLocaleString()}</h4>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <h4 className="text-lg font-bold text-primary-text-100">Total</h4>

            {isLoading ? (
              <LoaderCircle size={18} className="animate-spin text-primary" />
            ) : (
              <h4 className="text-lg font-bold text-primary">
                NGN {(cart?.subTotal ?? 0).toLocaleString()}
              </h4>
            )}
          </div>
        </div>
      </Card>
    </Suspense>
  );
}
