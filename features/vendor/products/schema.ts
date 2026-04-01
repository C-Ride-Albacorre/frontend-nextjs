import { z } from 'zod';

const ProductDetailsSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(2, { message: 'Product name is required.' }),
  subcategoryId: z
    .string({ message: 'Category is required.' })
    .trim()
    .min(1, { message: 'Category is required.' }),
  sku: z.string().trim().min(1, { message: 'SKU is required.' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Description is required.' }),
  productType: z.enum(['SINGLE', 'VARIABLE']),
  basePrice: z.coerce
    .number({ message: 'Price is required.' })
    .min(1, { message: 'Price must be at least 1.' }),
  stockQuantity: z.preprocess(
    (val) =>
      val === '' || val === undefined || val === null ? undefined : val,
    z.coerce
      .number({ message: 'Stock quantity is required.' })
      .int()
      .min(0, { message: 'Stock quantity must be 0 or more.' }),
  ),
  lowStockThreshold: z.preprocess(
    (val) =>
      val === '' || val === undefined || val === null ? undefined : val,
    z.coerce
      .number({ message: 'Low stock threshold is required.' })
      .int()
      .min(0, { message: 'Low stock threshold must be 0 or more.' }),
  ),
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
        variantName: z.string().min(1, 'Variant name is required.'),
        price: z.number().min(0, 'Price must be 0 or more.'),
        sku: z.string().min(1, 'SKU is required.'),
        stockQuantity: z
          .number()
          .int()
          .min(0, 'Stock quantity must be 0 or more.'),
        stockStatus: z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK']),
        attributes: z.record(z.string(), z.string()).optional(),
      }),
    )
    .min(1, { message: 'Add at least one variant.' }),
});

export const AddonsSchema = z.object({
  addons: z.array(
    z.object({
      addonName: z.string().min(1, 'Add-on name is required.'),
      price: z.number().min(0, 'Price must be 0 or more.'),
      description: z.string().optional(),
      maxQuantity: z.number().int().min(0).optional(),
      category: z.string().optional(),
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
    | 'subcategoryId'
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
