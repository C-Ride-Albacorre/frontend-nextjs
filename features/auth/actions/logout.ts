'use server';

import { redirect } from 'next/navigation';
import { logoutService } from '../services/logout';
import { clearAuthCookies, getCookie } from '@/utils/cookies';

export async function logoutAction(redirectTo: string = '/user/login') {
  const accessToken = await getCookie('accessToken');
  const refreshToken = await getCookie('refreshToken');

  let tokenToUse: string | null = null;

  if (accessToken) {
    tokenToUse = accessToken;
  } else if (refreshToken) {
    tokenToUse = refreshToken;
  } else {
    // No tokens found, just clear cookies and redirect
    await clearAuthCookies();
    redirect(redirectTo);
  }

  try {
    if (tokenToUse) {
      await logoutService(tokenToUse);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Logout API error:', error);
    }
  } finally {
    // ✅ always clear cookies regardless of API response
    await clearAuthCookies();
  }

  redirect(redirectTo);
}
