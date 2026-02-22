'use server';

import { ResetRequestSchema, ResetRequestState } from '../libs/reset.schema';
import { resetPasswordService } from '../services/reset';

export async function resetPasswordAction(
  _state: ResetRequestState,
  formData: FormData,
): Promise<ResetRequestState> {
  const rawIdentifier = formData.get('identifier')?.toString().trim() ?? '';

  const validatedData = ResetRequestSchema.safeParse({
    identifier: rawIdentifier,
  });

  if (!validatedData.success) {
    return {
      status: 'error',
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const isPhone = /^\+?\d{7,}$/.test(rawIdentifier);
  const payload = isPhone
    ? { phoneNumber: rawIdentifier }
    : { email: rawIdentifier };

  try {
    await resetPasswordService(payload);
    return { status: 'success' };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Password reset failed. Please try again.',
    };
  }
}
