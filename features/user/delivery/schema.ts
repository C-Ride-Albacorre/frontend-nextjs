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

export const CreateOrderSchema = z.object({
  cartId: z.string().min(1, 'Cart ID is required'),
  deliveryOptionId: z.string().optional(),
  dropoffLocation: z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    postalCode: z.string().optional().default(''),
  }),
  recipientName: z.string().min(1, 'Recipient name is required'),
  recipientPhone: z.string().min(1, 'Recipient phone is required'),
  deliveryInstructions: z.string().optional(),
});

export const InitializePaymentSchema = z.object({
  orderId: z.string().min(1),
  paymentMethod: z.literal('CARD'),
  callbackUrl: z.string().url(),
});

export type AddToCartInput = z.infer<typeof AddToCartSchema>;
export type UpdateCartQuantityInput = z.infer<typeof UpdateCartQuantitySchema>;
export type RemoveCartItemInput = z.infer<typeof RemoveCartItemSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type InitializePaymentInput = z.infer<typeof InitializePaymentSchema>;
