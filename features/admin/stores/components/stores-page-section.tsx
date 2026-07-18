'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import StoresTable from './stores-table';
import ViewStoreModal from './view-store-modal';

import { approveStoreAction } from '../action';
import {  StoreDetail,  StoresMeta } from '../types';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import Toolbar from '@/components/layout/tool-bar';

const STATUS_OPTIONS = [
  { label: 'All Stores', value: '' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Pending Approval', value: 'PENDING_APPROVAL' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Rejected', value: 'REJECTED' },
];

type Props = {
  stores: StoreDetail[];
  meta: StoresMeta;
  currentPage: number;
  currentStatus: string;
  currentSearch: string;
};

export default function StoresPageSection({
  stores,
  meta,
  currentPage,
  currentStatus,
  currentSearch,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);
  const [statusFilter, setStatusFilter] = useState(currentStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreDetail | null>(null);

  // Sync local state with URL params on external navigation (e.g. back/forward)
  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    setStatusFilter(currentStatus);
  }, [currentStatus]);

  // Debounce search -> push to URL
  useEffect(() => {
    if (search === currentSearch) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set('search', search);
      else params.delete('search');
      params.set('page', '1');
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [search, currentSearch, searchParams, pathname, router, startTransition]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateParams({ status: value, page: '1' });
  };

  const handleViewStore = (store: StoreDetail) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const handleStoreAction = async (
    storeId: string,
    action: 'ACTIVE' | 'REJECTED',
    rejectionReason?: string,
  ) => {
    const payload = rejectionReason ? { action, rejectionReason } : { action };
    const result = await approveStoreAction(storeId, payload);

    if (result.success) {
      toast.success(
        action === 'ACTIVE'
          ? 'Store approved successfully'
          : 'Store declined successfully',
      );
      router.refresh();
      setIsModalOpen(false);
      setSelectedStore(null);
    } else {
      toast.error(result.message);
    }

    return result;
  };

  return (
    <div className="space-y-6">
      <Toolbar
        title={
          statusFilter === ''
            ? 'All Stores'
            : `${STATUS_OPTIONS.find((cat) => cat.value === statusFilter)?.label ?? statusFilter} `
        }
        searchPlaceholder="Search stores..."
        search={search}
        onSearchChange={setSearch}
        filter={statusFilter}
        onFilterChange={handleStatusChange}
        filterOptions={STATUS_OPTIONS}
        filterPlaceholder="Filter by status"
      />

      <div className="relative">
        {isPending && (
          <div className="absolute inset-0 bg-white/60 flex justify-center pt-20 z-10">
            <LoaderCircle className="animate-spin text-primary" size={32} />
          </div>
        )}

        <div>
          <StoresTable
            stores={stores}
            onView={handleViewStore}
            onAction={handleStoreAction}
          />

          {/* <p className="text-sm text-neutral-500">
                Showing {(meta.page - 1) * meta.limit + 1}–
                {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
              </p> */}
          {meta.totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={meta.totalPages ?? 0}
              isLoading={isPending}
            />
          )}
        </div>
      </div>

      <ViewStoreModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        store={selectedStore}
      />

  
    </div>
  );
}
