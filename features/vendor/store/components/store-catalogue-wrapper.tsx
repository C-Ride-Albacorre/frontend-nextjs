'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import VendorToolbar from '@/components/layout/tool-bar';
import StoreCatalogue from './store-catalogue';
import ViewStoreModal from './view-store-modal';
import DeleteStoreModal from './delete-store-modal';
import {  StoreData } from '../types';

export default function StoreCatalogueWrapper({
  storeData,
}: {
  storeData: StoreData[];
}) {
  const router = useRouter();

  const stores = storeData;

  const [sort, setSort] = useState('All');
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
  const [selectedStoreIds, setSelectedStoreIds] = useState<Set<string>>(
    new Set(),
  );

  // Handle view store
  const handleViewStore = (store: StoreData) => {
    setSelectedStore(store);
    setIsViewModalOpen(true);
  };

  // Handle edit store — navigate to edit page
  const handleEditStore = (store: StoreData) => {
    router.push(`/vendor/store/${store.id}`);
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
    setIsDeleteModalOpen(false);
  };

  const selectStore = useCallback((store: StoreData) => {
    setSelectedStoreIds((prev) => {
      const next = new Set(prev);

      if (next.has(store.id)) {
        next.delete(store.id);
      } else {
        next.add(store.id);
      }

      return next;
    });
  }, []);

  return (
    <>
      <VendorToolbar
        title="Store Catalog"

      />
      {selectedStoreIds.size > 0 && (
        <div className="flex justify-end">
          <Button
            variant="red-secondary"
            rounded="lg"
            leftIcon={<Trash2 size={14} />}
            size="icon"
            onClick={handleDeleteSelectedStores}
          >
            {`Delete Selected Store (${selectedStoreIds.size})`}
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
