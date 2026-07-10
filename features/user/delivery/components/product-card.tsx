'use client';

import { useMemo, useState } from 'react';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Product } from '@/features/vendor/products/type';
import { Loader, Minus, Package, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '../hooks/store';
import { IconButton } from '@/components/ui/buttons/icon-button';
import ProductConfigModal from './modals/product-config-modal';

export default function ProductCard({ item }: { item: Product }) {
  const { cart, addItem, updateQuantity, removeItem, updatingItems } =
    useCartStore();

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const isConfigurable =
    (item.variants?.length ?? 0) > 0 || (item.addons?.length ?? 0) > 0;

  const productCartItems = useMemo(
    () => cart?.items?.filter((i) => i.productId === item.id) ?? [],
    [cart?.items, item.id],
  );

  const cartItem = productCartItems[0];

  const quantity = productCartItems.reduce(
    (sum, i) => sum + (i.quantity ?? 0),
    0,
  );

  const itemKey = item.id;

  const isUpdating = updatingItems.includes(itemKey);

  const handleAdd = async () => {
    if (isUpdating) return;

    if (isConfigurable) {
      setIsConfigModalOpen(true);
      return;
    }

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
    if (isConfigurable) return;

    if (!cartItem || isUpdating) return;

    if (cartItem.id.startsWith('temp-')) return;

    if (quantity <= 1) {
      await removeItem(cartItem.id);
    } else {
      await updateQuantity(cartItem.id, quantity - 1);
    }
  };

  return (
    <>
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
                item.productImages?.[0]?.imageUrl ||
                '/assets/image/nigerian.jpg'
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

                <p className="mt-2 text-xs text-neutral-600 line-clamp-3">
                  {item.subcategory?.name || 'No subcategory available'}
                </p>
              </div>
              <div className="space-y-3  h-20 overflow-scroll">
                {/* Price */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-primary">
                    NGN {item.basePrice.toLocaleString()}
                  </h2>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-2 text-xs font-medium text-green-700">
                  <Image
                    src="/assets/image/Logo/not-found.png"
                    alt="C-Ride"
                    width={14}
                    height={14}
                  />

                  <span>Delivered by C-Ride</span>
                </div>

                {/* Customization */}
                {(item.variants?.length > 0 || item.addons?.length > 0) && (
                  <div>
                    <div className="space-y-2">
                      {item.variants?.length > 0 && (
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                              <span className="text-xs">
                                <Package size={12} className="text-primary" />
                              </span>
                            </div>
                            <p className="text-xs font-medium text-neutral-800">
                              Variant
                            </p>
                          </div>

                          <p className="text-xs text-neutral-500">
                            {item.variants.length} option
                            {item.variants.length > 1 ? 's' : ''} available
                          </p>
                        </div>
                      )}

                      {item.addons?.length > 0 && (
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100/10">
                              <span className="text-xs">
                                <Plus size={12} className="text-green-100" />
                              </span>
                            </div>

                            <p className="text-xs font-medium text-neutral-800">
                              Add ons
                            </p>
                          </div>

                          <p className="text-xs text-neutral-500">
                            {item.addons.length} option
                            {item.addons.length > 1 ? 's' : ''} available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {!isConfigurable && (
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

              {isConfigurable && (
                <p className="text-xs text-neutral-500">
                  This item has custom options. Choose variant and add-ons.
                </p>
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
                ) : isConfigurable ? (
                  quantity > 0 ? (
                    `Customize & Add More (${quantity})`
                  ) : (
                    'Customize & Add'
                  )
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

      <ProductConfigModal
        product={item}
        isModalOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
      />
    </>
  );
}
