'use server';

import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { Product, ProductApiResponse } from './type';
import { authRequest } from '@/libs/api/auth-request';

/**
 * Create a new product
 */
export async function createProductService(
  storeId: string,
  formData: FormData,
) {
  return await authRequest<ProductApiResponse>(
    `${BASE_URL}/vendor/stores/${storeId}/products`,
    {
      method: 'POST',
      body: formData,
      nextTags: [`create-product-store-${storeId}`],
    },
  );
}

/**
 * Get all products for a store
 */
export async function getStoreProductsService(storeId: string) {
  return await authRequest<ProductApiResponse>(
    `${BASE_URL}/vendor/stores/${storeId}/products`,
    {
      nextTags: [`get-products-store-${storeId}`],
    },
  );
}

/**
 * Get a single product by ID
 */
export async function getProductIdService(storeId: string, productId: string) {
  return await authRequest<Product>(
    `${BASE_URL}/vendor/stores/${storeId}/products/${productId}`,
    {
      nextTags: [`get-product-${productId}`],
    },
  );
}

/**
 * Update a product
 */
export async function updateProductService(
  storeId: string,
  productId: string,
  formData: FormData,
) {
  // Log what fields are being sent
  console.log('[updateProductService] FormData fields:');
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }

  return await authRequest<ProductApiResponse>(
    `${BASE_URL}/vendor/stores/${storeId}/products/${productId}`,
    {
      method: 'PUT',
      body: formData,
    
      nextTags: [`update-product-${productId}`],
    },
  );
}

/**
 * Delete a product
 */
export async function deleteProductService(
  storeId: string,
  productId: string,
): Promise<void> {
  return await authRequest<void>(
    `${BASE_URL}/vendor/stores/${storeId}/products/${productId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      nextTags: [`delete-product-${productId}`],
    },
  );
}
