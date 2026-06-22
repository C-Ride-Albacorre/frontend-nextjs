import { ApiError } from '@/features/libs/api-error';

export async function parseResponse<T>(res: Response): Promise<T> {
  let data: any = null;

  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new ApiError(data?.message || 'Request failed', res.status);
  }
  return data as T;
}
