import { z } from 'zod';

export const BusinessInfoSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, { message: 'Business name is required.' }),
  businessType: z
    .string()
    .trim()
    .min(2, { message: 'Business type is required.' }),
  businessDescription: z.string().trim().optional(),
});

export type StepState =
  | undefined
  | { status: 'error'; errors?: any; message?: string }
  | { status: 'success' };
