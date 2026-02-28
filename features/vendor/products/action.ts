'use server';

import { revalidatePath } from 'next/cache';
import {
  createProductService,
  deleteProductService,
  getProductService,
  getProductsService,
  updateProductService,
} from './service/product';
import { Product, ProductFormState } from './type';
import { ProductSchema, UpdateProductSchema } from './schema';

/**
 * Get all products for a store
 */
export async function getProductsAction(storeId: string): Promise<Product[]> {
  try {
    const response = await getProductsService(storeId);
    const data = response?.data;

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch {
    return [];
  }
}

/**
 * Get a single product
 */
export async function getProductAction(
  storeId: string,
  productId: string,
): Promise<Product | null> {
  try {
    return await getProductService(storeId, productId);
  } catch {
    return null;
  }
}

/**
 * Create a new product
 */
export async function createProductAction(
  storeId: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  // Extract fields from FormData
  const rawData = {
    productName: formData.get('productName') as string,
    productCategory: formData.get('productCategory') as string,
    sku: formData.get('sku') as string,
    description: formData.get('description') as string,
    productType: formData.get('productType') as string,
    stockStatus: formData.get('stockStatus') as string,
    productStatus: formData.get('productStatus') as string,
    basePrice: formData.get('basePrice') as string,
    stockQuantity: formData.get('stockQuantity') as string,
    lowStockThreshold: formData.get('lowStockThreshold') as string,
  };

  // Validate with Zod
  const result = ProductSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      if (!errors[key]) {
        errors[key] = [];
      }
      errors[key].push(issue.message);
    }
    return {
      status: 'error',
      message: 'Please fix the validation errors',
      errors,
    };
  }

  // Build FormData for API (keep all fields)
  const apiFormData = new FormData();
  apiFormData.append('productName', result.data.productName);
  apiFormData.append('productCategory', result.data.productCategory);
  apiFormData.append('sku', result.data.sku);
  apiFormData.append('productType', result.data.productType);
  apiFormData.append('stockStatus', result.data.stockStatus);
  apiFormData.append('productStatus', result.data.productStatus);

  if (result.data.description) {
    apiFormData.append('description', result.data.description);
  }
  if (result.data.basePrice !== undefined) {
    apiFormData.append('basePrice', String(result.data.basePrice));
  }
  if (result.data.stockQuantity !== undefined) {
    apiFormData.append('stockQuantity', String(result.data.stockQuantity));
  }
  if (result.data.lowStockThreshold !== undefined) {
    apiFormData.append(
      'lowStockThreshold',
      String(result.data.lowStockThreshold),
    );
  }

  // Handle images - support multiple files
  const images = formData.getAll('images');
  for (const image of images) {
    if (image instanceof File && image.size > 0) {
      apiFormData.append('images', image);
    }
  }

  // Handle variants and addons (JSON arrays)
  const variants = formData.get('variants');
  if (variants) {
    apiFormData.append('variants', variants as string);
  }

  const addons = formData.get('addons');
  if (addons) {
    apiFormData.append('addons', addons as string);
  }

  try {
    const response = await createProductService(storeId, apiFormData);
    revalidatePath('/vendor/products');

    const product = Array.isArray(response.data)
      ? response.data[0]
      : response.data;

    return {
      status: 'success',
      message: 'Product created successfully',
      productId: product?.id,
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to create product',
    };
  }
}

/**
 * Update a product
 */
export async function updateProductAction(
  storeId: string,
  productId: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  // Extract fields from FormData
  const rawData = {
    productName: formData.get('productName') as string,
    productCategory: formData.get('productCategory') as string,
    description: formData.get('description') as string,
    stockStatus: formData.get('stockStatus') as string,
    productStatus: formData.get('productStatus') as string,
    basePrice: formData.get('basePrice') as string,
    stockQuantity: formData.get('stockQuantity') as string,
    lowStockThreshold: formData.get('lowStockThreshold') as string,
  };

  // Validate with Zod (using update schema - all optional)
  const result = UpdateProductSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      if (!errors[key]) {
        errors[key] = [];
      }
      errors[key].push(issue.message);
    }
    return {
      status: 'error',
      message: 'Please fix the validation errors',
      errors,
    };
  }

  // Build FormData for API
  const apiFormData = new FormData();

  if (result.data.productName) {
    apiFormData.append('productName', result.data.productName);
  }
  if (result.data.productCategory) {
    apiFormData.append('productCategory', result.data.productCategory);
  }
  if (result.data.description) {
    apiFormData.append('description', result.data.description);
  }
  if (result.data.stockStatus) {
    apiFormData.append('stockStatus', result.data.stockStatus);
  }
  if (result.data.productStatus) {
    apiFormData.append('productStatus', result.data.productStatus);
  }
  if (result.data.basePrice !== undefined) {
    apiFormData.append('basePrice', String(result.data.basePrice));
  }
  if (result.data.stockQuantity !== undefined) {
    apiFormData.append('stockQuantity', String(result.data.stockQuantity));
  }
  if (result.data.lowStockThreshold !== undefined) {
    apiFormData.append(
      'lowStockThreshold',
      String(result.data.lowStockThreshold),
    );
  }

  // Note: Images are NOT sent during update - the API doesn't support image updates via this endpoint
  // If image update is needed, a separate endpoint might be required

  try {
    await updateProductService(storeId, productId, apiFormData);
    revalidatePath('/vendor/products');

    return {
      status: 'success',
      message: 'Product updated successfully',
      productId,
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to update product',
    };
  }
}

/**
 * Delete a product
 */
export async function deleteProductAction(
  storeId: string,
  productId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    await deleteProductService(storeId, productId);
    revalidatePath('/vendor/products');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to delete product',
    };
  }
}
