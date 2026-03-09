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
      <div className="md:flex space-y-6 md:space-y-0 items-center gap-4 flex-1 mb-0">
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

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="font-medium text-primary-text-100">{productName}</p>

            <span
              className={clsx('rounded-full px-2 py-1 text-xs capitalize', {
                'bg-emerald-500/10 text-emerald-600':
                  productStatus === 'ACTIVE',
                'bg-neutral-100 text-neutral-600': productStatus === 'INACTIVE',
                'bg-amber-500/10 text-amber-600': productStatus === 'DRAFT',
              })}
            >
              {statusDisplay}
            </span>
          </div>

          <p className="text-sm text-neutral-500">
            Category: {productCategory}
          </p>

          <div className="flex items-center gap-6 text-sm">
            <span className="font-medium text-primary">{formattedPrice}</span>

            <span
              className={clsx('rounded-full px-2 py-1 text-xs', {
                'bg-emerald-500/10 text-emerald-600':
                  stockStatus === 'IN_STOCK',
                'bg-amber-500/10 text-amber-600': stockStatus === 'LOW_STOCK',
                'bg-red-500/10 text-red-600': stockStatus === 'OUT_OF_STOCK',
              })}
            >
              {stockDisplay}
            </span>
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
