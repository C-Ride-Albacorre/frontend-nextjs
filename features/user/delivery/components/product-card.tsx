'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Product } from '@/features/vendor/products/type';
import { Loader, Minus, Plus, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '../hooks/store';
import { IconButton } from '@/components/ui/buttons/icon-button';

export default function ProductCard({ item }: { item: Product }) {
  const { cart, addItem, updateQuantity, removeItem, updatingItems } =
    useCartStore();

  console.log('[ProductCard] Rendering:', cart, item);

  const cartItem = cart?.items?.find((i) => i.productId === item.id);

  const quantity = cartItem?.quantity ?? 0;

  const itemKey = item.id;

  const isUpdating = updatingItems.includes(itemKey);

  const handleAdd = async () => {
    // Prevent duplicate requests
    if (isUpdating) return;

    // First add
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

    // Don't update temp items
    if (cartItem.id.startsWith('temp-')) {
      return;
    }

    await updateQuantity(cartItem.id, quantity + 1);

    console.log(
      '[ProductCard] Add item:',
      item.id,
      'New quantity:',
      quantity + 1,
    );
  };

  const handleMinus = async () => {
    if (!cartItem || isUpdating) return;

    // Don't mutate temp items
    if (cartItem.id.startsWith('temp-')) {
      return;
    }

    if (quantity <= 1) {
      await removeItem(cartItem.id);
    } else {
      await updateQuantity(cartItem.id, quantity - 1);
    }
  };

  return (
    <Card className="grid grid-cols-3 sm:grid-cols-2 gap-6 bg-foreground-200">
      <div className="relative w-full h-20 md:h-60 xl:h-full col-span-1 sm:col-span-1">
        <Image
          src={
            item.productImages?.[0]?.imageUrl || '/assets/image/nigerian.jpg'
          }
          alt={item.productName}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col justify-between col-span-2 sm:col-span-1 gap-3">
        <div className="space-y-3">
          <p className="font-medium text-sm md:text-base capitalize">
            {item.productName}
          </p>

          <p className=" text-xs text-neutral-500 ">
            {item.description
              ? item.description.length > 100
                ? item.description.substring(0, 100) + '...'
                : item.description
              : 'No description available'}
          </p>

          <div className="flex justify-between">
            <p className="font-medium text-primary text-sm">
              ₦{item.basePrice.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <IconButton
            onClick={handleMinus}
            disabled={!cartItem || isUpdating}
            variant="primary-outline"
            size="icon"
            rounded="md"
          >
            <Minus size={14} />
          </IconButton>

          <span>{quantity}</span>

          <IconButton
            onClick={handleAdd}
            variant="primary"
            size="icon"
            rounded="md"
            disabled={isUpdating}
          >
            <Plus size={14} />
          </IconButton>
        </div>

        <Button
          type="button"
          variant={quantity > 0 ? 'primary' : 'white'}
          onClick={handleAdd}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader size={16} className="animate-spin text-primary-text-100" />
          ) : quantity > 0 ? (
            `In Cart (${quantity})`
          ) : (
            'Add to Order'
          )}
        </Button>
      </div>
    </Card>
  );
}
