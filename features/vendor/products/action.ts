'use server';

import { revalidatePath } from 'next/cache';
import {
  createProductService,
  updateProductService,
  deleteProductService,
  getProductsService,
  getProductService,
} from './service';
import { Product, ProductFormState } from './type';
import {
  SingleProductSchema,
  VariableProductSchema,
  UpdateProductSchema,
} from './schema';

export async function getProductsAction(storeId: string): Promise<Product[]> {
  try {
    const response = await getProductsService(storeId);
    const data = response?.data;
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

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

export async function createProductAction(
  storeId: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const productType = formData.get('productType') as string;
  const isVariable = productType === 'VARIABLE';

  const rawData = {
    productName: formData.get('productName') as string,
    subcategoryId: formData.get('subcategoryId') as string,
    sku: formData.get('sku') as string,
    description: formData.get('description') as string,
    productType,
    stockStatus: formData.get('stockStatus') as string,
    productStatus: formData.get('productStatus') as string,
    basePrice: formData.get('basePrice') as string,
    stockQuantity: formData.get('stockQuantity') as string,
    lowStockThreshold: formData.get('lowStockThreshold') as string,
  };

  const schema = isVariable ? VariableProductSchema : SingleProductSchema;
  const result = schema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;

      if (!errors[key]) errors[key] = [];

      errors[key].push(issue.message);
    }

    return {
      status: 'error',
      message: 'Please fix the validation errors',
      errors,
    };
  }

  /**
   * IMPORTANT
   * send the original FormData directly
   */

  const apiFormData = new FormData();

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      if (value.size > 0) {
        apiFormData.append(key, value);
      }
    } else {
      apiFormData.append(key, value);
    }
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

export async function updateProductAction(
  storeId: string,
  productId: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const rawData = {
    productName: formData.get('productName') as string,
    subcategoryId: formData.get('subcategoryId') as string,
    description: formData.get('description') as string,
    stockStatus: formData.get('stockStatus') as string,
    productStatus: formData.get('productStatus') as string,
    basePrice: formData.get('basePrice') as string,
    stockQuantity: formData.get('stockQuantity') as string,
    lowStockThreshold: formData.get('lowStockThreshold') as string,
  };

  const result = UpdateProductSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;

      if (!errors[key]) errors[key] = [];

      errors[key].push(issue.message);
    }

    return {
      status: 'error',
      message: 'Please fix the validation errors',
      errors,
    };
  }

  /**
   * Only send fields allowed by update endpoint
   */

  const apiFormData = new FormData();

  Object.entries(result.data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      apiFormData.append(key, String(value));
    }
  });

  /**
   * allow updating images
   */

  const images = formData.getAll('images');

  for (const image of images) {
    if (image instanceof File && image.size > 0) {
      apiFormData.append('images', image);
    }
  }

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

export async function deleteProductAction(
  storeId: string,
  productId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    await deleteProductService(storeId, productId);
    revalidatePath('/vendor/products');
    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to delete product',
    };
  }
}
