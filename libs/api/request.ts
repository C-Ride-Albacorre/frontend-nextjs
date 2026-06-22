import { parseResponse } from './http';

type CacheStrategy = 'no-store' | { revalidate: number };

interface RequestOptions extends RequestInit {
  cacheStrategy?: CacheStrategy;
  nextTags?: string[];
}

export async function request<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const { cacheStrategy = 'no-store', nextTags, ...rest } = options;

  const fetchConfig: RequestInit = {
    ...rest,
  };

  // NO STORE
  if (cacheStrategy === 'no-store') {

    (fetchConfig as any).cache = 'no-store';
    
  }

  // REVALIDATE
  if (typeof cacheStrategy === 'object' && 'revalidate' in cacheStrategy) {
    (fetchConfig as any).next = {
      revalidate: cacheStrategy.revalidate,
      tags: nextTags,
    };
  }

  const res = await fetch(url, fetchConfig);

  return parseResponse<T>(res);
}
// lib/api/auth-re
