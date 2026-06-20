import { parseResponse } from './http';

type CacheStrategy = 'default' | 'no-store' | { revalidate: number };

export async function request<T>(
  url: string,
  options: RequestInit & {
    cacheStrategy?: CacheStrategy;
  } = {},
): Promise<T> {
  const { cacheStrategy = 'default', ...rest } = options;

  let nextConfig: any = undefined;

  if (cacheStrategy === 'no-store') {
    nextConfig = { cache: 'no-store' };
  }

  if (typeof cacheStrategy === 'object' && 'revalidate' in cacheStrategy) {
    nextConfig = {
      next: { revalidate: cacheStrategy.revalidate },
    };
  }

  const res = await fetch(url, {
    ...rest,
    ...nextConfig,
  });

  return parseResponse<T>(res);
}
