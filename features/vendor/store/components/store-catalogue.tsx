import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import clsx from 'clsx';
import { Edit, Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { StoreCatalogueProps } from '../types';

export default function StoreCatalogue({
  storeData,
  onView,
  onEdit,
  onDelete,
}: StoreCatalogueProps) {
  const {
    storeLogo,
    storeName,
    storeCategory,
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
    <div className="space-y-6">
      <Card className="bg-white">
        <div>
          <div className="md:flex items-center justify-between gap-4 space-y-6 md:space-y-0">
            {/* LEFT */}
            <div className="md:flex space-y-6 md:space-y-0 items-center gap-4 flex-1">
              <div className="relative w-full md:w-16 xl:w-24 h-40 md:h-16 xl:h-24">
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

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-primary-text-100 text-sm">
                    {storeName}
                  </p>

                  <span
                    className={clsx(
                      'rounded-full px-2 py-1 text-xs capitalize',
                      {
                        'bg-emerald-500/10 text-emerald-600':
                          statusDisplay === 'Active',
                        'bg-amber-100 text-amber-600':
                          statusDisplay === 'Pending',
                        'bg-amber-500/10 text-amber-600':
                          statusDisplay === 'Draft',
                      },
                    )}
                  >
                    {statusDisplay}
                  </span>

                  <span className="font-medium text-primary text-xs">
                    {storeCategory}
                  </span>
                </div>

                <p className="text-sm">{storeAddress}</p>

                {operatingHours &&
                  operatingHours.map(
                    (item) =>
                      item?.isOpen && (
                        <div
                          key={item.dayOfWeek}
                          className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap"
                        >
                          <span>
                            {item.dayOfWeek.charAt(0) +
                              item.dayOfWeek.slice(1, 3).toLowerCase()}
                            : {item.openingTime} - {item.closingTime}
                          </span>
                        </div>
                      ),
                  )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              <Button
                variant="white"
                leftIcon={<Eye size={14} />}
                size="1xs"
                rounded="lg"
                onClick={onView}
              >
                View
              </Button>

              <Button
                variant="white"
                leftIcon={<Edit size={14} />}
                size="1xs"
                rounded="lg"
                onClick={onEdit}
              >
                Edit
              </Button>

              <IconButton
                size="md"
                rounded="md"
                variant="red"
                onClick={onDelete}
              >
                <Trash2 size={16} />
              </IconButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
