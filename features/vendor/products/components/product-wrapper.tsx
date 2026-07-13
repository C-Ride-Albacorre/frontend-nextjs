'use client';

import { Button } from '@/components/ui/buttons/button';
import { Package } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../type';
import ProductForm from './add-product';
import ViewProductModal from './view-product-modal';
import DeleteConfirmModal from './delete-confirm-modal';
import ProductRow from './product-row';

export default function ProductWrapper({
  selectedId,
  productData,
}: {
  selectedId: string;
  productData: Product[];
}) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  console.log('Product data:', productData);

  const handleAddProduct = () => {
    if (!selectedId) return;

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

  return (
    <>
      <div className="flex justify-end w-full mb-6">
        <Button variant="primary" size="icon" onClick={handleAddProduct}>
          <Package size={16} /> Add Product
        </Button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {productData.map((product: Product) => (
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
      {/* MODALS */}

      <ProductForm
        key={selectedProduct?.id ?? 'new'}
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        storeId={selectedId}
        editProduct={selectedProduct}
      />

      <ViewProductModal
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        product={selectedProduct}
        onEdit={() => {
          setIsViewModalOpen(false);
          setIsFormModalOpen(true);
        }}
      />
      <DeleteConfirmModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        product={selectedProduct}
        storeId={selectedId}
      />
    </>
  );
}
