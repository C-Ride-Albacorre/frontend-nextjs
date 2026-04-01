import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
  CreateSubcategoryPayload,
  UpdateSubcategoryPayload,
} from './types';

// ─── Category Services ───────────────────────────────────────────────────────

export async function createCategoryService(payload: CreateCategoryPayload) {
  const formData = new FormData();

  formData.append('name', payload.name);

  if (payload.description) {
    formData.append('description', payload.description);
  }

  formData.append('isActive', String(payload.isActive ?? true));
  formData.append('displayOrder', String(payload.displayOrder ?? 1));

  if (payload.icon) {
    formData.append('icon', payload.icon);
  }

  if (payload.image) {
    formData.append('image', payload.image);
  }

  const res = await authFetch(`${BASE_URL}/admin/category`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to create category');
  }

  return data;
}

export async function getCategoriesService() {
  const res = await authFetch(`${BASE_URL}/admin/categories`, {
    method: 'GET',
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

export async function getCategoryByIdService(id: string) {
  const res = await authFetch(`${BASE_URL}/admin/category/${id}`, {
    method: 'GET',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch category',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function updateCategoryService(
  id: string,
  payload: UpdateCategoryPayload,
) {
  const body: Record<string, unknown> = {};

  if (payload.name) body.name = payload.name;
  if (payload.description !== undefined) body.description = payload.description;
  if (payload.isActive !== undefined) body.isActive = payload.isActive;
  if (payload.displayOrder !== undefined)
    body.displayOrder = payload.displayOrder;

  console.log('Updating category with ID:', id, 'and payload:', body);

  const res = await authFetch(`${BASE_URL}/admin/category/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  console.log('Update category response:', data);

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to update category');
  }

  return data;
}

export async function deleteCategoryService(id: string) {
  const res = await authFetch(`${BASE_URL}/admin/category/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  console.log('Delete category response:', data);

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to delete category',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function toggleCategoryStatusService(id: string) {
  const res = await authFetch(`${BASE_URL}/admin/${id}/toggle-status`, {
    method: 'PUT',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to toggle category status',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function reorderCategoryService(id: string, displayOrder: number) {
  const res = await authFetch(`${BASE_URL}/admin/category/${id}/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ displayOrder }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to reorder category',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

// ─── Subcategory Services ────────────────────────────────────────────────────

export async function createSubcategoryService(
  payload: CreateSubcategoryPayload,
) {
  const res = await authFetch(`${BASE_URL}/admin/subcategories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to create subcategory',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function getSubcategoriesService() {
  const res = await authFetch(`${BASE_URL}/admin/subcategories`, {
    method: 'GET',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch subcategories',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function getSubcategoryByIdService(id: string) {
  const res = await authFetch(`${BASE_URL}/admin/subcategories/${id}`, {
    method: 'GET',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch subcategory',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function getSubcategoriesByCategoryIdService(categoryId: string) {
  const res = await authFetch(
    `${BASE_URL}/admin/category/${categoryId}/subcategories`,
    {
      method: 'GET',
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to fetch subcategories for category',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function updateSubcategoryService(
  id: string,
  payload: UpdateSubcategoryPayload,
) {
  const res = await authFetch(`${BASE_URL}/admin/subcategories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to update subcategory',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function deleteSubcategoryService(id: string) {
  const res = await authFetch(`${BASE_URL}/admin/subcategories/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to delete subcategory',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function toggleSubcategoryStatusService(id: string) {
  const res = await authFetch(
    `${BASE_URL}/admin/subcategories/${id}/toggle-status`,
    { method: 'PUT' },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to toggle subcategory status',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function reorderSubcategoryService(
  id: string,
  displayOrder: number,
) {
  const res = await authFetch(`${BASE_URL}/admin/subcategories/${id}/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ displayOrder }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to reorder subcategory',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
