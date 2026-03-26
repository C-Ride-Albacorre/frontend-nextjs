import {
  clearAuthCookies,
  COOKIE_KEYS,
  getAuthTokens,
  setCookie,
} from '@/utils/cookies';
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

    // Unwrap from result.data — API returns { data: { accessToken, refreshToken } }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      result.data;

    await setCookie({
      name: COOKIE_KEYS.ACCESS_TOKEN,
      value: newAccessToken,
      maxAge: getTokenExpiry(newAccessToken),
    });

    if (newRefreshToken) {
      await setCookie({
        name: COOKIE_KEYS.REFRESH_TOKEN,
        value: newRefreshToken,
        maxAge: getTokenExpiry(newRefreshToken),
      });
    }

    return newAccessToken;
  } catch {
    await clearAuthCookies();
    return null;
  }
}
