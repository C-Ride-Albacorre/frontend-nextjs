'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import {
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  toggleCategoryStatusService,
  createSubcategoryService,
  updateSubcategoryService,
  deleteSubcategoryService,
  toggleSubcategoryStatusService,
} from './service';
import {
  UpdateCategoryPayload,
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

    console.log(
      '[createCategoryAction] Raw icon:',
      iconFile,
      'Type:',
      iconFile?.constructor.name,
    );
    console.log(
      '[createCategoryAction] Raw image:',
      imageFile,
      'Type:',
      imageFile?.constructor.name,
    );

    const icon =
      iconFile instanceof File && iconFile.size > 0 ? iconFile : undefined;

    const image =
      imageFile instanceof File && imageFile.size > 0 ? imageFile : undefined;

    console.log(
      '[createCategoryAction] Processed icon:',
      icon ? 'Valid File' : 'undefined',
    );
    console.log(
      '[createCategoryAction] Processed image:',
      image ? 'Valid File' : 'undefined',
    );

    const result = await createCategoryService({
      ...validatedFields.data,
      icon,
      image,
    });

    console.log('[Create category response] : ', result);

    revalidateTag('get-categories', 'default');

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

export async function updateCategoryAction(
  _state: CreateCategoryState,
  formData: FormData,
): Promise<UpdateCategoryState> {
  console.log('UPDATE ACTION CALLED');

  const categoryId = formData.get('categoryId')?.toString();

  if (!categoryId) {
    return {
      status: 'error',
      message: 'Category ID is required.',
    };
  }

  // Only include fields that have values for partial updates
  const rawData: UpdateCategoryPayload = {
    name: formData.get('name')?.toString(),
    description: formData.get('description')?.toString(),
    displayOrder: Number(formData.get('displayOrder')),
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
    const iconFile = formData.get('icon');
    const imageFile = formData.get('image');

    console.log(
      '[updateCategoryAction] Raw icon:',
      iconFile,
      'Type:',
      iconFile?.constructor.name,
    );
    console.log(
      '[updateCategoryAction] Raw image:',
      imageFile,
      'Type:',
      imageFile?.constructor.name,
    );

    const icon =
      iconFile instanceof File && iconFile.size > 0 ? iconFile : undefined;

    const image =
      imageFile instanceof File && imageFile.size > 0 ? imageFile : undefined;

    const result = await updateCategoryService(categoryId, {
      ...validated.data,
      icon,
      image,
    });

    console.log(' [updateCategoryAction] Result:', result);

    revalidateTag('get-categories', 'default');

    revalidateTag(`get-category-${categoryId}`, 'default');

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

    revalidateTag(`get-category`, 'default');

    if (res.status !== 'success') {
      return {
        success: false,
        message: res.message || 'Failed to delete category',
      };
    }

    revalidateTag(`get-category`, 'default');

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
    console.log('[toggleCategoryStatus] Response:', res);

    revalidateTag(`get-category`, 'default');

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
    description: formData.get('description')?.toString(),
    displayOrder: Number(formData.get('displayOrder')) || 1,
    categoryId: formData.get('categoryId')?.toString(),

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
    const iconFile = formData.get('icon');
    const imageFile = formData.get('image');

    const icon =
      iconFile instanceof File && iconFile.size > 0 ? iconFile : undefined;

    const image =
      imageFile instanceof File && imageFile.size > 0 ? imageFile : undefined;

    await createSubcategoryService({
      ...validatedFields.data,
      icon,
      image,
    });

    revalidateTag('get-subcategory', 'default');

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
    const iconFile = formData.get('icon');
    const imageFile = formData.get('image');

    const icon =
      iconFile instanceof File && iconFile.size > 0 ? iconFile : undefined;

    const image =
      imageFile instanceof File && imageFile.size > 0 ? imageFile : undefined;

    await updateSubcategoryService(id, {
      ...validatedFields.data,
      icon,
      image,
    });

    revalidateTag('get-subcategory', 'default');

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
    console.log('[deleteSubcategory] Response:', res);

    if (res.status !== 'success') {
      return {
        success: false,
        message: res.message || 'Failed to delete subcategory',
      };
    }

    
    revalidatePath('/admin/category');

    return {
      success: true,
      message: res.message || 'Subcategory deleted successfully',
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

// export async function reorderCategoryAction(
//   id: string,
//   displayOrder: number,
// ): Promise<{ success: boolean; message: string }> {
//   try {
//     await reorderCategoryService(id, displayOrder);
//     revalidatePath('/admin/category');
//     return { success: true, message: 'Category reordered successfully' };
//   } catch (error) {
//     console.error('[reorderCategory] Error:', error);
//     return {
//       success: false,
//       message:
//         error instanceof Error ? error.message : 'Failed to reorder category',
//     };
//   }
// }

// export async function reorderSubcategoryAction(
//   id: string,
//   displayOrder: number,
// ): Promise<{ success: boolean; message: string }> {
//   try {
//     await reorderSubcategoryService(id, displayOrder);
//     revalidatePath('/admin/category');
//     return { success: true, message: 'Subcategory reordered successfully' };
//   } catch (error) {
//     console.error('[reorderSubcategory] Error:', error);
//     return {
//       success: false,
//       message:
//         error instanceof Error
//           ? error.message
//           : 'Failed to reorder subcategory',
//     };
//   }
// }
