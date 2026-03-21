import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';
import { redirect } from 'next/navigation';
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
  CreateSubcategoryPayload,
  UpdateSubcategoryPayload,
} from './types';

// ─── Category Services ───────────────────────────────────────────────────────

export async function createCategoryService(payload: CreateCategoryPayload) {
  const res = await authFetch(`${BASE_URL}/admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  //   if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to create category',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function getCategoriesService() {
  const res = await authFetch(`${BASE_URL}/admin`, {
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
  const res = await authFetch(`${BASE_URL}/admin/${id}`, {
    method: 'GET',
  });

  if (res.status === 401) redirect('/admin/login');

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
  const res = await authFetch(`${BASE_URL}/admin/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to update category',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}

export async function deleteCategoryService(id: string) {
  const res = await authFetch(`${BASE_URL}/admin/${id}`, {
    method: 'DELETE',
  });

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

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

  if (res.status === 401) redirect('/admin/login');

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
  const res = await authFetch(`${BASE_URL}/admin/${id}/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ displayOrder }),
  });

  if (res.status === 401) redirect('/admin/login');

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

  if (res.status === 401) redirect('/admin/login');

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

  if (res.status === 401) redirect('/admin/login');

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

  if (res.status === 401) redirect('/admin/login');

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
  const res = await authFetch(`${BASE_URL}/admin/${categoryId}/subcategories`, {
    method: 'GET',
  });

  if (res.status === 401) redirect('/admin/login');

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

  if (res.status === 401) redirect('/admin/login');

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

  if (res.status === 401) redirect('/admin/login');

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

  if (res.status === 401) redirect('/admin/login');

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

  if (res.status === 401) redirect('/admin/login');

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || 'Failed to reorder subcategory',
      data?.statusCode ?? res.status,
    );
  }

  return data;
}
