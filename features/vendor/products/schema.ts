import { z } from 'zod';

const ProductDetailsSchema = z.object({
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
  productType: z.enum(['SINGLE', 'VARIABLE']),
  basePrice: z.coerce.number().min(0, { message: 'Price must be positive.' }),
  stockQuantity: z.coerce.number().int().min(0).optional(),
  lowStockThreshold: z.coerce.number().int().min(0).optional(),
  stockStatus: z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'], {
    message: 'Stock status is required.',
  }),
  productStatus: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT'], {
    message: 'Product status is required.',
  }),
});

export const SingleProductSchema = ProductDetailsSchema;
export const VariableProductSchema = ProductDetailsSchema;
export const VariableDetailsSchema = ProductDetailsSchema;

export const VariantsSchema = z.object({
  variants: z
    .array(
      z.object({
        name: z.string().min(1),
        options: z.array(z.string()),
        priceModifier: z.number(),
      }),
    )
    .min(1, { message: 'Add at least one variant.' }),
});

export const AddonsSchema = z.object({
  addons: z.array(
    z.object({
      name: z.string().min(1),
      price: z.number().min(0),
      available: z.boolean(),
    }),
  ),
});

export const UpdateProductSchema = ProductDetailsSchema.omit({
  sku: true,
  productType: true,
}).partial();

export type ProductFormErrors = Partial<
  Record<
    | 'productName'
    | 'productCategory'
    | 'sku'
    | 'description'
    | 'productType'
    | 'stockStatus'
    | 'productStatus'
    | 'basePrice'
    | 'stockQuantity'
    | 'lowStockThreshold'
    | 'images'
    | 'variants',
    string[]
  >
>;
