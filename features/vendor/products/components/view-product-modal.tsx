'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import { ViewProductModalProps } from '../type';

export default function ViewProductModal({
  isModalOpen,
  setIsModalOpen,
  product,
  onEdit,
}: ViewProductModalProps) {
  if (!product) return null;

  const {
    productName,
    productCategory,
    sku,
    description,
    productType,
    stockStatus,
    productStatus,
    basePrice,
    stockQuantity,
    lowStockThreshold,
    productImages,
    createdAt,
    updatedAt,
  } = product;

  // Get primary image or first image
  const primaryImage =
    productImages?.find((img) => img.isPrimary)?.imageUrl ||
    productImages?.[0]?.imageUrl;

  // Format price
  const formattedPrice = basePrice ? `₦${basePrice.toLocaleString()}` : 'N/A';

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = () => {
    setIsModalOpen(false);
    onEdit?.();
  };

  return (
    <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="space-y-6 py-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {productName}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">SKU: {sku}</p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-medium capitalize',
                {
                  'bg-emerald-500/10 text-emerald-600':
                    productStatus === 'ACTIVE',
                  'bg-neutral-100 text-neutral-600':
                    productStatus === 'INACTIVE',
                  'bg-amber-500/10 text-amber-600': productStatus === 'DRAFT',
                },
              )}
            >
              {productStatus.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Image */}
        {primaryImage ? (
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <Image
              src={primaryImage}
              alt={productName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full h-64 rounded-xl bg-neutral-100 flex items-center justify-center">
            <span className="text-neutral-400">No image available</span>
          </div>
        )}

        {/* Image gallery if multiple images */}
        {productImages && productImages.length > 1 && (
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
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Category</p>
            <p className="font-medium text-neutral-900">{productCategory}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Product Type</p>
            <p className="font-medium text-neutral-900 capitalize">
              {productType.toLowerCase()}
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Price</p>
            <p className="font-medium text-primary text-lg">{formattedPrice}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Stock Status</p>
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

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Stock Quantity</p>
            <p className="font-medium text-neutral-900">
              {stockQuantity ?? 'N/A'}
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-1">Low Stock Threshold</p>
            <p className="font-medium text-neutral-900">
              {lowStockThreshold ?? 'N/A'}
            </p>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="p-4 bg-neutral-50 rounded-xl">
            <p className="text-xs text-neutral-500 mb-2">Description</p>
            <p className="text-neutral-700 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {/* Timestamps */}
        <div className="flex justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-100">
          <span>Created: {formatDate(createdAt)}</span>
          <span>Updated: {formatDate(updatedAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>

          {onEdit && (
            <Button variant="primary" size="lg" onClick={handleEdit}>
              <Edit size={16} />
              Edit Product
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
