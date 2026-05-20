'use server';

import { getAuthTokens } from '@/utils/cookies';

export async function getAccessToken() {
  const { accessToken, refreshToken } = await getAuthTokens();



  return { accessToken, refreshToken };
}
