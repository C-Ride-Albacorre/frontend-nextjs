import { z } from 'zod';

export const VendorLoginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  countryCode: z
    .string()
    .trim()
    .length(2, { message: 'Invalid country code' })
    .optional(),
});

export type VendorLoginFormData = z.infer<typeof VendorLoginFormSchema>;

export type VendorLoginFormState =
  | undefined
  | { status: 'idle' }
  | {
      status: 'error';
      errors?: Partial<Record<keyof VendorLoginFormData, string[]>>;
      message?: string;
    }
  | { status: 'success' }
  | { status: 'under_review'; email?: string };
