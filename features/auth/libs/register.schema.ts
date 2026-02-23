import * as z from 'zod';

export const RegisterFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: 'First name must be at least 2 characters long.' }),

    lastName: z
      .string()
      .trim()
      .min(2, { message: 'Last name must be at least 2 characters long.' }),

    email: z
      .string()
      .trim()
      .email({ message: 'Please enter a valid email.' })
      .optional(),

    phoneNumber: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^\+?\d{11,}$/.test(val), {
        message:
          'Phone number must be at least 11 digits and may start with +.',
      }),

    password: z
      .string()
      .trim()
      .min(8, { message: 'Be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      }),

    referralCode: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.phoneNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['email'],
        message: 'Email or phone number is required.',
      });
    }
  });

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;

// Vendor registration - both email and phone required
export const VendorRegisterFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: 'First name must be at least 2 characters long.' }),

  lastName: z
    .string()
    .trim()
    .min(2, { message: 'Last name must be at least 2 characters long.' }),

  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email.' }),

  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required.' })
    .refine((val) => /^\+?\d{11,}$/.test(val), {
      message: 'Phone number must be at least 11 digits and may start with +.',
    }),

  password: z
    .string()
    .trim()
    .min(8, { message: 'Be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    }),

  referralCode: z.string().trim().optional(),
});

export type VendorRegisterFormData = z.infer<typeof VendorRegisterFormSchema>;

export type FormState =
  | undefined
  | { status: 'idle' }
  | {
      status: 'error';
      errors?: Partial<
        Record<Exclude<keyof RegisterFormData, 'referralCode'>, string[]>
      >;
      message?: string;
    }
  | { status: 'success'; data?: { nextSteps?: string[] } };
