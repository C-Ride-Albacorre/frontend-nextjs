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
  registrationNumber: z
    .string()
    .trim()
    .min(2, { message: 'Business registration number is required.' }),
  taxId: z.string().trim().min(2, { message: 'Tax ID number is required.' }),
  description: z
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
  address: z
    .string()
    .trim()
    .min(2, { message: 'Business address is required.' }),
  city: z
    .string()
    .trim()
    .min(2, { message: 'Business city is required.' }),
  state: z
    .string()
    .trim()
    .min(2, { message: 'Business state is required.' }),
});

export const BusinessBankSchema = z.object({
 bankName: z
    .string()
    .trim()
    .min(2, { message: 'Business bank name is required.' }),
  accountNumber: z
    .string()
    .trim()
    .min(2, { message: 'Business account number is required.' }),
  accountName: z
    .string()
    .trim()
    .min(2, { message: 'Business account name is required.' }),
});

export type StepState =
  | undefined
  | { status: 'error'; errors?: any; message?: string }
  | { status: 'success'; message: string };
