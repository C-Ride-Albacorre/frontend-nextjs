import { z } from 'zod';

export const AdminLoginFormSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type AdminLoginFormData = z.infer<typeof AdminLoginFormSchema>;

export type AdminLoginFormState =
  | undefined
  | { status: 'idle' }
  | {
      status: 'error';
      errors?: Partial<Record<keyof AdminLoginFormData, string[]>>;
      message?: string;
      fields?: Partial<AdminLoginFormData>;
    }
  | { status: 'success' };
