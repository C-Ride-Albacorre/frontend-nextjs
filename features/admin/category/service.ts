import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
  CreateSubcategoryPayload,
  UpdateSubcategoryPayload,
  CategoryApiResponse,
  CreateCategoriesApiResponse,
  CategoryStatusApiResponse,
  SubcategoryApiResponse,
} from './types';
import { authRequest } from '@/libs/api/auth-request';

// ─── Category Services ───────────────────────────────────────────────────────

export async function getCategoriesService() {
  return await authRequest<CategoryApiResponse>(
    `${BASE_URL}/admin/categories`,
    {
      nextTags: ['get-categories'],
    },
  );
}

export async function createCategoryService(payload: CreateCategoryPayload) {
  const formData = new FormData();

  formData.append('name', payload.name);

  if (payload.description) {
    formData.append('description', payload.description);
  }

  formData.append('isActive', String(payload.isActive ?? true));
  formData.append('displayOrder', String(payload.displayOrder ?? 1));

  console.log(
    '[createCategoryService] Icon:',
    payload.icon,
    'Type:',
    payload.icon?.constructor.name,
    'Size:',
    payload.icon instanceof File ? payload.icon.size : 'N/A',
  );

  console.log(
    '[createCategoryService] Image:',
    payload.image,
    'Type:',
    payload.image?.constructor.name,
    'Size:',
    payload.image instanceof File ? payload.image.size : 'N/A',
  );

  if (payload.icon instanceof File && payload.icon.size > 0) {
    formData.append('icon', payload.icon);
    console.log('[createCategoryService] Icon appended');
  }

  if (payload.image instanceof File && payload.image.size > 0) {
    formData.append('image', payload.image);
    console.log('[createCategoryService] Image appended');
  }

  console.log(' Creating category with payload:', {
    name: payload.name,
    description: payload.description,
    isActive: payload.isActive,
    displayOrder: payload.displayOrder,
    hasIcon: payload.icon instanceof File,
    hasImage: payload.image instanceof File,
  });

  return await authRequest<CreateCategoriesApiResponse>(
    `${BASE_URL}/admin/category`,
    {
      method: 'POST',
      body: formData,

      nextTags: ['create-category'],
    },
  );
}

export async function updateCategoryService(
  id: string,
  payload: UpdateCategoryPayload,
) {
  const hasIcon = payload.icon instanceof File && payload.icon.size > 0;
  const hasImage = payload.image instanceof File && payload.image.size > 0;

  const formData = new FormData();

  if (payload.name) formData.append('name', payload.name);
  if (payload.description) formData.append('description', payload.description);
  formData.append('isActive', String(payload.isActive ?? true));
  formData.append('displayOrder', String(payload.displayOrder ?? 1));

  if (hasIcon) {
    formData.append('icon', payload.icon as File);
    console.log('[updateCategoryService] Icon appended');
  }

  if (hasImage) {
    formData.append('image', payload.image as File);
    console.log('[updateCategoryService] Image appended');
  }

  console.log('[updateCategoryService] Sending FormData payload:', {
    name: payload.name,
    description: payload.description,
    isActive: payload.isActive,
    displayOrder: payload.displayOrder,
    hasIcon,
    hasImage,
  });

  return await authRequest<CreateCategoriesApiResponse>(`${BASE_URL}/admin/category/${id}`, {
    method: 'PUT',
    body: formData,
    nextTags: [`update-category-${id}`],
  });
}

export async function deleteCategoryService(id: string) {
  return await authRequest<CategoryStatusApiResponse>(
    `${BASE_URL}/admin/category/${id}`,
    {
      method: 'DELETE',
      nextTags: [`delete-category-${id}`],
    },
  );
}

export async function toggleCategoryStatusService(id: string) {
  return await authRequest<CategoryStatusApiResponse>(
    `${BASE_URL}/admin/${id}/toggle-status`,
    {
      method: 'PUT',
      nextTags: [`toggle-category-status-${id}`],
    },
  );
}

