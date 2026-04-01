import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),

  description: z.string().optional(),

  isActive: z
    .union([z.string(), z.boolean()])
    .optional()
    .transform((val) => val === 'true' || val === true),

  displayOrder: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => Number(val) || 1),
});

export const CreateSubcategorySchema = z.object({
  name: z.string().min(1, 'Subcategory name is required'),

  categoryId: z.string().min(1, 'Please select a category'),

  description: z.string().optional(),

  isActive: z
    .union([z.string(), z.boolean()])
    .optional()
    .transform((val) => val === 'true' || val === true),

  displayOrder: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => Number(val) || 1),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional(),
  displayOrder: z.number().int().nonnegative(),
  isActive: z.boolean(),
});
