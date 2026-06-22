import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import {
  AddToCartPayload,
  CreateOrderPayload,
  InitializePaymentPayload,
} from './types';
import { getAuthTokens, getOrCreateGuestSessionId } from '@/utils/cookies';
import { request } from '@/libs/api/request';
import { da } from 'zod/v4/locales';
import { authRequest } from '@/libs/api/auth-request';

// ─── Helper ───
// async function request(tag: string, url: string, options: RequestInit = {}) {
//   const method = options.method ?? 'GET';

//   console.log(`[${tag}] REQUEST ${method} ${url}`);

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//   });

//   const data = await res.json();

//   console.log(`[${tag}] RESPONSE ${res.status}`, data);

//   if (!res.ok) {
//     const err = new ApiError(
//       data?.message || `${tag} failed`,
//       data?.statusCode ?? res.status,
//     );
//     console.error(`[${tag}] ERROR`, err);
//     throw err;
//   }

//   return data;
// }

// async function authRequest(
//   tag: string,
//   url: string,
//   options: RequestInit = {},
// ) {
//   const method = options.method ?? 'GET';

//   const res = await authFetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//   });

//   const data = await res.json();

//   console.log(`[${tag}] RESPONSE ${res.status}`, data);

//   if (!res.ok) {
//     const err = new ApiError(
//       data?.message || `${tag} failed`,
//       data?.statusCode ?? res.status,
//     );
//     console.error(`[${tag}] ERROR`, err);
//     throw err;
//   }

//   return data;
// }

async function cartRequest(
  tag: string,
  url: string,
  options: RequestInit = {},
) {
  // const method = options.method ?? 'GET';

  const { accessToken, refreshToken } = await getAuthTokens();

  // AUTHENTICATED USER
  if (accessToken || refreshToken) {
    const res = await authFetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const err = new ApiError(
        data?.message || `${tag} failed`,
        data?.statusCode ?? res.status,
      );
      console.error(`[${tag}] ERROR`, err);
      throw err;
    }

    return data;
  } else {
    // GUEST USER

    const guestSessionId = await getOrCreateGuestSessionId();

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': guestSessionId,
        ...options.headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const err = new ApiError(
        data?.message || `${tag} failed`,
        data?.statusCode ?? res.status,
      );
      console.error(`[${tag}] ERROR`, err);
      throw err;
    }

    return data;
  }
}
// ═══════════════════════════════════════
// CATEGORIES & STORES
// ═══════════════════════════════════════

// export async function fetchCategoriesService() {
//   return request('FetchCategories', `${BASE_URL}/customer/categories`);
// }

export interface CategoriesResponse {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  _count: { stores: number };
  subcategories: any[];
}

export interface CategoriesApiResponse {
  data: CategoriesResponse[];
}

export interface SubCategoriesResponse {
  data: {
    id: string;
    name: string;
    description: string;
    storeCount: number;
  }[];
}

export async function fetchCategoriesService() {
  return request<CategoriesApiResponse>(`${BASE_URL}/customer/categories`, {
    cacheStrategy: { revalidate: 3600 },
    nextTags: ['categories'],
  });
}

// export async function fetchCategoryStoresService(
//   categoryId?: string,
//   lat?: number,
//   lng?: number,
//   subcategoryId?: string,
//   page?: number,
//   limit?: number,
//   search?: string,
//   radiusKm?: number,
// ) {
//   const params = new URLSearchParams();
//   if (categoryId) params.set('categoryId', categoryId);
//   if (lat !== undefined) params.set('lat', String(lat));
//   if (lng !== undefined) params.set('lng', String(lng));
//   if (subcategoryId) params.set('subcategoryId', subcategoryId);
//   if (page) params.set('page', String(page));
//   if (limit) params.set('limit', String(limit));
//   if (search) params.set('search', search);
//   if (radiusKm) params.set('radiusKm', String(radiusKm));

//   const url = `${BASE_URL}/customer/stores?${params.toString()}`;

//   return request('FetchCategoryStores', url);
// }
export interface CategoryStoresResponse {
  id: string;
  storeName: string;
  categoryId: string;
  storeCategory: string;
  storeDescription: string;
  storeAddress: string;
  phoneNumber: string;
  dailyOrderLimit: number | null;
  preparationTime: number;
  storeLogo: string | null;
  isOpen: boolean;
  distance: number | null;
  subcategories: string[];
  products: any[];
}

