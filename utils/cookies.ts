import { cookies } from 'next/headers';
import { getTokenExpiry } from './jwt';

const isProd = process.env.NODE_ENV === 'production';

// Cookie names as constants
export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'userRole',
} as const;

type CookieKey = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];

// Default cookie options
const defaultOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'strict' as const,
  path: '/',
};

// Set a single cookie
interface SetCookieOptions {
  name: string;
  value: string;
  maxAge?: number;
}

export async function setCookie({ name, value, maxAge }: SetCookieOptions) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    ...defaultOptions,
    ...(maxAge && { maxAge }),
  });
}

// Get a single cookie
export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

// Delete a single cookie
export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

// Set auth cookies (access + refresh tokens)
export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();
  const accessTokenMaxAge = getTokenExpiry(accessToken);
  const refreshTokenMaxAge = getTokenExpiry(refreshToken);

  cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    ...defaultOptions,
    maxAge: accessTokenMaxAge,
  });

  cookieStore.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
    ...defaultOptions,
    maxAge: refreshTokenMaxAge,
  });
}

// Get auth tokens
export async function getAuthTokens() {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)?.value,
    refreshToken: cookieStore.get(COOKIE_KEYS.REFRESH_TOKEN)?.value,
  };
}

// Clear all auth cookies (for logout)
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);
  cookieStore.delete(COOKIE_KEYS.USER_ROLE);
}

// Check if user is authenticated (has valid access token)
export async function isAuthenticated(): Promise<boolean> {
  const { accessToken } = await getAuthTokens();
  return !!accessToken;
}
