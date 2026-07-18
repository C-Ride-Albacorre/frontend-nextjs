import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';
import { Edit, Eye, MapPin } from 'lucide-react';
import Image from 'next/image';
import { StoreCatalogueProps } from '../types';
import ErrorMessage from '@/components/layout/error-message';

export default function StoreCatalogue({
  storeData,
  onView,
  onEdit,
  onSelectStore,
  isSelected,
}: StoreCatalogueProps) {
  const {
    storeLogo,
    storeName,
    storeAddress,
    status,
    operatingHours,
    rejectionReason,
  } = storeData;

  const statusMap = {
    ACTIVE: {
      label: 'Active',
      className: 'bg-emerald-500/10 text-emerald-600',
    },
    PENDING_APPROVAL: {
      label: 'Pending',
      className: 'bg-amber-100 text-amber-600',
    },
    REJECTED: {
      label: 'Rejected',
      className: 'bg-red-500/10 text-red-600',
    },
    DRAFT: {
      label: 'Draft',
      className: 'bg-amber-500/10 text-amber-600',
    },
  };

  const currentStatus =
    statusMap[status as keyof typeof statusMap] ?? statusMap.DRAFT;

  const openDays = operatingHours?.filter((item) => item.isOpen) ?? [];

  return (
    <Card
      spacing="sm"
      className="
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="space-y-5">
        {/* IMAGE */}
        <div className="relative h-56 w-full overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={storeLogo ?? '/assets/image/store-placeholder.png'}
            alt={storeName ?? 'Store logo'}
            fill
            loading="lazy"
            className={
              storeLogo
                ? 'object-cover transition-transform duration-700 hover:scale-105'
                : 'object-contain'
            }
          />


          {/* SELECT */}
          <div className="absolute right-3 top-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelectStore(storeData)}
              className="
                h-5
                w-5
                cursor-pointer
                rounded-md
                border-border
                accent-primary
              "
            />
          </div>
        </div>


        
          {rejectionReason && <ErrorMessage message={rejectionReason} />}

        {/* CONTENT */}
        <div className="space-y-4">
          {/* TITLE + STATUS */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-lg font-semibold capitalize text-neutral-900">
              {storeName}
            </h3>

            <span
              className={clsx(
                'shrink-0 rounded-full px-2 py-1 text-[10px] capitalize',
                currentStatus.className,
              )}
            >
              {currentStatus.label}
            </span>
          </div>

          {/* ADDRESS */}
          <div className=" flex gap-2">
            <MapPin size={16} className="text-green-100 shrink-0" />
            <p className="line-clamp-2 text-xs capitalize text-neutral-500">
              {storeAddress}
            </p>
          </div>

          {/* HOURS */}
          {openDays.length > 0 && rejectionReason === null && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-400">
              {openDays.map((item) => (
                <span key={item.dayOfWeek}>
                  {item.dayOfWeek.slice(0, 3)}: {item.openingTime} -{' '}
                  {item.closingTime}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-2">
          {rejectionReason === null && (
            <Button
              variant="white"
              leftIcon={<Edit size={14} />}
              size="icon"
              rounded="lg"
              className="w-full"
              onClick={onEdit}
            >
              Edit
            </Button>
          )}

          <Button
            variant="primary"
            size="icon"
            rounded="lg"
            className="w-full"
            onClick={onView}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
