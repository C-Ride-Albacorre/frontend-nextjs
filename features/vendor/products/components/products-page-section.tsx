'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import ProductRow from './product-row';
import { ChevronLeft, Package, Plus } from 'lucide-react';
import { useState } from 'react';
import ProductForm from './add-product';
import ViewProductModal from './view-product-modal';
import DeleteConfirmModal from './delete-confirm-modal';
import { Product } from '../type';
import { useRouter } from 'next/navigation';
import { StoreData } from '@/features/vendor/store/types';

type Props = {
  stores: StoreData[];
  products: Product[];
  selectedStoreId: string | null;
};

export default function ProductsPageSection({
  stores,
  products,
  selectedStoreId,
}: Props) {
  const router = useRouter();

  const [sort, setSort] = useState('');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectStore = (storeId: string) => {
    router.push(`/vendor/products?storeId=${encodeURIComponent(storeId)}`);
  };

  const handleBackToStores = () => {
    router.push('/vendor/products');
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormModalOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleFormSuccess = () => {
    router.refresh();
  };

  const filteredProducts =
    sort && sort !== 'All'
      ? products.filter((p: Product) => p.subcategoryId === sort)
      : products;

  return (
    <>
      {/* SHOW STORES FIRST */}
      {!selectedStoreId && (
        <Card>
          {stores.length === 0 ? (
            <div className="text-center py-12">
              <Package size={60} className="mx-auto mb-4 text-neutral-300" />
              <p className="text-neutral-600 mb-4">
                You don&apos;t have any store yet.
              </p>
              <Button href="/vendor/store/new-store">Create Store</Button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store) => (
                <li key={store.id}>
                  <Card
                    className={
                      store.status === 'PENDING_APPROVAL'
                        ? 'opacity-50 pointer-events-none grayscale'
                        : ''
                    }
                  >
                    <div className="space-y-8">
                      {/* Store Header */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
                          {store.storeLogo ? (
                            <img
                              src={store.storeLogo}
                              alt={store.storeName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-semibold text-neutral-500">
                              {store.storeName?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-neutral-900">
                            {store.storeName}
                          </p>
                          <div className="flex items-center gap-2">
                            {store.status === 'PENDING_APPROVAL' && (
                              <span className="text-primary bg-primary-text-100 px-2 py-1 rounded-2xl text-[10px]">
                                pending
                              </span>
                            )}
                            {store.status === 'ACTIVE' && (
                              <span className="text-[#10B981] bg-[#108981]/10 px-2 py-1 rounded-2xl text-[10px]">
                                active
                              </span>
                            )}
                            <p className="text-xs text-neutral-500">
                              {store.categoryId}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Store Info */}
                      <div className="text-sm text-neutral-600 space-y-4">
                        <p className="space-x-1">
                          <span className="font-medium text-neutral-800">
                            Store id:
                          </span>{' '}
                          <span>{store.id.slice(0, 24)}...</span>
                        </p>
                        <p className="space-x-1">
                          <span className="font-medium text-neutral-800">
                            Address:
                          </span>
                          <span>{store.storeAddress}</span>
                        </p>
                        <p className="space-x-1">
                          <span className="font-medium text-neutral-800">
                            Created on:
                          </span>
                          <span>
                            {new Date(store.createdAt).toDateString()}
                          </span>
                        </p>
                      </div>

                      {/* Action */}
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleSelectStore(store.id)}
                        disabled={store.status === 'PENDING_APPROVAL'}
                      >
                        {store.status === 'PENDING_APPROVAL'
                          ? 'Awaiting Approval'
                          : 'View Products'}
                      </Button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {/* PRODUCTS VIEW */}
      {selectedStoreId && (
        <Card>
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handleBackToStores}
              leftIcon={<ChevronLeft size={16} />}
            >
              Back to Stores
            </Button>

            <Button onClick={handleAddProduct} variant="primary" size="icon">
              <Plus size={16} /> Add Product
            </Button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package size={60} className="mx-auto mb-4 text-neutral-300" />
              <p className="text-neutral-500">
                No products yet. Add your first product.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {filteredProducts.map((product: Product) => (
                <li key={product.id}>
                  <ProductRow
                    product={product}
                    onView={() => handleViewProduct(product)}
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteProduct(product)}
                  />
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {/* MODALS */}
      {selectedStoreId && (
        <ProductForm
          key={selectedProduct?.id ?? 'new'}
          isModalOpen={isFormModalOpen}
          setIsModalOpen={setIsFormModalOpen}
          storeId={selectedStoreId}
          editProduct={selectedProduct}
          onSuccess={handleFormSuccess}
        />
      )}

      <ViewProductModal
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        product={selectedProduct}
        onEdit={() => {
          setIsViewModalOpen(false);
          setIsFormModalOpen(true);
        }}
      />

      {selectedStoreId && (
        <DeleteConfirmModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          product={selectedProduct}
          storeId={selectedStoreId}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}
