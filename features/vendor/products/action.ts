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
    productCategory: formData.get('productCategory') as string,
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

  const apiFormData = new FormData();
  Object.entries(result.data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      apiFormData.append(key, String(value));
    }
  });

  // images
  const images = formData.getAll('images');
  console.log(
    '[createProductAction] images count:',
    images.length,
    'types:',
    images.map((i) =>
      i instanceof File
        ? `File(${(i as File).name}, ${(i as File).size})`
        : typeof i,
    ),
  );
  for (const image of images) {
    if (image instanceof File && image.size > 0) {
      apiFormData.append('images', image);
    }
  }

  // ✅ Parse indexed variants and addons for variable products
  if (isVariable) {
    const variantEntries: Record<number, Record<string, string>> = {};
    const addonEntries: Record<number, Record<string, string>> = {};

    for (const [key, value] of formData.entries()) {
      const variantMatch = key.match(/^variants\[(\d+)\]\.(.+)$/);
      if (variantMatch) {
        const idx = Number(variantMatch[1]);
        const field = variantMatch[2];
        if (!variantEntries[idx]) variantEntries[idx] = {};
        variantEntries[idx][field] = value as string;
      }

      const addonMatch = key.match(/^addons\[(\d+)\]\.(.+)$/);
      if (addonMatch) {
        const idx = Number(addonMatch[1]);
        const field = addonMatch[2];
        if (!addonEntries[idx]) addonEntries[idx] = {};
        addonEntries[idx][field] = value as string;
      }
    }

    const variantsArray = Object.values(variantEntries);
    const addonsArray = Object.values(addonEntries);

    console.log('[createProductAction] Parsed variants:', variantsArray);
    console.log('[createProductAction] Parsed addons:', addonsArray);

    if (variantsArray.length > 0) {
      apiFormData.append('variants', JSON.stringify(variantsArray));
    }
    if (addonsArray.length > 0) {
      apiFormData.append('addons', JSON.stringify(addonsArray));
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
    productCategory: formData.get('productCategory') as string,
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

  const apiFormData = new FormData();
  Object.entries(result.data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      apiFormData.append(key, String(value));
    }
  });

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
