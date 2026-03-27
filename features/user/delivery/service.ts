import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { AddToCartPayload } from './types';

export async function fetchCategoriesService() {
  const res = await authFetch(`${BASE_URL}/customer/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch categories',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function fetchCategoryStoresService(
  categoryId: string,
  latitude?: number,
  longitude?: number,
) {
  const params = new URLSearchParams();

  if (latitude !== undefined) {
    params.set('latitude', String(latitude));
  }

  if (longitude !== undefined) {
    params.set('longitude', String(longitude));
  }

  const queryString = params.toString();
  const url = `${BASE_URL}/customer/stores/category/${categoryId}${
    queryString ? `?${queryString}` : ''
  }`;

  const res = await authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch stores for category',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function fetchSubcategoriesService(categoryId: string) {
  const res = await authFetch(
    `${BASE_URL}/customer/subcategories/category/${categoryId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch subcategories',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function fetchStoreDetailsService(storeId: string) {
  const res = await authFetch(`${BASE_URL}/customer/stores/${storeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch store details',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}


export async function getCartService(){

  const res = await authFetch(`${BASE_URL}/customer/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch cart',
      data?.statusCode ?? res.status,
    );
  }

  console.log('Get Cart Response:', data);

  return data;

}


export async function addToCartService(payload: AddToCartPayload) {

  const res = await authFetch(`${BASE_URL}/customer/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  console.log('Add to Cart Response:', data);

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to add item to cart',
      data?.statusCode ?? res.status,
    );
  }

  return data;

}



export async function updateCartQuantityService(itemId: string, quantity: number) {

  const res = await authFetch(`${BASE_URL}/customer/cart/item/${itemId}/quantity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to update cart quantity',
      data?.statusCode ?? res.status,
    );
  }

  return data;

}



export async function removeFromCartService(itemId: string) {

  const res = await authFetch(`${BASE_URL}/customer/cart/item/${itemId}/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to remove item from cart',
      data?.statusCode ?? res.status,
    );
  }

  return data;

}



export async function clearCartService() {

  const res = await authFetch(`${BASE_URL}/customer/cart/clear`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to clear cart',
      data?.statusCode ?? res.status,
    );
  }

  return data;

}
