import Card from '@/components/layout/card';
import StoreRow from './stores-row';
import { AdminStore } from './types';

type Props = {
  stores: AdminStore[];
  onView: (store: AdminStore) => void;
  onAction: (
    storeId: string,
    action: 'ACTIVE' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

export default function StoresTable({ stores, onView, onAction }: Props) {
  return (
    <Card spacing="none" className="bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-200">
          <thead className="border-b border-border bg-neutral-50 font-medium">
            <tr className="text-left text-neutral-600 font-medium">
              <th className="px-6 py-4">Store</th>
              <th className="px-6 py-4">Owner</th>
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
  );
}
