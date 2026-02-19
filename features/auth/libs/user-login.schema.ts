import { z } from 'zod';

export const LoginFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, { message: 'Email or phone is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;

export type LoginFormState =
  | undefined
  | { status: 'idle' }
  | {
      status: 'error';
      errors?: Partial<Record<keyof LoginFormData, string[]>>;
      message?: string;
    }
  | { status: 'success' };
