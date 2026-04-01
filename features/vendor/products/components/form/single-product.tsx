'use client';

import { useActionState, useEffect, useState } from 'react';
import FileDropzone from '@/components/ui/inputs/file-dropzone';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import Textarea from '@/components/ui/inputs/textarea';
import { Product, ProductFormState } from '../../type';
import { Button } from '@/components/ui/buttons/button';
import ErrorMessage from '@/components/layout/error-message';
import { createProductAction, updateProductAction } from '../../action';
import { SingleProductSchema } from '../../schema';
import { toast } from 'sonner';

interface SelectOption {
  label: string;
  value: string;
}

export interface SingleProductProps {
  storeId: string;
  editProduct?: Product | null;
  isEditing: boolean;
  productName: string;
  setProductName: (value: string) => void;
  subcategoryId: string;
  setSubcategoryId: (value: string) => void;
  sku: string;
  setSku: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  basePrice: string;
  setBasePrice: (value: string) => void;
  stockQuantity: string;
  setStockQuantity: (value: string) => void;
  lowStockThreshold: string;
  setLowStockThreshold: (value: string) => void;
  stockStatus: string;
  setStockStatus: (value: string) => void;
  productStatus: string;
  setProductStatus: (value: string) => void;
  image: File | null;
  setImage: (file: File | null) => void;
  existingImageUrl?: string;
  CATEGORIES: SelectOption[];
  STOCK_STATUSES: SelectOption[];
  PRODUCT_STATUSES: SelectOption[];
  handleClose: () => void;
  onSuccess: () => void;
}

export default function SingleProductForm({
  storeId,
  editProduct,
  isEditing,
  productName,
  setProductName,
  subcategoryId,
  setSubcategoryId,
  sku,
  setSku,
  description,
  setDescription,
  basePrice,
  setBasePrice,
  stockQuantity,
  setStockQuantity,
  lowStockThreshold,
  setLowStockThreshold,
  stockStatus,
  setStockStatus,
  productStatus,
  setProductStatus,
  image,
  setImage,
  existingImageUrl,
  CATEGORIES,
  STOCK_STATUSES,
  PRODUCT_STATUSES,
  handleClose,
  onSuccess,
}: SingleProductProps) {
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>(
    {},
  );

  function validateForm(): boolean {
    const errs: Record<string, string[]> = {};

    const result = SingleProductSchema.safeParse({
      productName,
      subcategoryId: subcategoryId ?? '',
      sku,
      description,
      productType: 'SINGLE',
      basePrice,
      stockQuantity,
      lowStockThreshold,
      stockStatus: stockStatus ?? '',
      productStatus: productStatus ?? '',
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!errs[key]) errs[key] = [];
        errs[key].push(issue.message);
      }
    }

    // Image is required for new products
    if (!isEditing && !image && !existingImageUrl) {
      errs.images = ['Product image is required.'];
    }

    setClientErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const singleProductAction = async (
    prevState: ProductFormState,
    _formData: FormData,
  ): Promise<ProductFormState> => {
    // Client-side validation
    if (!validateForm()) {
      return {
        status: 'error',
        message: 'Please fill in all required fields',
      };
    }

    // Build FormData entirely from React state
    const fd = new FormData();
    fd.append('productName', productName);
    fd.append('subcategoryId', subcategoryId ?? '');
    fd.append('sku', sku);
    fd.append('description', description);
    fd.append('productType', 'SINGLE');
    fd.append('basePrice', String(basePrice));
    fd.append('stockQuantity', String(stockQuantity));
    fd.append('lowStockThreshold', String(lowStockThreshold));
    fd.append('stockStatus', stockStatus ?? '');
    fd.append('productStatus', productStatus ?? '');

    // Append image from React state
    if (image) {
      fd.append('images', image);
    }

    // Debug: log what we're sending
    console.log('[SingleProduct] FormData entries:');
    for (const [key, value] of fd.entries()) {
      if (value instanceof File) {
        console.log(
          `  ${key}: [File] name=${value.name}, size=${value.size}, type=${value.type}`,
        );
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    if (isEditing && editProduct) {
      return updateProductAction(storeId, editProduct.id, prevState, fd);
    }
    return createProductAction(storeId, prevState, fd);
  };

  const [state, formAction, isPending] = useActionState(
    singleProductAction,
    undefined as ProductFormState,
  );

  useEffect(() => {
    if (!state) return;

    if (state.status === 'success') {
      toast.success(state.message || 'Product saved successfully');
      onSuccess();
    }

    if (state.status === 'error') {
      toast.error(state.message || 'Something went wrong');
    }
  }, [state]);

  const serverErrors = state?.status === 'error' ? (state.errors ?? {}) : {};
  const errors = { ...serverErrors, ...clientErrors };
  const errorMessage =
    state?.status === 'error' ? (state.message ?? null) : null;

  return (
    <form action={formAction} className="space-y-6">
      {errorMessage && <ErrorMessage message={errorMessage} />}

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
            id="subcategoryId"
            label="Category"
            placeholder="Select category"
            options={CATEGORIES}
            value={subcategoryId}
            onChange={setSubcategoryId}
            errorMessage={errors?.subcategoryId?.[0]}
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
              onChange={(value) =>
                setStockStatus(
                  value as 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK',
                )
              }
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
            onChange={(value) =>
              setProductStatus(value as 'ACTIVE' | 'INACTIVE' | 'DRAFT')
            }
            errorMessage={errors?.productStatus?.[0]}
          />
        </div>

        <FileDropzone
          label="Product Image"
          value={image}
          onChange={setImage}
          maxSizeMB={5}
          existingImageUrl={existingImageUrl}
          errorMessage={errors?.images?.[0]}
        />
      </div>

      <div className="flex items-center justify-between md:justify-around gap-8 pt-4">
        <Button variant="outline" size="lg" onClick={handleClose} type="button">
          Cancel
        </Button>

        <Button type="submit" size="lg" variant="primary" disabled={isPending}>
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
  );
}
