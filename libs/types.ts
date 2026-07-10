export type CacheStrategy = 'no-store' | { revalidate: number };

 export interface AuthRequestOptions extends RequestInit {
  cacheStrategy?: CacheStrategy;
  nextTags?: string[];
}