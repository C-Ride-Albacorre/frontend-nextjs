import { z } from 'zod';

export const StoreSchema = z.object({
  storeName: z
    .string()
    .trim()
    .min(2, { message: 'Store name is required.' }),
  storeCategory: z
    .string()
    .trim()
    .min(2, { message: 'Store category is required.' }),
  storeAddress: z
    .string()
    .trim()
    .min(5, { message: 'Store address is required.' }),
  phoneNumber: z
    .string()
    .trim()
    .refine((val) => !val || /^\+?\d{10,}$/.test(val), {
      message: 'Phone number must be at least 10 digits and may start with +.',
    }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' }),
  storeDescription: z.string().trim().optional(),
  minimumOrder: z.coerce.number().positive().optional().or(z.literal('')),
  deliveryFee: z.coerce.number().positive().optional().or(z.literal('')),
  preparationTime: z.coerce.number().positive().optional().or(z.literal('')),
});

export type StoreFormErrors = {
  storeName?: string[];
  storeCategory?: string[];
  storeAddress?: string[];
  phoneNumber?: string[];
  email?: string[];
  storeDescription?: string[];
  minimumOrder?: string[];
  deliveryFee?: string[];
  preparationTime?: string[];
  operatingHours?: string[];
};
