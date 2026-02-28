import { z } from 'zod';

export const ProductSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(2, { message: 'Product name is required.' }),
  productCategory: z
    .string()
    .trim()
    .min(1, { message: 'Category is required.' }),
  sku: z.string().trim().min(1, { message: 'SKU is required.' }),
  description: z.string().trim().optional(),
  productType: z.enum(['SIMPLE', 'VARIABLE'], {
    message: 'Product type is required.',
  }),
  stockStatus: z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'], {
    message: 'Stock status is required.',
  }),
  productStatus: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT'], {
    message: 'Product status is required.',
  }),
  basePrice: z.coerce
    .number()
    .min(0, { message: 'Price must be positive' })
    .optional(),
  stockQuantity: z.coerce.number().int().min(0).optional(),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
});

export const UpdateProductSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(2, { message: 'Product name is required.' })
    .optional(),
  productCategory: z
    .string()
    .trim()
    .min(1, { message: 'Category is required.' })
    .optional(),
  description: z.string().trim().optional(),
  stockStatus: z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK']).optional(),
  productStatus: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional(),
  basePrice: z.coerce.number().min(0).optional(),
  stockQuantity: z.coerce.number().int().min(0).optional(),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
});

export type ProductFormErrors = {
  productName?: string[];
  productCategory?: string[];
  sku?: string[];
  description?: string[];
  productType?: string[];
  stockStatus?: string[];
  productStatus?: string[];
  basePrice?: string[];
  stockQuantity?: string[];
  lowStockThreshold?: string[];
  images?: string[];
};
