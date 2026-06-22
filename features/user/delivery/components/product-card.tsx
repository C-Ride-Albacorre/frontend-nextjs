'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Product } from '@/features/vendor/products/type';
import { Loader, Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '../hooks/store';
import { IconButton } from '@/components/ui/buttons/icon-button';

export default function ProductCard({ item }: { item: Product }) {
  const { cart, addItem, updateQuantity, removeItem, updatingItems } =
    useCartStore();

  const cartItem = cart?.items?.find((i) => i.productId === item.id);

  const quantity = cartItem?.quantity ?? 0;

  const itemKey = item.id;

  const isUpdating = updatingItems.includes(itemKey);

  const handleAdd = async () => {
    if (isUpdating) return;

    if (!cartItem) {
      await addItem(
        {
          ...item,
          variantId: item.variants?.[0]?.id,
        },
        1,
      );

      return;
    }

    if (cartItem.id.startsWith('temp-')) return;

    await updateQuantity(cartItem.id, quantity + 1);
  };

  const handleMinus = async () => {
    if (!cartItem || isUpdating) return;

    if (cartItem.id.startsWith('temp-')) return;

    if (quantity <= 1) {
      await removeItem(cartItem.id);
    } else {
      await updateQuantity(cartItem.id, quantity - 1);
    }
  };

  return (
    <Card
      border="none"
      spacing="sm"
      className="group bg-foreground-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="space-y-2">
        {/* Product Image */}
        <div className="relative  h-36 sm:h-44 md:h-52 overflow-hidden rounded-xl">
          <Image
            src={
              item.productImages?.[0]?.imageUrl || '/assets/image/nigerian.jpg'
            }
            alt={item.productName}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {quantity > 0 && (
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-medium text-white">
              <ShoppingCart size={12} />
              {quantity} in cart
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="col-span-2 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <h3 className="text-base md:text-lg font-semibold capitalize line-clamp-1">
                {item.productName}
              </h3>

              <p className="mt-2 text-sm text-neutral-500 line-clamp-3">
                {item.description || 'No description available'}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-lg md:text-xl font-bold text-primary">
                ₦{item.basePrice.toLocaleString()}
              </p>

              <div className="flex items-center gap-2 text-xs font-medium text-green-100">
                <Image
                  src="/assets/image/Logo/not-found.png"
                  alt="C-Ride"
                  width={14}
                  height={14}
                />
                Delivered by C-Ride
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {quantity > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quantity</span>

                <div className="flex items-center gap-3">
                  <IconButton
                    onClick={handleMinus}
                    disabled={isUpdating}
                    variant="primary-outline"
                    size="icon"
                    rounded="full"
                  >
                    <Minus size={14} />
                  </IconButton>

                  <span className="min-w-5 text-center font-medium">
                    {quantity}
                  </span>

                  <IconButton
                    onClick={handleAdd}
                    disabled={isUpdating}
                    variant="primary"
                    size="icon"
                    rounded="full"
                  >
                    <Plus size={14} />
                  </IconButton>
                </div>
              </div>
            )}

            <Button
              type="button"
              size="icon"
              variant={quantity > 0 ? 'primary' : 'white'}
              onClick={handleAdd}
              disabled={isUpdating}
              className="w-full"
            >
              {isUpdating ? (
                <Loader
                  size={16}
                  className="animate-spin text-primary-text-100"
                />
              ) : quantity > 0 ? (
                `Add More (${quantity})`
              ) : (
                'Add to Order'
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
