import { getAuthTokens, getOrCreateGuestSessionId } from '@/utils/cookies';
import { parseResponse } from './http';
import { authFetch } from './auth-fetch';

export async function cartRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const { accessToken, refreshToken } = await getAuthTokens();

  let res: Response;

  if (accessToken || refreshToken) {
    res = await authFetch(url, options);
  } else {
    const guestSessionId = await getOrCreateGuestSessionId();

    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'x-session-id': guestSessionId,
      },
      //   cache: 'no-store',
    });
  }

  return parseResponse<T>(res);
}
