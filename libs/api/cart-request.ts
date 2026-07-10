import { getAuthTokens, getOrCreateGuestSessionId } from '@/utils/cookies';
import { parseResponse } from './http';
import { authFetch } from './auth-fetch';
import { AuthRequestOptions } from '../types';

export async function cartRequest<T>(
  url: string,
  options: AuthRequestOptions = {},
): Promise<T> {
  const { accessToken, refreshToken } = await getAuthTokens();

  let res: Response;

  // AUTH USER

  if (accessToken || refreshToken) {
    res = await authFetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      cacheStrategy: 'no-store',
    });
  } else {
    // GUEST USER

    const guestSessionId = await getOrCreateGuestSessionId();

    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'x-session-id': guestSessionId,
      },
      cache: 'no-store',
    });
  }

  return parseResponse<T>(res);
}
