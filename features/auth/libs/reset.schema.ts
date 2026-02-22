// libs/reset.schema.ts

import { z } from 'zod';

// Step 1 — just the identifier
export const ResetRequestSchema = z.object({
  identifier: z.string().trim().min(1, {
    message: 'Email or phone is required.',
  }),
});

// Step 2 — new password
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ResetRequestData = z.infer<typeof ResetRequestSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

export type ResetRequestState =
  | undefined
  | { status: 'error'; errors?: { identifier?: string[] }; message?: string }
  | { status: 'success' };

export type ResetPasswordState =
  | undefined
  | {
      status: 'error';
      errors?: Partial<Record<keyof ResetPasswordData, string[]>>;
      message?: string;
    }
  | { status: 'success' };