export interface CategoryStoresApiResponse {
  data: {
    data: CategoryStoresResponse[];
  };

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface StoreDetailsResponse {
  status: 'success';
  statusCode: 200;
  timestamp: string;
  path: string;
  data: {
    id: string;
    storeName: string;
    storeDescription: string;
    storeAddress: string;
    phoneNumber: string;
    email: string;
    storeLogo: string | null;
    dailyOrderLimit: number | null;
    preparationTime: number;
    deliveryFee: number | null;
    status: 'ACTIVE' | 'INACTIVE';
    category: {
      id: string;
      name: string;
      description: string;
      icon: string;
      image: string;
      isActive: boolean;
      displayOrder: number;
      createdAt: string;
      updatedAt: string;
    };
    operatingHours: any[];
    products: any[];
    createdAt: string;
    updatedAt: string;
  };
}



export interface  VendorAddressDetails {
  storeId: string;
  storeName: string;
  vendorId: string;
  businessName: string;

  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };

  contact: {
    phone?: string;
    email?: string;
  };
}


// types/api.ts

export interface VendorAddressDetailsApiResponse{
  success: boolean;
  message?: string;
  data: VendorAddressDetails
}

export async function fetchCategoryStoresService({
  categoryId,
  lat,
  lng,
  subcategoryId,
  page,
  limit,
  search,
  radiusKm,
}: {
  categoryId?: string;
  lat?: string;
  lng?: string;
  subcategoryId?: string;
  page?: string;
  limit?: string;
  search?: string;
  radiusKm?: string;
}) {
  const params = new URLSearchParams();
  if (categoryId) params.set('categoryId', categoryId);
  if (lat !== undefined) params.set('lat', String(lat));
  if (lng !== undefined) params.set('lng', String(lng));
  if (subcategoryId) params.set('subcategoryId', subcategoryId);
  if (page) params.set('page', String(page));
  if (limit) params.set('limit', String(limit));
  if (search) params.set('search', search);
  if (radiusKm) params.set('radiusKm', String(radiusKm));

  return request<CategoryStoresApiResponse>(
    `${BASE_URL}/customer/stores?${params.toString()}`,
    {
      cacheStrategy: { revalidate: 3600 },

      nextTags: [`stores-category-${categoryId}-subcat-${subcategoryId}`],
    },
  );
}

// export async function fetchSubcategoriesService(categoryId: string) {
//   return request(
//     'FetchSubcategories',
//     `${BASE_URL}/customer/subcategories/category/${categoryId}`,
//   );
// }

export async function fetchSubcategoriesService(categoryId: string) {
  return request<SubCategoriesResponse>(
    `${BASE_URL}/customer/subcategories/category/${categoryId}`,
    {
      cacheStrategy: { revalidate: 3600 },
      nextTags: [`subcategories-category-${categoryId}`],
    },
  );
}

// export async function fetchStoreDetailsService(storeId: string) {
//   return authRequest(
//     'FetchStoreDetails',
//     `${BASE_URL}/customer/stores/${storeId}`,
//   );
// }

export async function fetchStoreDetailsService(storeId: string) {
  return authRequest<StoreDetailsResponse>(
    `${BASE_URL}/customer/stores/${storeId}`,
    {
      nextTags: [`store-details-${storeId}`],
    },
  );
}

// export async function fetchVendorAddressService(storeId: string) {
//   return authRequest(
//     'FetchVendorAddress',
//     `${BASE_URL}/customer/vendor-address/${storeId}`,
//   );
// }

// services/vendor.ts

export async function fetchVendorAddressService(storeId: string) {
  return authRequest<VendorAddressDetailsApiResponse>(
    `${BASE_URL}/customer/vendor-address/${storeId}`,
    {
      nextTags: [`vendor-address-${storeId}`],
    },
  );
}

// ═══════════════════════════════════════
// CART
// ═══════════════════════════════════════

export async function getCartService() {
  return cartRequest('GetCart', `${BASE_URL}/cart`);
}

export async function addToCartService(payload: AddToCartPayload) {
  return cartRequest('AddToCart', `${BASE_URL}/cart/add`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCartQuantityService(
  itemId: string,
  quantity: number,
) {
  return cartRequest(
    'UpdateCartQuantity',
    `${BASE_URL}/cart/item/${itemId}/quantity`,
    {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    },
  );
}

export async function removeFromCartService(itemId: string) {
  return cartRequest(
    'RemoveFromCart',
    `${BASE_URL}/cart/item/${itemId}/remove`,
    { method: 'POST' },
  );
}

export async function clearCartService() {
  return cartRequest('ClearCart', `${BASE_URL}/cart/clear`, {
    method: 'POST',
  });
}
