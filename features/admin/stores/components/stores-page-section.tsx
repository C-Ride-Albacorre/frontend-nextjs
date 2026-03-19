'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Loader2, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import StoresTable from './stores-table';
import ViewStoreModal from './view-store-modal';

import { approveStoreAction } from '../action';
import { Store, StoresMeta } from '../types';
import ErrorMessage from '@/components/layout/error-message';
import { Button } from '@/components/ui/buttons/button';
import VendorToolbar from '@/components/layout/vendor-tool-bar';

const STATUS_OPTIONS = [
  { label: 'All Stores', value: '' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Pending Approval', value: 'PENDING_APPROVAL' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Rejected', value: 'REJECTED' },
];

type Props = {
  stores: Store[];
  meta: StoresMeta;
  currentPage: number;
  currentStatus: string;
  currentSearch: string;
  error: string | null;
};

export default function StoresPageSection({
  stores,
  meta,
  currentPage,
  currentStatus,
  currentSearch,
  error,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);
  const [statusFilter, setStatusFilter] = useState(currentStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

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

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
  };

  const handleViewStore = (store: Store) => {
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
      setIsModalOpen(false);
      setSelectedStore(null);
      router.refresh();
    } else {
      toast.error(result.message);
    }

    return result;
  };

  return (
    <div className="space-y-6">
      <VendorToolbar
        searchPlaceholder="Search stores..."
        search={search}
        onSearchChange={setSearch}
        filter={statusFilter}
        onFilterChange={handleStatusChange}
        filterOptions={STATUS_OPTIONS}
        filterPlaceholder="Filter by status"
      />

      {error ? (
        <div className="flex justify-between items-center gap-2">
          <ErrorMessage message={error} />
          <Button
            variant="white"
            leftIcon={<RefreshCcw size={14} />}
            size="icon"
            onClick={() => router.refresh()}
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="relative">
          {isPending && (
            <div className="absolute inset-0 bg-white/60 flex justify-center pt-20 z-10">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          )}

          <StoresTable
            stores={stores}
            onView={handleViewStore}
            onAction={handleStoreAction}
          />

          {meta.totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-neutral-500">
                Showing {(meta.page - 1) * meta.limit + 1}–
                {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm font-medium">
                  {meta.page} / {meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage >= meta.totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <ViewStoreModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        store={selectedStore}
        onAction={handleStoreAction}
      />
    </div>
  );
}
