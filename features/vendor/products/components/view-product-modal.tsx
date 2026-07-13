'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';
import { Box, Edit, Package, Store, Wallet } from 'lucide-react';
import Image from 'next/image';
import { ViewProductModalProps } from '../type';
import { formatDate } from '@/helpers/date-formatter';

export default function ViewProductModal({
  isModalOpen,
  setIsModalOpen,
  product,
  onEdit,
}: ViewProductModalProps) {
  if (!product) return null;

  const {
    productName,
    sku,
    description,
    productType,
    stockStatus,
    productStatus,
    basePrice,
    stockQuantity,
    lowStockThreshold,
    productImages,
    variants,
    addons,
    createdAt,
    updatedAt,
  } = product;

  // Get primary image or first image
  const primaryImage =
    productImages?.find((img) => img.isPrimary)?.imageUrl ||
    productImages?.[0]?.imageUrl;

  // Format price
  const formattedPrice = basePrice
    ? `NGN ${basePrice.toLocaleString()}`
    : 'N/A';

  const handleEdit = () => {
    setIsModalOpen(false);
    onEdit?.();
  };

  const statusMap = {
    ACTIVE: {
      label: 'Active',
      className: 'bg-emerald-500/10 text-emerald-600',
    },
    PENDING_APPROVAL: {
      label: 'Pending',
      className: 'bg-amber-100 text-amber-600',
    },
    DRAFT: {
      label: 'Draft',
      className: 'bg-amber-500/10 text-amber-600',
    },
    INACTIVE: {
      label: 'Inactive',
      className: 'bg-neutral-100 text-neutral-600',
    },
  };

  const currentStatus =
    statusMap[(productStatus || 'INACTIVE') as keyof typeof statusMap] ??
    statusMap.INACTIVE;

  return (
    <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="space-y-6 py-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {productName}
            </h2>
            {sku && <p className="text-xs text-neutral-500 mt-1">Sku: {sku}</p>}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-medium',
                currentStatus.className,
              )}
            >
              {currentStatus.label}
            </span>

            <span
              className={clsx('rounded-full px-2 py-1 text-xs font-medium', {
                'bg-emerald-500/10 text-emerald-600':
                  stockStatus === 'IN_STOCK',
                'bg-amber-500/10 text-amber-600': stockStatus === 'LOW_STOCK',
                'bg-red-500/10 text-red-600': stockStatus === 'OUT_OF_STOCK',
              })}
            >
              {stockStatus === 'IN_STOCK'
                ? 'In Stock'
                : stockStatus === 'LOW_STOCK'
                  ? 'Low Stock'
                  : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Image */}

        <div className="relative w-64 h-64 rounded-2xl overflow-hidden">
          <Image
            src={primaryImage ?? '/assets/image/product-placeholder.png'}
            alt={productName ?? 'Product image'}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Image gallery if multiple images */}
        {/* {productImages && productImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {productImages.map((img) => (
              <div
                key={img.id}
                className={clsx(
                  'relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2',
                  img.isPrimary ? 'border-primary' : 'border-transparent',
                )}
              >
                <Image
                  src={img.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )} */}

        {/* Details Grid */}
        <ul className="grid grid-cols-2 gap-4">
          <li className="p-4 bg-neutral-50 rounded-xl flex items-start gap-2">
            <Store size={16} className="text-neutral-400" />

            <div>
              <p className="text-xs text-neutral-500 mb-1">Product Type</p>
              <p className="font-medium text-neutral-900 capitalize text-sm">
                {productType.toLowerCase()}
              </p>
            </div>
          </li>

          <li className="p-4 bg-neutral-50 rounded-xl flex items-start gap-2">
            <Wallet size={16} className="text-neutral-400" />

            <div>
              <p className="text-xs text-neutral-500 mb-1">Price</p>
              <h2 className="font-semibold text-primary text-sm">
                {formattedPrice}
              </h2>
            </div>
          </li>

          <li className="p-4 bg-neutral-50 rounded-xl flex items-start gap-2">
            <Package size={16} className="text-neutral-400" />

            <div>
              <p className="text-xs text-neutral-500 mb-1">Stock Quantity</p>
              <p className="font-medium text-neutral-900 text-sm">
                {stockQuantity ?? 'N/A'}
              </p>
            </div>
          </li>

          <li className="p-4 bg-neutral-50 rounded-xl  flex items-start gap-2">
            <Box size={16} className="text-neutral-400" />

            <div>
              <p className="text-xs text-neutral-500 mb-1">
                Low Stock Threshold
              </p>
              <p className="font-medium text-neutral-900 text-sm">
                {lowStockThreshold ?? 'N/A'}
              </p>
            </div>
          </li>
        </ul>

        {/* Description */}
        {description && (
          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Description</p>
            <p className="text-neutral-700 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {productType === 'VARIABLE' && variants?.length ? (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Variants</h2>

            <div className="space-y-2">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="p-3 rounded-lg bg-neutral-50 flex justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{variant.variantName}</p>
                    <p className="text-xs text-neutral-500">
                      SKU: {variant.sku}
                    </p>
                  </div>

                  <h2 className="font-semibold text-primary text-sm">
                    NGN {variant.price?.toLocaleString()}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {addons?.length ? (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Add-ons</h2>

            <div className="space-y-2">
              {addons.map((addon) => (
                <div
                  key={addon.id}
                  className="p-3 rounded-lg bg-neutral-50 flex justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{addon.addonName}</p>

                    {addon.category && (
                      <p className="text-xs text-neutral-500">
                        Category: {addon.category}
                      </p>
                    )}
                  </div>

                  <h2 className="text-primary font-semibold text-sm">
                    NGN {addon.price?.toLocaleString()}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Timestamps */}
        <div className="flex justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-100">
          <span>Created: {formatDate(createdAt)}</span>
          <span>Updated: {formatDate(updatedAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex justify-around gap-4 pt-4">
          <Button
            variant="white"
            size="icon"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>

          {onEdit && (
            <Button variant="primary" size="icon" onClick={handleEdit}>
              <Edit size={16} />
              Edit Product
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
