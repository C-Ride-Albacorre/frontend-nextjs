'use client';

import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import StoresTable from './stores-table';
import StoreTabs from './store-tab';
import ViewStoreModal from './view-store-modal';
import {
  getStoresAction,
  getStoreByIdAction,
  approveStoreAction,
} from './action';
import { AdminStore, StoreDetail } from './types';
import ErrorMessage from '@/components/layout/error-message';
import { Button } from '@/components/ui/buttons/button';

export default function StorePageSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Fetch stores list
  const storesQuery = useQuery({
    queryKey: ['admin-stores', page],
    queryFn: () => getStoresAction(page),
  });

  const allStores: AdminStore[] = storesQuery.data?.stores ?? [];
  const meta = storesQuery.data?.meta ?? {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  // Filter stores by active tab
  const stores = useMemo(() => {
    if (activeTab === 'all') return allStores;
    return allStores.filter((s: AdminStore) => s.status === activeTab);
  }, [allStores, activeTab]);

  // Handle view store
  const handleViewStore = async (store: AdminStore) => {
    setIsModalOpen(true);
    setIsLoadingDetail(true);

    try {
      const detail = await getStoreByIdAction(store.id);
      setStoreDetail(detail);
    } catch {
      setStoreDetail(null);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Shared approve/decline handler
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
      setStoreDetail(null);
      queryClient.invalidateQueries({ queryKey: ['admin-stores'] });
    } else {
      toast.error(result.message);
    }
    return result;
  };

  return (
    <div className="space-y-6">
      <StoreTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {storesQuery.isError && (
        <div className="flex justify-between items-center">
          <ErrorMessage
            message={
              (storesQuery.error as Error)?.message || 'Failed to load stores'
            }
          />
          <Button
            variant="white"
            leftIcon={<RefreshCcw size={14} />}
            size="icon"
            onClick={() => storesQuery.refetch()}
          >
            Retry
          </Button>
        </div>
      )}

      {storesQuery.isPending ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <>
          <StoresTable
            stores={stores}
            onView={handleViewStore}
            onAction={handleStoreAction}
          />

          {/* Pagination */}
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
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm font-medium">
                  {meta.page} / {meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <ViewStoreModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        store={storeDetail}
        isLoading={isLoadingDetail}
        onAction={handleStoreAction}
      />
    </div>
  );
}
