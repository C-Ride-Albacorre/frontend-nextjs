import { Edit, Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { ProductRowProps } from '../type';
import clsx from 'clsx';
import Card from '@/components/layout/card';

export default function ProductRow({
  product,
  onEdit,
  onView,
  onDelete,
}: ProductRowProps) {
  const {
    productName,
    basePrice,
    productCategory,
    productStatus,
    stockStatus,
    productImages,
    sku,
    productType,
    stockQuantity,
    lowStockThreshold,
    createdAt,
    updatedAt,
  } = product;

  // Get primary image or first image
  const imageUrl =
    productImages?.find((img) => img.isPrimary)?.imageUrl ||
    productImages?.[0]?.imageUrl;

  // Format price
  const formattedPrice = basePrice ? `₦${basePrice.toLocaleString()}` : 'N/A';

  // Status display
  const statusDisplay = productStatus.toLowerCase();
  const stockDisplay =
    stockStatus === 'IN_STOCK'
      ? 'In Stock'
      : stockStatus === 'LOW_STOCK'
        ? 'Low Stock'
        : 'Out of Stock';

  return (
    <Card className="md:flex items-center justify-between gap-4 bg-white space-y-6 md:space-y-0">
      {/* LEFT */}
      <div className="md:flex space-y-6 md:space-y-0 items-center gap-6 flex-1 mb-0">
        <div className="relative w-full md:w-16 xl:w-24 h-40 md:h-16 xl:h-24 ">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="rounded-xl object-cover"
              sizes="(max-width: 768px) 100vw, 160px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-neutral-100 flex items-center justify-center">
              <span className="text-neutral-400 text-xs">No image</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center  gap-4">
            <p className="font-medium text-primary-text-100 text-sm">
              {productName}
            </p>

            <div className="space-x-2">
              <span
                className={clsx(
                  'rounded-full px-2 py-0.5 text-[10px] capitalize',
                  {
                    'bg-emerald-500/10 text-emerald-600':
                      productStatus === 'ACTIVE',
                    'bg-neutral-100 text-neutral-600':
                      productStatus === 'INACTIVE',
                    'bg-amber-500/10 text-amber-600': productStatus === 'DRAFT',
                  },
                )}
              >
                {statusDisplay}
              </span>

              <span className="text-xs text-primary">{productCategory}</span>

              <span
                className={clsx(' text-[10px]', {
                  'text-emerald-600': stockStatus === 'IN_STOCK',
                  ' text-amber-600': stockStatus === 'LOW_STOCK',
                  ' text-red-600': stockStatus === 'OUT_OF_STOCK',
                })}
              >
                {stockDisplay}
              </span>
            </div>
          </div>

          <div className="text-sm flex items-center gap-4 text-neutral-600">
            <div className="flex items-center gap-2 ">
              <span className="text-xs text-neutral-500">Product type:</span>
              <span className="font-medium">{productType}</span>
            </div>

            <div className="flex items-center gap-2 ">
              <span className="text-xs text-neutral-500">SKU:</span>
              <span>{sku}</span>
            </div>

            <div className="flex items-center gap-2 ">
              <span className="text-xs text-neutral-500">Price:</span>
              <span className="font-medium text-primary">{formattedPrice}</span>
            </div>
          </div>

          <div className="text-sm flex items-center gap-4 text-neutral-600">
            <div className="flex items-center gap-2 ">
              <span className="text-xs text-neutral-500">Quantity:</span>
              <span className="font-medium">{stockQuantity}</span>
            </div>

            <div className="flex items-center gap-2 ">
              <span className="text-xs text-neutral-500">Low Stock:</span>
              <span className="font-medium">{lowStockThreshold}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">
        <button
          onClick={onView}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:bg-foreground-200 cursor-pointer"
        >
          <Eye size={14} />
          View
        </button>

        <button
          onClick={onEdit}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:bg-foreground-200 cursor-pointer"
        >
          <Edit size={14} />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </Card>
  );
}
