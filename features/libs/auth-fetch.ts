import { getCookie } from '@/utils/cookies';
import { refreshSession } from '@/features/libs/refresh-session';

/**
 * Authenticated fetch wrapper.
 * Automatically attaches the access token and retries once on 401
 * by refreshing the session token.
 */
export async function authFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const accessToken = await getCookie('accessToken');

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  // If unauthorized, attempt a silent token refresh and retry
  if (res.status === 401 && accessToken) {
    const newToken = await refreshSession();

    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`);
      res = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });
    }
  }

  
  

  return res;
}
