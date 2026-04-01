// Stock status matches API
export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

// Product status matches API
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT';

// Product type from API
export type ProductType = 'SIMPLE' | 'VARIABLE';

// Variant structure
export interface ProductVariant {
  id?: string;
  variantName: string;
  name: string;
  price: number;
  sku: string;
  stockQuantity: number;
  stockStatus: StockStatus;
  attributes?: Record<string, string>;
  options: string[];
  priceModifier?: number;
}

// Addon structure
export interface ProductAddon {
  id?: string;
  addonName: string;
  name: string;
  price: number;
  available: boolean;
  description?: string;
  maxQuantity?: number;
  category?: string;
}

// Product image from API
export interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  productId?: string;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Main product data structure
export interface Product {
  id: string;
  productName: string;
  subcategoryId: string;
  sku: string;
  description?: string;
  productType: ProductType;
  stockStatus: StockStatus;
  productStatus: ProductStatus;
  basePrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  variants?: ProductVariant[];
  addons?: ProductAddon[];
  productImages?: ProductImage[];
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

// API Response structure
export interface ProductApiResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: Product | Product[];
}

// Form state for server actions
export type ProductFormState =
  | undefined
  | { status: 'error'; errors?: Record<string, string[]>; message?: string }
  | { status: 'success'; message: string; productId?: string };

// Create product input
export interface CreateProductData {
  productName: string;
  subcategoryId: string;
  sku: string;
  description?: string;
  productType: ProductType;
  stockStatus: StockStatus;
  productStatus: ProductStatus;
  basePrice?: number;
  stockQuantity?: number;
  lowStockThreshold?: number;
  variants?: ProductVariant[];
  addons?: ProductAddon[];
  images?: File[];
}

// Update product input (partial)
export interface UpdateProductData {
  productName?: string;
  subcategoryId?: string;
  description?: string;
  stockStatus?: StockStatus;
  productStatus?: ProductStatus;
  basePrice?: number;
  stockQuantity?: number;
  lowStockThreshold?: number;
}

// Props for ProductRow component
export type ProductRowProps = {
  product: Product;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
};

// Props for ProductForm component
export interface ProductFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  storeId: string;
  editProduct?: Product | null;
  onSuccess?: () => void;
}

// Props for ViewProductModal
export interface ViewProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  product: Product | null;
  onEdit?: () => void;
}

// Props for DeleteConfirmModal
export interface DeleteConfirmModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  product: Product | null;
  storeId: string;
  onSuccess?: () => void;
}
