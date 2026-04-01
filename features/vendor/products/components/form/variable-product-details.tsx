import FileDropzone from '@/components/ui/inputs/file-dropzone';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import Textarea from '@/components/ui/inputs/textarea';

import { StockStatus, ProductStatus } from '../../type';

interface SelectOption {
  label: string;
  value: string;
}

interface VariableProductFormProps {
  productName: string;
  setProductName: (value: string) => void;
  subcategoryId: string;
  setSubcategoryId: (value: string) => void;
  sku: string;
  setSku: (value: string) => void;
  errors: Record<string, string[]>;
  description: string;
  setDescription: (value: string) => void;
  basePrice: string;
  setBasePrice: (value: string) => void;
  CATEGORIES: SelectOption[];
  isEditing: boolean;
  stockQuantity: string;
  setStockQuantity: (value: string) => void;
  lowStockThreshold: string;
  setLowStockThreshold: (value: string) => void;
  STOCK_STATUSES: SelectOption[];
  stockStatus: string;
  setStockStatus: (value: StockStatus) => void;
  PRODUCT_STATUSES: SelectOption[];
  productStatus: string;
  setProductStatus: (value: ProductStatus) => void;
  image: File | null;
  setImage: (file: File | null) => void;
  existingImageUrl?: string;
}

export default function VariableDetailsFields({
  productName,
  setProductName,
  subcategoryId,
  setSubcategoryId,
  sku,
  setSku,
  errors,
  description,
  setDescription,
  basePrice,
  setBasePrice,
  CATEGORIES,
  isEditing,
  stockQuantity,
  setStockQuantity,
  lowStockThreshold,
  setLowStockThreshold,
  STOCK_STATUSES,
  stockStatus,
  setStockStatus,
  PRODUCT_STATUSES,
  productStatus,
  setProductStatus,
  image,
  setImage,
  existingImageUrl,
}: VariableProductFormProps) {
  return (
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
        label="Base Price (₦)"
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
            onChange={(value) => setStockStatus(value as StockStatus)}
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
          onChange={(value) => setProductStatus(value as ProductStatus)}
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
  );
}
