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
  businessRegistrationNo: z
    .string()
    .trim()
    .min(2, { message: 'Business registration number is required.' }),
  tinNo: z.string().trim().min(2, { message: 'TIN number is required.' }),
  businessDescription: z
    .string()
    .trim()
    .min(2, { message: 'Business description is required.' }),
});

export const BusinessContactSchema = z.object({
  businessEmail: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email.' }),

  businessPhone: z
    .string()
    .trim()
    .refine((val) => !val || /^\+?\d{11,}$/.test(val), {
      message: 'Phone number must be at least 11 digits and may start with +.',
    }),
});

export const BusinessAddressSchema = z.object({
  businessAddress: z
    .string()
    .trim()
    .min(2, { message: 'Business address is required.' }),
  businessCity: z
    .string()
    .trim()
    .min(2, { message: 'Business city is required.' }),
  businessState: z
    .string()
    .trim()
    .min(2, { message: 'Business state is required.' }),
});

export const BusinessBankSchema = z.object({
  businessBankName: z
    .string()
    .trim()
    .min(2, { message: 'Business bank name is required.' }),
  businessAccountNumber: z
    .string()
    .trim()
    .min(2, { message: 'Business account number is required.' }),
  businessAccountName: z
    .string()
    .trim()
    .min(2, { message: 'Business account name is required.' }),
});

export type StepState =
  | undefined
  | { status: 'error'; errors?: any; message?: string }
  | { status: 'success'; message: string };
