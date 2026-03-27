import { z } from 'zod';

export const CartItemTypeSchema = z.enum(['PRODUCT', 'PACKAGE']);

export const AddToCartSchema = z.object({
  itemType: CartItemTypeSchema,
  productId: z.string().optional(),
  variantId: z.string().optional(),
  packageId: z.string().optional(),
  addonIds: z.array(z.string()).optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  specialInstructions: z.string().optional(),
});

export const UpdateCartQuantitySchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const RemoveCartItemSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
});

export type AddToCartInput = z.infer<typeof AddToCartSchema>;
export type UpdateCartQuantityInput = z.infer<typeof UpdateCartQuantitySchema>;
export type RemoveCartItemInput = z.infer<typeof RemoveCartItemSchema>;