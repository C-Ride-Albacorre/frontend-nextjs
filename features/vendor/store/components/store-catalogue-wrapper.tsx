'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Store, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import Card from '@/components/layout/card';
import VendorToolbar from '@/components/layout/vendor-tool-bar';
import StoreCatalogue from './store-catalogue';
import ViewStoreModal from './view-store-modal';
import DeleteStoreModal from './delete-store-modal';
import { StoreData } from '../types';
import { getStoresAction } from '../action';

export default function StoreCatalogueWrapper({
  storeData: initialStoreData,
}: {
  storeData: StoreData | null;
}) {
  const router = useRouter();
  const [stores, setStores] = useState<StoreData[]>(
    initialStoreData ? [initialStoreData] : [],
  );
  const [sort, setSort] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
  const [selectedStoreIds, setSelectedStoreIds] = useState<Set<string>>(
    new Set(),
  );
  const [isDeletingMultiple, setIsDeletingMultiple] = useState(false);

  // Refresh store list
  const fetchStores = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getStoresAction();
      setStores(data);
    } catch {
      // Keep existing data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load fresh data on mount
  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Handle view store
  const handleViewStore = (store: StoreData) => {
    setSelectedStore(store);
    setIsViewModalOpen(true);
  };

  // Handle edit store — navigate to edit page
  const handleEditStore = (store: StoreData) => {
    router.push(`/vendor/store/${store.id}`);
  };

  // Handle delete store
  const handleDeleteStore = (store: StoreData) => {
    setSelectedStoreIds(new Set([store.id]));
    setIsDeleteModalOpen(true);
  };

  // Handle bulk delete — open modal for selected stores
  const handleDeleteSelectedStores = () => {
    if (selectedStoreIds.size === 0) return;
    setSelectedStore(null);
    setIsDeleteModalOpen(true);
  };

  // Handle delete success — refresh list and clear selection
  const handleDeleteSuccess = () => {
    setSelectedStoreIds(new Set());
    fetchStores();
  };

  const selectStore = (store: StoreData) => {
    setSelectedStoreIds((prev) => {
      const next = new Set(prev);
      if (next.has(store.id)) {
        next.delete(store.id);
      } else {
        next.add(store.id);
      }
      return next;
    });
  };

  return (
    <>
      <VendorToolbar
        title="Store Catalog"
        searchPlaceholder="Search stores..."
        filter={sort}
        onFilterChange={setSort}
        filterOptions={[{ label: 'All', value: 'All' }]}
      />
      {selectedStoreIds.size > 0 && (
        <div className="flex justify-end">
          <Button
            variant="red-secondary"
            rounded="lg"
            leftIcon={<Trash2 size={14} />}
            size="icon"
            onClick={handleDeleteSelectedStores}
            disabled={isDeletingMultiple}
          >
            {isDeletingMultiple
              ? 'Deleting...'
              : `Delete Selected Store (${selectedStoreIds.size})`}
          </Button>
        </div>
      )}

      {isLoading ? (
        <Card>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </Card>
      ) : stores.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Store size={60} className="mx-auto mb-4 text-neutral-300" />
            <p className="text-neutral-500 mb-4">
              No stores yet. Add your first store to get started.
            </p>
            <Button
              variant="primary"
              size="md"
              href="/vendor/store/new-store"
              leftIcon={<Store size={16} />}
            >
              Add Store
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {stores.map((store) => (
            <StoreCatalogue
              key={store.id}
              storeData={store}
              onView={() => handleViewStore(store)}
              onEdit={() => handleEditStore(store)}
              onSelectStore={selectStore}
              isSelected={selectedStoreIds.has(store.id)}
            />
          ))}
        </div>
      )}

      {/* View Store Modal */}
      <ViewStoreModal
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        store={selectedStore}
        onEdit={() => {
          setIsViewModalOpen(false);
          if (selectedStore) {
            handleEditStore(selectedStore);
          }
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteStoreModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        stores={stores.filter((s) => selectedStoreIds.has(s.id))}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
