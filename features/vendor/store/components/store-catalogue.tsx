import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';
import { Edit, Eye } from 'lucide-react';
import Image from 'next/image';
import { StoreCatalogueProps } from '../types';

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
    categoryId,
    storeAddress,
    status,
    operatingHours,
  } = storeData;

  // Format status display
  const statusDisplay =
    status === 'ACTIVE'
      ? 'Active'
      : status === 'PENDING_APPROVAL'
        ? 'Pending'
        : status === 'DRAFT'
          ? 'Draft'
          : 'Active';

  return (
    <Card spacing="sm" className="bg-white">
      <div className="md:flex items-center justify-between gap-4 space-y-6 md:space-y-0">
        {/* LEFT */}
        <div className="space-y-4 flex-1">
          <input
            type="checkbox"
            className="h-4 w-4  rounded-md border-border accent-primary cursor-pointer"
            value={storeData.id}
            checked={isSelected}
            onChange={() => onSelectStore(storeData)}
          />

          <div className="2xl:flex space-y-6 2xl:space-y-0 items-center gap-8 flex-1">
            <div className="relative w-full md:w-32 h-40 md:h-28">
              {storeLogo ? (
                <Image
                  src={storeLogo}
                  alt={storeName ?? 'Store logo'}
                  fill
                  className="rounded-xl object-contain"
                  sizes="(max-width: 768px) 100vw, 160px"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-neutral-100 flex items-center justify-center">
                  <span className="text-neutral-400 text-xs">
                    No Store Logo
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <p className="font-medium text-primary-text-100">{storeName}</p>

                <span
                  className={clsx('rounded-full px-2 py-1 text-xs capitalize', {
                    'bg-emerald-500/10 text-emerald-600':
                      statusDisplay === 'Active',
                    'bg-amber-100 text-amber-600': statusDisplay === 'Pending',
                    'bg-amber-500/10 text-amber-600': statusDisplay === 'Draft',
                  })}
                >
                  {statusDisplay}
                </span>

                <span className="font-medium text-primary text-xs">
                  {categoryId}
                </span>
              </div>

              <p className="text-xs capitalize">{storeAddress}</p>

              <ul className="flex items-center gap-4 md:gap-2 flex-wrap">
                {operatingHours &&
                  operatingHours.map(
                    (item, index) =>
                      item?.isOpen && (
                        <li
                          key={item.dayOfWeek}
                          className="flex items-center gap-4 md:gap-4 text-xs text-neutral-400 flex-wrap"
                        >
                          <span>
                            {item.dayOfWeek.charAt(0) +
                              item.dayOfWeek.slice(1, 3).toLowerCase()}
                            : {item.openingTime} - {item.closingTime}
                          </span>

                          {index < operatingHours.length - 1 && <span>|</span>}
                        </li>
                      ),
                  )}
              </ul>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button
            variant="white"
            leftIcon={<Edit size={14} />}
            size="icon"
            rounded="lg"
            onClick={onEdit}
          >
            Edit Store
          </Button>

          <Button
            variant="primary"
            leftIcon={<Eye size={14} />}
            size="icon"
            rounded="lg"
            onClick={onView}
          >
            View Store
          </Button>

          {/* <IconButton
                size="md"
                rounded="md"
                variant="red"
                onClick={onDelete}
              >
                <Trash2 size={16} />
              </IconButton> */}
        </div>
      </div>
    </Card>
  );
}
