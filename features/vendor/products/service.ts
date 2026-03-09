'use server';

import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { Product, ProductApiResponse } from './type';

/**
 * Create a new product
 */
export async function createProductService(
  storeId: string,
  formData: FormData,
): Promise<ProductApiResponse> {
  const res = await authFetch(`${BASE_URL}/vendor/stores/${storeId}/products`, {
    method: 'POST',
    body: formData,
  });

  const result = await res.json();

  console.log(
    '[createProductService] Response:',
    JSON.stringify(result, null, 2),
  );

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to create product',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}

/**
 * Get all products for a store
 */
export async function getProductsService(
  storeId: string,
): Promise<ProductApiResponse | null> {
  const res = await authFetch(`${BASE_URL}/vendor/stores/${storeId}/products`, {
    method: 'GET',
    cache: 'no-store',
  });

  const result = await res.json();

  console.log(
    '[getProductsService] Response:',
    JSON.stringify(result, null, 2),
  );

  if (res.status === 404 || result?.statusCode === 404) {
    return null;
  }

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to fetch products',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}

/**
 * Get a single product by ID
 */
export async function getProductService(
  storeId: string,
  productId: string,
): Promise<Product | null> {
  const res = await authFetch(
    `${BASE_URL}/vendor/stores/${storeId}/products/${productId}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  const result = await res.json();

  console.log('[getProductService] Response:', JSON.stringify(result, null, 2));

  if (res.status === 404 || result?.statusCode === 404) {
    return null;
  }

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to fetch product',
      result?.statusCode ?? res.status,
    );
  }

  return result.data;
}

/**
 * Update a product
 */
export async function updateProductService(
  storeId: string,
  productId: string,
  formData: FormData,
): Promise<ProductApiResponse> {
  // Log what fields are being sent
  console.log('[updateProductService] FormData fields:');
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }

  const res = await authFetch(
    `${BASE_URL}/vendor/stores/${storeId}/products/${productId}`,
    {
      method: 'PUT',
      body: formData,
    },
  );

  const result = await res.json();

  console.log(
    '[updateProductService] Response:',
    JSON.stringify(result, null, 2),
  );

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to update product',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}

/**
 * Delete a product
 */
export async function deleteProductService(
  storeId: string,
  productId: string,
): Promise<void> {
  const url = `${BASE_URL}/vendor/stores/${storeId}/products/${productId}`;
  console.log('[deleteProductService] DELETE Request URL:', url);

  const res = await authFetch(url, {
    method: 'DELETE',
  });

  console.log('[deleteProductService] Response status:', res.status);

  // Try to parse response body
  const result = await res.json().catch(() => null);
  console.log(
    '[deleteProductService] Response body:',
    JSON.stringify(result, null, 2),
  );

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to delete product',
      result?.statusCode ?? res.status,
    );
  }

  console.log('[deleteProductService] Success - Product deleted');
}