// export async function reorderCategoryService(id: string, displayOrder: number) {
//   const res = await authFetch(`${BASE_URL}/admin/category/${id}/reorder`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ displayOrder }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new ApiError(
//       data?.message || 'Failed to reorder category',
//       data?.statusCode ?? res.status,
//     );
//   }

//   return data;
// }

// ─── Subcategory Services ────────────────────────────────────────────────────

export async function createSubcategoryService(
  payload: CreateSubcategoryPayload,
) {
  const formData = new FormData();

  formData.append('name', payload.name);

  if (payload.categoryId) formData.append('categoryId', payload.categoryId);

  if (payload.description) {
    formData.append('description', payload.description);
  }

  formData.append('isActive', String(payload.isActive ?? true));
  formData.append('displayOrder', String(payload.displayOrder ?? 1));

  if (payload.icon instanceof File && payload.icon.size > 0) {
    formData.append('icon', payload.icon);
    console.log('[createCategoryService] Icon appended');
  }

  if (payload.image instanceof File && payload.image.size > 0) {
    formData.append('image', payload.image);
    console.log('[createCategoryService] Image appended');
  }

  return await authRequest(`${BASE_URL}/admin/subcategories`, {
    method: 'POST',
    body: formData,
    nextTags: ['create-subcategory'],
  });
}

export async function getSubcategoriesService() {
  return await authRequest<SubcategoryApiResponse>(
    `${BASE_URL}/admin/subcategories`,
    {
      nextTags: ['get-subcategories'],
    },
  );
}

// export async function getSubcategoryByIdService(id: string) {
//   return await authRequest<SubcategoryApiResponse>(
//     `${BASE_URL}/admin/subcategories/${id}`,
//     {
//       nextTags: [`get-subcategory-${id}`],
//     },
//   );
// }

// export async function getSubcategoriesByCategoryIdService(categoryId: string) {
//   return await authRequest(
//     `${BASE_URL}/admin/category/${categoryId}/subcategories`,
//     {
//       nextTags: [`get-subcategories-category-${categoryId}`],
//     },
//   );
// }

export async function updateSubcategoryService(
  id: string,
  payload: UpdateSubcategoryPayload,
) {
  const formData = new FormData();

  if (payload.name) formData.append('name', payload.name);
  if (payload.description) formData.append('description', payload.description);
  formData.append('isActive', String(payload.isActive ?? true));
  formData.append('displayOrder', String(payload.displayOrder ?? 1));

  if (payload.icon instanceof File && payload.icon.size > 0) {
    formData.append('icon', payload.icon);
    console.log('[updateSubcategoryService] Icon appended');
  }
  if (payload.image instanceof File && payload.image.size > 0) {
    formData.append('image', payload.image);
    console.log('[updateSubcategoryService] Image appended');
  }

  return await authRequest<CreateCategoriesApiResponse>(`${BASE_URL}/admin/subcategories/${id}`, {
    method: 'PUT',
    body: formData,
  });
}

export async function deleteSubcategoryService(id: string) {
  return await authRequest<CategoryStatusApiResponse>(`${BASE_URL}/admin/subcategories/${id}`, {
    method: 'DELETE',
    nextTags: [`delete-subcategory-${id}`],
  });
}

export async function toggleSubcategoryStatusService(id: string) {
  return await authRequest<CategoryStatusApiResponse>(
    `${BASE_URL}/admin/subcategories/${id}/toggle-status`,
    { method: 'PUT', nextTags: [`toggle-subcategory-status-${id}`] },
  );

  
}

// export async function reorderSubcategoryService(
//   id: string,
//   displayOrder: number,
// ) {
//   const res = await authFetch(`${BASE_URL}/admin/subcategories/${id}/reorder`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ displayOrder }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new ApiError(
//       data?.message || 'Failed to reorder subcategory',
//       data?.statusCode ?? res.status,
//     );
//   }

//   return data;
// }
