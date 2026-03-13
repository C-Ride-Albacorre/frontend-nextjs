import { BASE_URL } from '@/config/api';
import { ApiError } from '@/features/libs/api-error';
import { authFetch } from '@/features/libs/auth-fetch';

type CreateAdminPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function createAdminService(payload: CreateAdminPayload) {
  const res = await authFetch(`${BASE_URL}/admin/create-admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  console.log(
    '[createAdminService] Response:',
    JSON.stringify(result, null, 2),
  );

  if (!res.ok) {
    throw new ApiError(
      result?.message || 'Failed to create admin',
      result?.statusCode ?? res.status,
    );
  }

  return result;
}
