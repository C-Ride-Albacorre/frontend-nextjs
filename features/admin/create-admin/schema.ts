import { z } from 'zod';

export const createAdminSchema = z.object({
  firstName: z.string().trim().min(2, 'First name is required'),
  lastName: z.string().trim().min(2, 'Last name is required'),
  email: z.string().trim().email('Invalid email address'),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    }),
});

export type AdminCreateFormData = z.infer<typeof createAdminSchema>;

export type AdminCreateFormState =
  | undefined
  | { status: 'idle' }
  | {
      status: 'error';
      errors?: Partial<Record<keyof AdminCreateFormData, string[]>>;
      message?: string;
      fields?: Partial<AdminCreateFormData>;
    }
  | { status: 'success'; fields: Partial<AdminCreateFormData> };
