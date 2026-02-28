'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Store } from 'lucide-react';
import { StoreData } from '../types';
import { getStoreAction } from '../action';

export default function VendorStoreCard() {
  const [store, setStore] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStore() {
      try {
        const data = await getStoreAction();
        setStore(data);
      } catch {
        // Silently fail - store might not exist yet
      } finally {
        setLoading(false);
      }
    }
    fetchStore();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-primary/10 border border-border p-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-200" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-neutral-200 rounded w-3/4" />
            <div className="h-3 bg-neutral-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="rounded-2xl bg-primary/10 border border-border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <Store size={20} className="text-neutral-400" />
          </div>
          <div>
            <p className="font-medium text-primary-text-100 text-sm">
              No Store Yet
            </p>
            <span className="text-xs text-neutral-400">
              Create your store to get started
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-primary/10 border border-border p-4 space-y-4">
      <div className="flex items-center gap-3">
        {/* Store Logo */}
        {store.storeLogo ? (
          <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 bg-white shadow-md">
            <Image
              src={`${store.storeLogo}?t=${store.updatedAt}`}
              alt={store.storeName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0">
            <Store size={20} className="text-neutral-400" />
          </div>
        )}

        <div className="min-w-0">
          <p className="font-medium text-primary-text-100 text-sm truncate">
            {store.storeName}
          </p>
          <span className="text-xs text-neutral-400 truncate block">
            {store.storeAddress}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      {store.status === 'ACTIVE' && (
        <span className="flex w-fit items-center justify-center gap-1.5 rounded-full bg-[#10B981]  px-2.5 py-1 text-[10px] text-white shadow ">
          <Star strokeWidth={0} size={14} fill="white" />
          Active Partner
        </span>
      )}

      {store.status === 'PENDING_APPROVAL' && (
        <span className="flex w-fit items-center gap-2 rounded-full  bg-primary-text-100 px-2.5 py-1 text-[10px] text-primary justify-center">
          Pending Approval
        </span>
      )}

     

      {store.status === 'REJECTED' && (
        <span className="flex w-fit items-center gap-2 rounded-full border border-red-500 bg-red-500/10 px-2 py-1 text-xs text-red-600">
          Requires Attention
        </span>
      )}
    </div>
  );
}
