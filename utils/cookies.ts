import { cookies } from 'next/headers';
import { getTokenExpiry } from './jwt';

const isProd = process.env.NODE_ENV === 'production';

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();
  const accessTokenMaxAge = getTokenExpiry(accessToken);
  const refreshTokenMaxAge = getTokenExpiry(refreshToken);

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: accessTokenMaxAge,
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: refreshTokenMaxAge,
  });
}
