// features/admin/vendor-onboarding/components/vendors-table.tsx
import Card from '@/components/layout/card';
import VendorRow from './vendors-row';
import { Vendor } from '../types';
import { Button } from '@/components/ui/buttons/button';
import { formatStatus } from '../helpers';
import { statusStyles } from '../data';
import clsx from 'clsx';
import {  UserRound } from 'lucide-react';

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
    <>
      <div className="md:hidden space-y-6">
        {vendors.length === 0 ? (
          <div className="text-center py-10 text-neutral-400">
            No vendors found
          </div>
        ) : (
          vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-xl p-4 border border-border space-y-6"
            >
              {/* Top */}

              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <UserRound size={18} className="text-white" />
              </div>

              <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                <div>
                  <p className="font-medium">
                    {vendor.businessInfo?.businessName ?? '—'}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {vendor.id.slice(0, 8)}
                  </p>
                </div>

                <span
                  className={clsx(
                    'px-2 py-1 text-[10px] rounded-full',
                    statusStyles[vendor.status] ??
                      'bg-neutral-100 text-neutral-600',
                  )}
                >
                  {formatStatus(vendor.status)}
                </span>
              </div>

              {/* Owner */}
              <div className="text-sm">
                <p className="text-neutral-400 text-xs">Owner</p>
                <p>
                  {vendor.firstName} {vendor.lastName}
                </p>
              </div>

              {/* Contact */}
              <div className="text-sm">
                <p className="text-neutral-400 text-xs">Contact</p>
                <p>{vendor.email}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="full"
                  onClick={() => onView(vendor)}
                 
                >
                  View Vendor
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Card spacing="none" className="bg-white overflow-hidden hidden md:block">
        <div className=" overflow-x-auto">
          <table className="w-full text-sm">
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
    </>
  );
}
