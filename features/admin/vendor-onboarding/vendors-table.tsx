import Card from '@/components/layout/card';
import VendorRow from './vendors-row';
import { Vendor } from './types';

type Props = {
  vendors: Vendor[];
  onView: (vendor: Vendor) => void;
  onAction: (
    vendorId: string,
    action: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ) => Promise<{ success: boolean; message: string }>;
};

export default function VendorsTable({ vendors, onView, onAction }: Props) {
  return (
    <Card spacing="none" className="bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-200">
          <thead className="border-b border-border bg-neutral-50 font-medium">
            <tr className="text-left text-neutral-600 font-medium">
              <th className="px-6 py-4">Vendor</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Business Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-16 text-center text-neutral-400"
                >
                  No vendors found
                </td>
              </tr>
            ) : (
              vendors.map((vendor) => (
                <VendorRow
                  key={vendor.id}
                  vendor={vendor}
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
