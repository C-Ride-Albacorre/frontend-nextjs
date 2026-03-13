'use server';

import { AdminCreateFormState, createAdminSchema } from './schema';
import { createAdminService } from './service';

export async function createAdminAction(
  _state: AdminCreateFormState,
  formData: FormData,
): Promise<AdminCreateFormState> {
  const validatedFields = createAdminSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      fields: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
      },
    };
  }

  try {
    const response = await createAdminService(validatedFields.data);

    console.log('Admin created successfully:', response);

    return {
      status: 'success',
      fields: {
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
      },
    };
  } catch (error) {
    console.error(
      'Error creating admin:',
      error instanceof Error ? error.message : error,
    );
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to create admin',
      fields: {
        firstName: validatedFields.data.firstName,
        lastName: validatedFields.data.lastName,
        email: validatedFields.data.email,
      },
    };
  }
}
