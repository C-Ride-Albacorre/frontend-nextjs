import { COOKIE_KEYS, getCookie } from '@/utils/cookies';
import { refreshSession } from '@/features/libs/refresh-session';
type CacheStrategy = 'no-store' | { revalidate: number };
interface AuthFetchOptions extends RequestInit {
  cacheStrategy?: CacheStrategy;
  nextTags?: string[];
}
export async function authFetch(
  url: string,
  options: AuthFetchOptions = {},
): Promise<Response> {
  const {
    cacheStrategy = 'no-store',
    nextTags,
    headers: customHeaders,
    ...rest
  } = options;

  const headers = new Headers(customHeaders);

  const accessToken = await getCookie(COOKIE_KEYS.ACCESS_TOKEN);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  const fetchConfig: RequestInit = { ...rest, headers, credentials: 'include' };

  // DEFAULT SAFE
  if (cacheStrategy === 'no-store') {
    (fetchConfig as any).cache = 'no-store';
  }

  // OPTIONAL CACHE
  if (typeof cacheStrategy === 'object' && 'revalidate' in cacheStrategy) {
    (fetchConfig as any).next = {
      revalidate: cacheStrategy.revalidate,
      tags: nextTags,
    };
  }
  let res = await fetch(url, fetchConfig);

  // TOKEN EXPIRED

  if (res.status === 401) {
    const newToken = await refreshSession();
    if (!newToken) {
      return res;
    }
    headers.set('Authorization', `Bearer ${newToken}`);
    res = await fetch(url, { ...fetchConfig, headers });
  }
  return res;
}
