'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import ProductRow from '@/features/vendor/products/components/product-row';
import { Loader2, Package, Plus, Upload } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import ProductForm from '@/features/vendor/products/components/add-product';
import ViewProductModal from '@/features/vendor/products/components/view-product-modal';
import DeleteConfirmModal from '@/features/vendor/products/components/delete-confirm-modal';
import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorToolbar from '@/components/layout/vendor-tool-bar';
import { Product } from '@/features/vendor/products/type';
import { getProductsAction } from '@/features/vendor/products/action';
import { getStoreAction } from '@/features/vendor/store/action';
import { IconButton } from '@/components/ui/buttons/icon-button';

const CATEGORIES = [
  'All',
  'Nigerian',
  'Chinese',
  'Indian',
  'Italian',
  'Snacks',
  'Beverages',
  'Desserts',
];

export default function ProductsPage() {
  const [sort, setSort] = useState('');
  const [storeId, setStoreId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [storeError, setStoreError] = useState<boolean>(false);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch store and products
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get store first
      const store = await getStoreAction();
      if (!store) {
        setStoreError(true);
        setIsLoading(false);
        return;
      }

      setStoreId(store.id);

      // Get products
      const productList = await getProductsAction(store.id);
      setProducts(productList);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle add new product
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormModalOpen(true);
  };

  // Handle view product
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormModalOpen(true);
  };

  // Handle delete product
  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Handle form success (refresh list)
  const handleFormSuccess = () => {
    fetchData();
  };

  // Filter products by category
  const filteredProducts =
    sort && sort !== 'All'
      ? products.filter((p) => p.productCategory === sort)
      : products;

  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <Card>
            <div className="flex justify-between items-start gap-8">
              <div className="space-y-8">
                <div className="space-y-2 md:space-y-2.5 flex-1">
                  <p className="font-medium text-neutral-900">
                    Product Upload Requirements
                  </p>
                  <p className="text-xs md:text-sm font-normal leading-6 text-neutral-500">
                    All products must have real, high-quality images (minimum
                    800x800px, clear lighting, professional presentation)
                  </p>
                </div>

                <Button
                  onClick={handleAddProduct}
                  variant="primary"
                  size="icon"
                  type="button"
                  disabled={!storeId}
                >
                  <Plus size={18} /> Add Product
                </Button>
              </div>

              <IconButton onClick={handleAddProduct} disabled={!storeId}>
                <Upload size={18} className="text-primary" />
              </IconButton>
            </div>
          </Card>

          {/* Toolbar */}
          <VendorToolbar
            title="Product Catalog"
            searchPlaceholder="Search products..."
            sort={sort}
            onSortChange={setSort}
            categories={CATEGORIES}
          />

          {/* Products List */}
          <Card>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <Package size={60} className="mx-auto mb-4 text-neutral-300" />

                <p className="text-red-600 mb-4">{error}</p>
                <Button variant="outline" size="md" onClick={fetchData}>
                  Try Again
                </Button>
              </div>
            ) : storeError ? (
              <div className="text-center py-12">
                <Package size={60} className="mx-auto mb-4 text-neutral-300" />

                <h2 className="text-lg font-medium mb-2">No Store Found</h2>
                <p className="text-neutral-600 mb-4 text-sm">
                  {' '}
                  Please create a store first before adding products.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  href="/vendor/store/new-store"
                >
                  Create Store
                </Button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 space-y-6">
                <Package size={60} className="mx-auto text-neutral-300" />
                <p className="text-neutral-500 text-sm">
                  {products.length === 0
                    ? 'No products yet. Add your first product to get started.'
                    : 'No products match your current filter.'}
                </p>
                {products.length === 0 && storeId && (
                  <Button
                    variant="primary"
                    size="icon"
                    onClick={handleAddProduct}
                  >
                    <Plus size={16} /> Add Product
                  </Button>
                )}
              </div>
            ) : (
              <ul className="space-y-4">
                {filteredProducts.map((product) => (
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
        </SectionLayout>
      </MainLayout>

      {/* Add/Edit Product Modal */}
      {storeId && (
        <ProductForm
          isModalOpen={isFormModalOpen}
          setIsModalOpen={setIsFormModalOpen}
          storeId={storeId}
          editProduct={selectedProduct}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* View Product Modal */}
      <ViewProductModal
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        product={selectedProduct}
        onEdit={() => {
          setIsViewModalOpen(false);
          setIsFormModalOpen(true);
        }}
      />

      {/* Delete Confirmation Modal */}
      {storeId && (
        <DeleteConfirmModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          product={selectedProduct}
          storeId={storeId}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}
