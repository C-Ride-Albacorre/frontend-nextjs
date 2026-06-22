import { authFetch } from './auth-fetch';
import { parseResponse } from './http';


type CacheStrategy = 'no-store' | { revalidate: number };

interface AuthRequestOptions extends RequestInit {
  cacheStrategy?: CacheStrategy;
  nextTags?: string[];
}
export async function authRequest<T>(
  url: string,
  options: AuthRequestOptions = {},
): Promise<T> {

  const res = await authFetch(url, options);
  return parseResponse<T>(res);
  
}
