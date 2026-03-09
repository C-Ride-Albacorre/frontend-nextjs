'use client';

import Modal from '@/components/layout/modal';
import FormHeader from '@/components/ui/headers/form-header';
import { useState } from 'react';
import { ProductFormProps } from '../type';
import AddProductType from './add-product-type';
import SingleProductForm from './form/single-product';
import VariableProductForm from './variable-product';

const CATEGORIES = [
  { label: 'Nigerian', value: 'Nigerian' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Snacks', value: 'Snacks' },
  { label: 'Beverages', value: 'Beverages' },
  { label: 'Desserts', value: 'Desserts' },
];

const STOCK_STATUSES = [
  { label: 'In Stock', value: 'IN_STOCK' },
  { label: 'Low Stock', value: 'LOW_STOCK' },
  { label: 'Out of Stock', value: 'OUT_OF_STOCK' },
];

const PRODUCT_STATUSES = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Draft', value: 'DRAFT' },
];

export default function ProductForm({
  isModalOpen,
  setIsModalOpen,
  storeId,
  editProduct,
  onSuccess,
}: ProductFormProps) {
  const isEditing = !!editProduct;

  // ✅ type lives here so switching is possible
  const [productType, setProductType] = useState<'SINGLE' | 'VARIABLE'>(
    (editProduct?.productType as 'SINGLE' | 'VARIABLE') ?? 'SINGLE',
  );

  // ✅ shared fields live here — survive type switches
  const [productName, setProductName] = useState(
    editProduct?.productName ?? '',
  );
  const [productCategory, setProductCategory] = useState(
    editProduct?.productCategory ?? '',
  );
  const [sku, setSku] = useState(editProduct?.sku ?? '');
  const [description, setDescription] = useState(
    editProduct?.description ?? '',
  );
  const [stockStatus, setStockStatus] = useState<string>(
    editProduct?.stockStatus ?? 'IN_STOCK',
  );
  const [productStatus, setProductStatus] = useState<string>(
    editProduct?.productStatus ?? 'ACTIVE',
  );
  const [basePrice, setBasePrice] = useState(
    editProduct?.basePrice?.toString() ?? '',
  );
  const [stockQuantity, setStockQuantity] = useState(
    editProduct?.stockQuantity?.toString() ?? '',
  );
  const [lowStockThreshold, setLowStockThreshold] = useState(
    editProduct?.lowStockThreshold?.toString() ?? '',
  );
  const [image, setImage] = useState<File | null>(null);

  const existingImageUrl =
    editProduct?.productImages?.find((img) => img.isPrimary)?.imageUrl ??
    editProduct?.productImages?.[0]?.imageUrl;

  const handleClose = () => setIsModalOpen(false);

  const handleSuccess = () => {
    handleClose();
    onSuccess?.();
  };

  // ✅ shared fields passed down to both forms
  const sharedFields = {
    productName,
    setProductName,
    productCategory,
    setProductCategory,
    sku,
    setSku,
    description,
    setDescription,
    stockStatus,
    setStockStatus,
    productStatus,
    setProductStatus,
    basePrice,
    setBasePrice,
    stockQuantity,
    setStockQuantity,
    lowStockThreshold,
    setLowStockThreshold,
    image,
    setImage,
    existingImageUrl,
    CATEGORIES,
    STOCK_STATUSES,
    PRODUCT_STATUSES,
    isEditing,
    storeId,
    editProduct,
    handleClose,
    onSuccess: handleSuccess,
  };

  return (
    <Modal onClose={handleClose} isModalOpen={isModalOpen}>
      <div className="space-y-6 py-4">
        <FormHeader
          title={isEditing ? 'Edit Product' : 'Add New Product'}
          subtitle={
            isEditing
              ? 'Update your product details'
              : 'Create a new product for your store'
          }
          className="text-left"
        />

        {/* type switcher always visible — even when editing */}
        <AddProductType
          productType={productType}
          setProductType={setProductType}
        />

        {/* ✅ NO key prop — we want these to persist shared field values on switch */}
        {productType === 'SINGLE' && <SingleProductForm {...sharedFields} />}

        {productType === 'VARIABLE' && (
          <VariableProductForm {...sharedFields} />
        )}
      </div>
    </Modal>
  );
}
