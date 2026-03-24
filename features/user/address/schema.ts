import z from 'zod';

export const LocationSchema = z.object({
  label: z.string().min(1, { message: 'Location name is required.' }),

  address: z.string().min(1, { message: 'Street address is required.' }),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),

  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),

  isDefault: z.boolean().default(false),
});

export type LocationData = z.infer<typeof LocationSchema>;

export type LocationState =
  | undefined
  | { status: 'idle' }
  | { status: 'success'; message?: string }
  | {
      status: 'error';
      errors?: Partial<Record<keyof LocationData, string[]>>;
      message?: string;
    };
