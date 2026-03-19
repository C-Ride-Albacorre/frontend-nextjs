import Card from '@/components/layout/card';
import { Store } from '../types';
import StoreRow from './stores-row';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';
import { formatStatus } from '../helpers';
import { statusStyles } from '../data';
import { StoreIcon } from 'lucide-react';

type Props = {
  stores: Store[];
  onView: (store: Store) => void;
  onAction: (
    storeId: string,
    action: 'ACTIVE' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

export default function StoresTable({ stores, onView, onAction }: Props) {
  return (
    <>
      <div className="md:hidden space-y-4">
        {stores.length === 0 ? (
          <div className="text-center py-10 text-neutral-400">
            No Stores found
          </div>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl p-4 border border-border space-y-6"
            >
              {/* Top */}
              <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                <div>
                  <p className="font-medium">{store.user.businessName}</p>
                  <p className="text-xs text-neutral-400">{store.id}</p>
                </div>

                <span
                  className={clsx(
                    'px-2 py-1 text-[10px] rounded-full',
                    statusStyles[store.status] ??
                      'bg-neutral-100 text-neutral-600',
                  )}
                >
                  {formatStatus(store.status)}
                </span>
              </div>

              {/* Owner */}
              <div className="text-sm">
                <p className="text-neutral-400 text-xs">Owner</p>
                <p> {store.user.name ?? '—'}</p>
              </div>

              {/* Contact */}
              <div className="text-sm">
                <p className="text-neutral-400 text-xs">Contact</p>

                <div className='space-y-1'>
                  <p>{store.email}</p>
                  <p>{store.phoneNumber}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="full"
                  onClick={() => onView(store)}
                  leftIcon={<StoreIcon size={16} />}
                >
                  View Store
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Card spacing="none" className="bg-white overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-neutral-50">
              <tr className="text-left text-neutral-600 font-medium">
                <th className="px-6 py-4">Store</th>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-neutral-400"
                  >
                    No stores found
                  </td>
                </tr>
              ) : (
                stores.map((store) => (
                  <StoreRow
                    key={store.id}
                    store={store}
                    onView={onView}
                    onAction={onAction}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
