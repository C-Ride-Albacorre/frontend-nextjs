import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { ProductRowProps } from '../type';
import clsx from 'clsx';

export default function ProductRow({
  name,
  price,
  category,
  status,
  stock,
  onEdit,
  setIsModalOpen,
}: ProductRowProps) {
  return (
    <div className="md:flex  items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 space-y-6 md:space-y-0">
      {/* LEFT */}
      <div className="md:flex space-y-6 md:space-y-0 items-center gap-4 flex-1">
        <div className="relative w-full md:w-16  xl:w-24  h-40 md:h-16  xl:h-24">
          <Image
            src="/assets/image/food.png"
            alt={name}
            fill
            className="rounded-xl object-cover"
            sizes="(max-width: 768px) 100vw, 160px"
          />
        </div>

        <div className="space-y-2 ">
          <div className="flex items-center gap-2">
            <p className="font-medium text-primary-text-100">{name}</p>

            <span
              className={clsx('rounded-full px-2 py-1 text-xs', {
                'bg-emerald-500/10 text-emerald-600': status === 'active',
                'bg-neutral-100 text-neutral-600': status === 'inactive',
              })}
            >
              {status}
            </span>
          </div>

          <p className="text-sm text-neutral-500">Category: {category}</p>

          <div className="flex items-center gap-6 text-sm">
            <span className="font-medium text-primary">{price}</span>

            {stock === 'in' ? (
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-600">
                In Stock
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-600">
                Low stock
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setIsModalOpen(true);
            onEdit();
          }}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:bg-foreground-200 cursor-pointer"
        >
          <Edit size={14} />
          Edit
        </button>

        <button className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
