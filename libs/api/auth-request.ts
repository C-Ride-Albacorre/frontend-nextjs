import { AuthRequestOptions } from '../types';
import { authFetch } from './auth-fetch';
import { parseResponse } from './http';





export async function authRequest<T>(
  url: string,
  options: AuthRequestOptions = {},
): Promise<T> {

  const res = await authFetch(url, options);
  return parseResponse<T>(res);
  
}
