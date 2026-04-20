import { COOKIE_KEYS, getCookie } from '@/utils/cookies';
import { refreshSession } from '@/features/libs/refresh-session';

export async function authFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  let accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
     cache: "no-store"
  });

  if (res.status !== 401) return res;

  const newToken = await refreshSession();

  if (!newToken) return res;

  headers.set('Authorization', `Bearer ${newToken}`);

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}
