'use client';

import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Store } from 'lucide-react';
import ViewVendorModal from './view-vendor-modal';

type Vendor = {
  name: string;
  code: string;
  owner: string;
  location: string;
  email: string;
  business: string;
  rc: string;
  status: string;
  logo: string;
};

export default function VendorRow({ vendor }: { vendor: Vendor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <tr className="border-b border-border hover:bg-neutral-50">
      {/* Vendor */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Store size={18} className="text-white" />
          </div>

          <div>
            <p className="font-medium">{vendor.name}</p>
            <p className="text-neutral-400 text-xs">{vendor.code}</p>
          </div>
        </div>
      </td>

      {/* Owner */}
      <td className="px-6 py-5">
        <p className="font-medium">{vendor.owner}</p>
        <p className="text-neutral-400 text-xs">{vendor.location}</p>
      </td>

      {/* Contact */}
      <td className="px-6 py-5">
        <p className="font-medium">{vendor.email}</p>
        <p className="text-neutral-400 text-xs">LOS-458-AA</p>
      </td>

      {/* Business */}
      <td className="px-6 py-5">
        <p className="font-medium">{vendor.business}</p>
        <p className="text-neutral-400 text-xs">{vendor.rc}</p>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
          {vendor.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-end gap-3">
          <button onClick={() => setIsModalOpen(true)}>
            <Eye size={18} className="text-neutral-600" />
          </button>

          <button>
            <CheckCircle size={18} className="text-green-500" />
          </button>

          <button>
            <XCircle size={18} className="text-red-500" />
          </button>
        </div>
      </td>

      <ViewVendorModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        vendor={vendor}
      />
    </tr>
  );
}
