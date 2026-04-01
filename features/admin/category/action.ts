'use server';

import { revalidatePath } from 'next/cache';
import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  toggleCategoryStatusService,
  reorderCategoryService,
  createSubcategoryService,
  getSubcategoriesService,
  getSubcategoriesByCategoryIdService,
  updateSubcategoryService,
  deleteSubcategoryService,
  toggleSubcategoryStatusService,
  reorderSubcategoryService,
} from './service';
import {
  UpdateCategoryPayload,
  Category,
  Subcategory,
  CreateCategoryState,
  CreateSubcategoryState,
  UpdateCategoryState,
} from './types';
import {
  CreateCategorySchema,
  CreateSubcategorySchema,
  UpdateCategorySchema,
} from './schema';

// ─── Category Actions ────────────────────────────────────────────────────────

export async function createCategoryAction(
  _state: CreateCategoryState,
  formData: FormData,
): Promise<CreateCategoryState> {
  const rawData = {
    name: formData.get('name')?.toString(),
    description: formData.get('description')?.toString(),
    displayOrder: Number(formData.get('displayOrder')) || 1,
    isActive: formData.get('isActive') === 'true',
  };

  const validatedFields = CreateCategorySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      data: rawData,
    };
  }

  try {
    const iconFile = formData.get('icon');
    const imageFile = formData.get('image');

    const icon =
      iconFile instanceof File && iconFile.size > 0 ? iconFile : undefined;

    const image =
      imageFile instanceof File && imageFile.size > 0 ? imageFile : undefined;

    await createCategoryService({
      ...validatedFields.data,
      icon,
      image,
    });

    revalidatePath('/admin/category');

    return {
      status: 'success',
      message: 'Category created successfully!',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to create category.',
      data: rawData,
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
  categoryId: string,
  formData: FormData,
): Promise<UpdateCategoryState> {
  const rawData: UpdateCategoryPayload = {
    name: formData.get('name')?.toString(),
    description: formData.get('description')?.toString(),
    displayOrder: Number(formData.get('displayOrder')) || 1,
    isActive: formData.get('isActive') === 'true',
  };

  const validated = UpdateCategorySchema.safeParse(rawData);

  if (!validated.success) {
    return {
      status: 'error',
      errors: validated.error.flatten().fieldErrors,
      data: rawData,
    };
  }

  try {
    // const iconFile = formData.get('icon');
    // const imageFile = formData.get('image');

    // const icon =
    //   iconFile instanceof File && iconFile.size > 0 ? iconFile : undefined;

    // const image =
    //   imageFile instanceof File && imageFile.size > 0 ? imageFile : undefined;

   const result =  await updateCategoryService(categoryId, { ...validated.data });


   console.log('[updateCategory] Response:', JSON.stringify(result, null, 2));

    revalidatePath('/admin/category');

    return {
      status: 'success',
      message: 'Category updated successfully!',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to update category',
      data: rawData,
    };
  }
}

export async function deleteCategoryAction(
  id: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await deleteCategoryService(id);
    console.log('[deleteCategory] Response:', JSON.stringify(res, null, 2));
    
    if (res.status !== 'success') {
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
  _state: CreateSubcategoryState,
  formData: FormData,
): Promise<CreateSubcategoryState> {
  const rawData = {
    name: formData.get('name')?.toString(),
    categoryId: formData.get('categoryId')?.toString(),
    description: formData.get('description')?.toString(),
    displayOrder: Number(formData.get('displayOrder')) || 1,
    isActive: formData.get('isActive') === 'true',
  };

  const validatedFields = CreateSubcategorySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      data: rawData, // ✅ preserve input
    };
  }

  try {
    await createSubcategoryService(validatedFields.data);

    revalidatePath('/admin/category');

    return {
      status: 'success',
      message: 'Subcategory created successfully!',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to create subcategory',
      data: rawData,
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
  _state: CreateSubcategoryState,
  formData: FormData,
): Promise<CreateSubcategoryState> {
  const rawData = {
    name: formData.get('name')?.toString(),
    categoryId: formData.get('categoryId')?.toString(),
    description: formData.get('description')?.toString(),
    displayOrder: Number(formData.get('displayOrder')) || 1,
    isActive: formData.get('isActive') === 'true',
  };

  const validatedFields = CreateSubcategorySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      data: rawData,
    };
  }

  try {
    await updateSubcategoryService(id, validatedFields.data);
    revalidatePath('/admin/category');
    return {
      status: 'success',
      message: 'Subcategory updated successfully',
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to update subcategory',
      data: rawData,
    };
  }
}

export async function deleteSubcategoryAction(
  id: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await deleteSubcategoryService(id);
    console.log('[deleteSubcategory] Response:', JSON.stringify(res, null, 2));

    if (res.status !== 'success') {
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

// ─── Reorder Actions ─────────────────────────────────────────────────────────

export async function reorderCategoryAction(
  id: string,
  displayOrder: number,
): Promise<{ success: boolean; message: string }> {
  try {
    await reorderCategoryService(id, displayOrder);
    revalidatePath('/admin/category');
    return { success: true, message: 'Category reordered successfully' };
  } catch (error) {
    console.error('[reorderCategory] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to reorder category',
    };
  }
}

export async function reorderSubcategoryAction(
  id: string,
  displayOrder: number,
): Promise<{ success: boolean; message: string }> {
  try {
    await reorderSubcategoryService(id, displayOrder);
    revalidatePath('/admin/category');
    return { success: true, message: 'Subcategory reordered successfully' };
  } catch (error) {
    console.error('[reorderSubcategory] Error:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to reorder subcategory',
    };
  }
}
