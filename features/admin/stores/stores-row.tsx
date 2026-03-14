'use client';

import { useState } from 'react';
import { Eye, Ban, Store } from 'lucide-react';
import ViewStoreModal from './view-store-modal';

type StoreItem = {
  name: string;
  code: string;
  owner: string;
  location: string;
  email: string;
  category: string;
  rc: string;
  status: string;
  logo: string;
};

export default function StoreRow({ store }: { store: StoreItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <tr className="border-b border-border hover:bg-neutral-50">
      {/* Store */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Store size={18} className="text-white" />
          </div>

          <div>
            <p className="font-medium">{store.name}</p>
            <p className="text-neutral-400 text-xs">{store.code}</p>
          </div>
        </div>
      </td>

      {/* Owner */}
      <td className="px-6 py-5">
        <p className="font-medium">{store.owner}</p>
        <p className="text-neutral-400 text-xs">{store.location}</p>
      </td>

      {/* Contact */}
      <td className="px-6 py-5">
        <p className="font-medium">{store.email}</p>
      </td>

      {/* Category */}
      <td className="px-6 py-5">
        <p className="font-medium">{store.category}</p>
        <p className="text-neutral-400 text-xs">{store.rc}</p>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            store.status === 'Active'
              ? 'bg-emerald-100 text-emerald-600'
              : store.status === 'Suspended'
                ? 'bg-orange-100 text-orange-600'
                : 'bg-red-100 text-red-600'
          }`}
        >
          {store.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-end gap-3">
          <button onClick={() => setIsModalOpen(true)}>
            <Eye size={18} className="text-neutral-600" />
          </button>

          <button>
            <Ban size={18} className="text-red-500" />
          </button>
        </div>
      </td>

      <ViewStoreModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        store={store}
      />
    </tr>
  );
}
