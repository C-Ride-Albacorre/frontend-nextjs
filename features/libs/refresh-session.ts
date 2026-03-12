import { clearAuthCookies, COOKIE_KEYS, getAuthTokens, setCookie } from '@/utils/cookies';
import { refreshTokenService } from './refresh';
import { getTokenExpiry } from '@/utils/jwt';

export async function refreshSession() {
  const { refreshToken, accessToken } = await getAuthTokens();

  if (!refreshToken) {
    return null;
  }

  try {
    const result = await refreshTokenService({
      refreshToken,
      previousAccessToken: accessToken ?? '',
    });

    await setCookie({
      name: COOKIE_KEYS.ACCESS_TOKEN,
      value: result.accessToken,
      maxAge: getTokenExpiry(result.accessToken),
    });

    return result.accessToken;
  } catch {
    await clearAuthCookies();
    return null;
  }
}
