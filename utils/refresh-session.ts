import { clearAuthCookies, getAuthTokens, setCookie } from './cookies';
import { refreshTokenService } from './refresh';
import { getTokenExpiry } from './jwt';

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
      name: 'accessToken',
      value: result.accessToken,
      maxAge: getTokenExpiry(result.accessToken),
    });

    return result.accessToken;
  } catch {
    await clearAuthCookies();
    return null;
  }
}
