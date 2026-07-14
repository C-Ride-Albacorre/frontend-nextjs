'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { LoaderCircle, Minus, Plus } from 'lucide-react';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { Product } from '@/features/vendor/products/type';
import { useCartStore } from '@/features/user/delivery/hooks/store';
import Card from '@/components/layout/card';

type Props = {
  product: Product;
  isModalOpen: boolean;
  onClose: () => void;
};

export default function ProductConfigModal({
  product,
  isModalOpen,
  onClose,
}: Props) {
  const { addItem, updatingItems } = useCartStore();

  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(product.variants?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [addonQuantities, setAddonQuantities] = useState<
    Record<string, number>
  >({});

  const isUpdating = updatingItems.includes(product.id);

  useEffect(() => {
    if (!isModalOpen) return;

    setSelectedVariantId(product.variants?.[0]?.id);
    setQuantity(1);
    setAddonQuantities({});
  }, [isModalOpen, product.id, product.variants]);

  const selectedVariant = useMemo(
    () => product.variants?.find((variant) => variant.id === selectedVariantId),
    [product.variants, selectedVariantId],
  );

  const selectedAddonIds = useMemo(
    () =>
      Object.entries(addonQuantities).flatMap(([addonId, count]) =>
        count > 0 ? Array(count).fill(addonId) : [],
      ),
    [addonQuantities],
  );

  const unitPrice = useMemo(() => {
    const variantPrice = selectedVariant?.price ?? product.basePrice;

    const addonsTotal = product.addons.reduce((sum, addon) => {
      const addonId = addon.id;
      if (!addonId) return sum;

      const addonCount = addonQuantities[addonId] ?? 0;

      return sum + addon.price * addonCount;
    }, 0);

    return variantPrice + addonsTotal;
  }, [product.addons, product.basePrice, selectedVariant, addonQuantities]);

  const totalPrice = unitPrice * quantity;

  const handleAddonQuantity = (addonId: string, nextValue: number) => {
    setAddonQuantities((prev) => ({
      ...prev,
      [addonId]: Math.max(0, nextValue),
    }));
  };

  const handleConfirm = async () => {
    if (isUpdating) return;

    await addItem(
      {
        ...product,
        variantId: selectedVariantId,
        addonIds: selectedAddonIds.length > 0 ? selectedAddonIds : undefined,
      },
      quantity,
    );

    onClose();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={onClose}
      wrapperClassName="max-w-2xl"
    >
      <div className="space-y-6">
        <div className="flex gap-4 pt-8">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={
                product.productImages?.[0]?.imageUrl ||
                '/assets/image/nigerian.jpg'
              }
              alt={product.productName}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-1  flex-1">
            <h2 className="text-lg font-semibold capitalize">
              {product.productName}
            </h2>
            <p className="text-sm text-neutral-500">
              {product.description || 'Customize your product before adding'}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">Qty?</p>

              <div className="flex items-center gap-2 ">
                <IconButton
                  size="icon"
                  rounded="full"
                  variant="primary-outline"
                  disabled={quantity <= 1 || isUpdating}
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  <Minus size={12} />
                </IconButton>

                <span className="w-8 text-center text-sm font-medium">
                  {quantity}
                </span>

                <IconButton
                  size="icon"
                  rounded="full"
                  variant="primary"
                  disabled={isUpdating}
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus size={12} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className=" max-h-80 overflow-y-scroll space-y-8 py-4">
          {product.variants?.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-medium">Choose a variant</h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariantId === variant.id;

                  return (
                    <button
                      key={variant.id ?? variant.variantName}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-foreground-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium capitalize">
                          {variant.variantName || variant.name}
                        </p>
                        <p className="text-sm text-neutral-600">
                          NGN {variant.price.toLocaleString()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {product.addons?.length > 0 && (
            <section className="space-y-3">
              <h3 className="font-medium">Add-ons</h3>

              <div className="space-y-3">
                {product.addons.map((addon) => {
                  if (!addon.id) return null;

                  const isAvailable = (addon.available ?? true) as boolean;
                  const value = addonQuantities[addon.id] ?? 0;
                  const maxQuantity = addon.maxQuantity ?? 10;

                  return (
                    <Card
                      key={addon.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1 mb-0">
                        <p className="font-medium capitalize">
                          {addon.addonName}
                        </p>
                        <p className="text-xs text-neutral-500">
                          NGN {addon.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <IconButton
                          size="icon"
                          rounded="full"
                          variant="primary-outline"
                          disabled={!isAvailable || value <= 0 || isUpdating}
                          onClick={() =>
                            handleAddonQuantity(addon.id!, value - 1)
                          }
                        >
                          <Minus size={12} />
                        </IconButton>

                        <span className="w-8 text-center text-sm">{value}</span>

                        <IconButton
                          size="icon"
                          rounded="full"
                          variant="primary"
                          disabled={
                            !isAvailable || value >= maxQuantity || isUpdating
                          }
                          onClick={() =>
                            handleAddonQuantity(addon.id!, value + 1)
                          }
                        >
                          <Plus size={12} />
                        </IconButton>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <div className="">
          <Button
            type="button"
            size="full"
            variant="primary"
            onClick={handleConfirm}
            disabled={isUpdating}
            rightIcon={
              isUpdating ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : null
            }
          >
            Add to Order • NGN {totalPrice.toLocaleString()}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
