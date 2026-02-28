'use client';

import Modal from '@/components/layout/modal';
import { Button } from '@/components/ui/buttons/button';
import FormHeader from '@/components/ui/headers/form-header';
import FileDropzone from '@/components/ui/inputs/file-dropzone';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import Textarea from '@/components/ui/inputs/textarea';
import { useEffect, useRef, useState, useTransition } from 'react';
import { ProductFormProps, Product } from '../type';
import { createProductAction, updateProductAction } from '../action';

const CATEGORIES = [
  { label: 'Nigerian', value: 'Nigerian' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Snacks', value: 'Snacks' },
  { label: 'Beverages', value: 'Beverages' },
  { label: 'Desserts', value: 'Desserts' },
];

const PRODUCT_TYPES = [
  { label: 'Simple', value: 'SIMPLE' },
  { label: 'Variable', value: 'VARIABLE' },
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
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  // Form field states
  const [productName, setProductName] = useState(
    editProduct?.productName || '',
  );
  const [productCategory, setProductCategory] = useState(
    editProduct?.productCategory || '',
  );
  const [sku, setSku] = useState(editProduct?.sku || '');
  const [description, setDescription] = useState(
    editProduct?.description || '',
  );
  const [productType, setProductType] = useState(
    editProduct?.productType || 'SIMPLE',
  );
  const [stockStatus, setStockStatus] = useState(
    editProduct?.stockStatus || 'IN_STOCK',
  );
  const [productStatus, setProductStatus] = useState(
    editProduct?.productStatus || 'ACTIVE',
  );
  const [basePrice, setBasePrice] = useState(
    editProduct?.basePrice?.toString() || '',
  );
  const [stockQuantity, setStockQuantity] = useState(
    editProduct?.stockQuantity?.toString() || '',
  );
  const [lowStockThreshold, setLowStockThreshold] = useState(
    editProduct?.lowStockThreshold?.toString() || '',
  );
  const [image, setImage] = useState<File | null>(null);

  // Get existing image URL from editProduct
  const existingImageUrl =
    editProduct?.productImages?.find((img) => img.isPrimary)?.imageUrl ||
    editProduct?.productImages?.[0]?.imageUrl;

  // Error state
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset form when editProduct changes
  useEffect(() => {
    if (editProduct) {
      setProductName(editProduct.productName);
      setProductCategory(editProduct.productCategory);
      setSku(editProduct.sku);
      setDescription(editProduct.description || '');
      setProductType(editProduct.productType);
      setStockStatus(editProduct.stockStatus);
      setProductStatus(editProduct.productStatus);
      setBasePrice(editProduct.basePrice?.toString() || '');
      setStockQuantity(editProduct.stockQuantity?.toString() || '');
      setLowStockThreshold(editProduct.lowStockThreshold?.toString() || '');
      setImage(null);
    } else {
      // Reset form for new product
      setProductName('');
      setProductCategory('');
      setSku('');
      setDescription('');
      setProductType('SIMPLE');
      setStockStatus('IN_STOCK');
      setProductStatus('ACTIVE');
      setBasePrice('');
      setStockQuantity('');
      setLowStockThreshold('');
      setImage(null);
    }
    setErrors({});
    setErrorMessage(null);
  }, [editProduct]);

  // Also reset when modal opens/closes
  useEffect(() => {
    if (!isModalOpen) {
      setErrors({});
      setErrorMessage(null);
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage(null);

    // Build FormData manually
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productCategory', productCategory);
    formData.append('sku', sku);
    formData.append('description', description);
    formData.append('productType', productType);
    formData.append('stockStatus', stockStatus);
    formData.append('productStatus', productStatus);
    formData.append('basePrice', basePrice);
    formData.append('stockQuantity', stockQuantity);
    formData.append('lowStockThreshold', lowStockThreshold);

    // Add image file if present (for both create and edit)
    if (image) {
      formData.append('images', image);
    }

    startTransition(async () => {
      try {
        let result;
        if (isEditing && editProduct) {
          result = await updateProductAction(
            storeId,
            editProduct.id,
            undefined,
            formData,
          );
        } else {
          result = await createProductAction(storeId, undefined, formData);
        }

        if (result?.status === 'success') {
          setIsModalOpen(false);
          onSuccess?.();
        } else if (result?.status === 'error') {
          setErrors(result.errors || {});
          setErrorMessage(result.message || 'An error occurred');
        }
      } catch {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    });
  };

  return (
    <Modal onClose={handleClose} isModalOpen={isModalOpen}>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 py-4">
        <FormHeader
          title={isEditing ? 'Edit Product' : 'Add New Product'}
          subtitle={
            isEditing
              ? 'Update your product details'
              : 'Create a new product for your store'
          }
          className="text-left"
        />

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="space-y-6">
          <Input
            id="productName"
            name="productName"
            label="Product Name"
            placeholder="E.g., Signature Jollof Rice"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            errorMessage={errors?.productName?.[0]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="productCategory"
              label="Category"
              placeholder="Select category"
              options={CATEGORIES}
              value={productCategory}
              onChange={setProductCategory}
              errorMessage={errors?.productCategory?.[0]}
            />

            <Input
              id="sku"
              name="sku"
              label="SKU"
              placeholder="e.g., JR-001"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              disabled={isEditing}
              errorMessage={errors?.sku?.[0]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="productType"
              label="Product Type"
              placeholder="Select type"
              options={PRODUCT_TYPES}
              value={productType}
              onChange={(value) => setProductType(value as "SIMPLE" | "VARIABLE")}
              errorMessage={errors?.productType?.[0]}
            />

            <Input
              id="basePrice"
              name="basePrice"
              label="Price (₦)"
              type="number"
              placeholder="e.g., 4500"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              errorMessage={errors?.basePrice?.[0]}
            />
          </div>

          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Describe your product here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            errorMessage={errors?.description?.[0]}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              id="stockQuantity"
              name="stockQuantity"
              label="Stock Quantity"
              type="number"
              placeholder="e.g., 100"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              errorMessage={errors?.stockQuantity?.[0]}
            />

            <Input
              id="lowStockThreshold"
              name="lowStockThreshold"
              label="Low Stock Alert"
              type="number"
              placeholder="e.g., 10"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              errorMessage={errors?.lowStockThreshold?.[0]}
            />

            <div>
              <Select
                id="stockStatus"
                label="Stock Status"
                placeholder="Select status"
                options={STOCK_STATUSES}
                value={stockStatus}
                onChange={(value) => setStockStatus(value as "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK")}
                errorMessage={errors?.stockStatus?.[0]}
              />
            </div>
          </div>

          <div>
            <Select
              id="productStatus"
              label="Product Status"
              placeholder="Select status"
              options={PRODUCT_STATUSES}
              value={productStatus}
              onChange={(value) => setProductStatus(value as "ACTIVE" | "INACTIVE" | "DRAFT")}
              errorMessage={errors?.productStatus?.[0]}
            />
          </div>

          <FileDropzone
            label="Product Image"
            value={image}
            onChange={setImage}
            maxSizeMB={5}
            existingImageUrl={existingImageUrl}
          />
        </div>

        <div className="flex items-center justify-between md:justify-center gap-8 pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isPending}
          >
            {isPending
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
                ? 'Update Product'
                : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
