'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Store } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import Card from '@/components/layout/card';
import VendorToolbar from '@/components/layout/vendor-tool-bar';
import StoreCatalogue from './store-catalogue';
import ViewStoreModal from './view-store-modal';
import DeleteStoreModal from './delete-store-modal';
import { StoreData } from '../types';
import { getStoresAction } from '../action';
import { div } from 'framer-motion/client';

const CATEGORIES = ['All'];

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
    setSelectedStore(store);
    setIsDeleteModalOpen(true);
  };

  // Handle delete success — refresh list
  const handleDeleteSuccess = () => {
    fetchStores();
  };

  return (
    <>
      <VendorToolbar
        title="Store Catalog"
        searchPlaceholder="Search stores..."
        sort={sort}
        onSortChange={setSort}
        categories={CATEGORIES}
      />

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
            <Button variant="primary" size="md" href="/vendor/store/new-store">
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
              onDelete={() => handleDeleteStore(store)}
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
        store={selectedStore}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
