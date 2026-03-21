'use server';

import { revalidatePath } from 'next/cache';
import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  toggleCategoryStatusService,
  createSubcategoryService,
  getSubcategoriesService,
  getSubcategoriesByCategoryIdService,
  updateSubcategoryService,
  deleteSubcategoryService,
  toggleSubcategoryStatusService,
} from './service';
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
  CreateSubcategoryPayload,
  UpdateSubcategoryPayload,
  Category,
  Subcategory,
} from './types';
import { i } from 'framer-motion/client';

// ─── Category Actions ────────────────────────────────────────────────────────

export async function createCategoryAction(
  payload: CreateCategoryPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await createCategoryService(payload);
    console.log('[createCategory] Response:', JSON.stringify(res, null, 2));

    if (!res.success) {
      return {
        success: false,
        message: res.message || 'Failed to create category',
      };
    }

    if (res.success) {
      revalidatePath('/admin/category');
    }

    return { success: true, message: 'Category created successfully' };
  } catch (error) {
    console.error('[createCategory] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to create category',
    };
  }
}

export async function getCategoriesAction(): Promise<Category[]> {
  try {
    const res = await getCategoriesService();
    console.log('[getCategories] Response:', JSON.stringify(res, null, 2));

    return res.data ?? res;
  } catch (error) {
    console.error('[getCategories] Error:', error);
    return [];
  }
}

export async function getCategoryByIdAction(
  id: string,
): Promise<Category | null> {
  try {
    const res = await getCategoryByIdService(id);
    console.log('[getCategoryById] Response:', JSON.stringify(res, null, 2));

    return res.data ?? res;
  } catch (error) {
    console.error('[getCategoryById] Error:', error);
    return null;
  }
}

export async function updateCategoryAction(
  id: string,
  payload: UpdateCategoryPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await updateCategoryService(id, payload);
    console.log('[updateCategory] Response:', JSON.stringify(res, null, 2));

    revalidatePath('/admin/category');

    return { success: true, message: 'Category updated successfully' };
  } catch (error) {
    console.error('[updateCategory] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update category',
    };
  }
}

export async function deleteCategoryAction(
  id: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await deleteCategoryService(id);
    console.log('[deleteCategory] Response:', JSON.stringify(res, null, 2));
    if (!res.success) {
      return {
        success: false,
        message: res.message || 'Failed to delete category',
      };
    }

    revalidatePath('/admin/category');

    return {
      success: true,
      message: res.message || 'Category deactivated successfully',
    };
  } catch (error) {
    console.error('[deleteCategory] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to delete category',
    };
  }
}

export async function toggleCategoryStatusAction(
  id: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await toggleCategoryStatusService(id);
    console.log(
      '[toggleCategoryStatus] Response:',
      JSON.stringify(res, null, 2),
    );

    revalidatePath('/admin/category');

    return { success: true, message: 'Category status toggled successfully' };
  } catch (error) {
    console.error('[toggleCategoryStatus] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to toggle category status',
    };
  }
}

// ─── Subcategory Actions ─────────────────────────────────────────────────────

export async function createSubcategoryAction(
  payload: CreateSubcategoryPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await createSubcategoryService(payload);
    console.log('[createSubcategory] Response:', JSON.stringify(res, null, 2));

    revalidatePath('/admin/category');

    return { success: true, message: 'Subcategory created successfully' };
  } catch (error) {
    console.error('[createSubcategory] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to create subcategory',
    };
  }
}

export async function getSubcategoriesAction(): Promise<Subcategory[]> {
  try {
    const res = await getSubcategoriesService();
    console.log('[getSubcategories] Response:', JSON.stringify(res, null, 2));
    return res.data ?? res;
  } catch (error) {
    console.error('[getSubcategories] Error:', error);
    return [];
  }
}

export async function getSubcategoriesByCategoryIdAction(
  categoryId: string,
): Promise<Subcategory[]> {
  try {
    const res = await getSubcategoriesByCategoryIdService(categoryId);
    console.log(
      '[getSubcategoriesByCategoryId] Response:',
      JSON.stringify(res, null, 2),
    );
    return res.data ?? res;
  } catch (error) {
    console.error('[getSubcategoriesByCategoryId] Error:', error);
    return [];
  }
}

export async function updateSubcategoryAction(
  id: string,
  payload: UpdateSubcategoryPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await updateSubcategoryService(id, payload);
    console.log('[updateSubcategory] Response:', JSON.stringify(res, null, 2));

    revalidatePath('/admin/category');

    return { success: true, message: 'Subcategory updated successfully' };
  } catch (error) {
    console.error('[updateSubcategory] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to update subcategory',
    };
  }
}

export async function deleteSubcategoryAction(
  id: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await deleteSubcategoryService(id);
    console.log('[deleteSubcategory] Response:', JSON.stringify(res, null, 2));

    if (!res.success) {
      return {
        success: false,
        message: res.message || 'Failed to delete subcategory',
      };
    }

    revalidatePath('/admin/category');

    return {
      success: true,
      message: res.message || 'Subcategory deactivated successfully',
    };
  } catch (error) {
    console.error('[deleteSubcategory] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to delete subcategory',
    };
  }
}

export async function toggleSubcategoryStatusAction(
  id: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await toggleSubcategoryStatusService(id);
    console.log(
      '[toggleSubcategoryStatus] Response:',
      JSON.stringify(res, null, 2),
    );

    revalidatePath('/admin/category');

    return {
      success: true,
      message: 'Subcategory status toggled successfully',
    };
  } catch (error) {
    console.error('[toggleSubcategoryStatus] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to toggle subcategory status',
    };
  }
}
