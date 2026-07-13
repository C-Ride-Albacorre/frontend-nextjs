import {
  Edit,
  Eye,
  Icon,
  Package,
  Package2,
  Store,
  Trash2,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import { ProductRowProps } from '../type';
import clsx from 'clsx';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';

export default function ProductRow({
  product,
  onEdit,
  onView,
  onDelete,
}: ProductRowProps) {
  const {
    productName,
    basePrice,
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
  const formattedPrice = basePrice
    ? `NGN ${basePrice.toLocaleString()}`
    : 'N/A';

  // Status display
  const statusDisplay = productStatus.toLowerCase();
  const stockDisplay =
    stockStatus === 'IN_STOCK'
      ? 'In Stock'
      : stockStatus === 'LOW_STOCK'
        ? 'Low Stock'
        : 'Out of Stock';

  return (
    <Card spacing='none' className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col">
        <div className="space-y-6 items-center gap-6 flex-1  p-6 mb-0">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 overflow-hidden rounded-xl  shrink-0">
              <Image
                src={imageUrl ?? '/assets/image/product-placeholder.png'}
                alt={productName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="space-y-2 flex-1">
              <h2 className="font-medium text-primary-text-100">
                {productName}
              </h2>

              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'rounded-full px-2 py-0.5 text-[10px] capitalize',
                    {
                      'bg-emerald-500/10 text-emerald-600':
                        productStatus === 'ACTIVE',
                      'bg-neutral-100 text-neutral-600':
                        productStatus === 'INACTIVE',
                      'bg-amber-500/10 text-amber-600':
                        productStatus === 'DRAFT',
                    },
                  )}
                >
                  {statusDisplay}
                </span>

                <span
                  className={clsx(
                    'rounded-full px-2 py-0.5 text-[10px] capitalize',
                    {
                      'bg-emerald-500/10 text-emerald-600':
                        stockStatus === 'IN_STOCK',
                      'bg-amber-500/10 text-amber-600':
                        stockStatus === 'LOW_STOCK',
                      ' bg-red-100 text-red-600':
                        stockStatus === 'OUT_OF_STOCK',
                    },
                  )}
                >
                  {stockDisplay}
                </span>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-6 mb-0">
            <li className="flex items-start gap-2">
              <Store size={16} className="text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Product type:</p>
                <p className="font-medium text-sm">{productType}</p>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <Package2 size={16} className="text-neutral-400" />

              <div>
                <p className="text-xs text-neutral-500">SKU:</p>
                <p className="font-medium text-sm">{sku ?? 'N/A'}</p>
              </div>
            </li>


            <li className="flex items-start gap-2">
              <Package size={16} className="text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Quantity:</p>
                <p className="font-medium text-sm">{stockQuantity}</p>
              </div>
            </li>

           <li className="flex items-start gap-2">
           <Package size={16} className="text-neutral-400" />

           <div>
               <p className="text-xs text-neutral-500">Low Stock:</p>
              <p className="font-medium text-sm">{lowStockThreshold}</p>
           </div>
            </li>


            
            <li className="flex items-start gap-2">
              <Wallet size={16} className="text-neutral-400" />
              <div>
                <p className="text-xs text-neutral-500">Price:</p>
                <h2 className="font-semibold text-sm text-primary">
                  {formattedPrice}
                </h2>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex justify-between items-center border-t border-neutral-100 px-6 py-4">
          <IconButton onClick={onDelete} variant="red" rounded="md">
            <Trash2 size={16} />
          </IconButton>

          <div className="flex items-center gap-2">
            <Button onClick={onEdit} size="icon" variant="white">
              <Edit size={14} />
              Edit
            </Button>

            <Button size="icon" onClick={onView}>
              View Product
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
